from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import uuid
import ffmpeg
from ..config import UPLOAD_DIR, OUTPUT_DIR

router = APIRouter()

@router.post("/convert/media")
async def convert_media(file: UploadFile = File(...), target_format: str = Form(...)):
    # Basic validation
    valid_formats = ["mp4", "avi", "mov", "mkv", "mp3", "wav", "flac", "ogg", "aac"]
    target_format = target_format.lower()
    
    if target_format not in valid_formats:
        raise HTTPException(status_code=400, detail=f"Invalid target format. Supported: {', '.join(valid_formats)}")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"{os.path.splitext(file.filename)[0]}.{target_format}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Use ffmpeg-python to handle the conversion
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.output(stream, output_path)
        ffmpeg.run(stream, overwrite_output=True, capture_stdout=True, capture_stderr=True)
        
        # Determine MIME type
        mime_types = {
            "mp4": "video/mp4", "avi": "video/x-msvideo", "mov": "video/quicktime", "mkv": "video/x-matroska",
            "mp3": "audio/mpeg", "wav": "audio/wav", "flac": "audio/flac", "ogg": "audio/ogg", "aac": "audio/aac"
        }
        media_type = mime_types.get(target_format, "application/octet-stream")
        
        return FileResponse(output_path, filename=output_filename, media_type=media_type)
    except ffmpeg.Error as e:
        error_message = e.stderr.decode('utf8') if e.stderr else str(e)
        raise HTTPException(status_code=500, detail=f"FFmpeg Error: {error_message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/media/download")
async def download_video(url: str = Form(...), format: str = Form("mp4")):
    import yt_dlp
    
    file_id = str(uuid.uuid4())
    output_template = os.path.join(OUTPUT_DIR, f"{file_id}_%(title)s.%(ext)s")
    
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best' if format == 'mp4' else 'bestaudio/best',
        'outtmpl': output_template,
        'postprocessors': [{'key': 'FFmpegVideoConvertor', 'preferedformat': format}] if format == 'mp4' else [{'key': 'FFmpegExtractAudio', 'preferredcodec': format}],
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            
            # Adjust filename extension if post-processing changed it
            base, _ = os.path.splitext(filename)
            final_path = f"{base}.{format}"
            
            if not os.path.exists(final_path):
                # Fallback if filename didn't change as expected or if original was kept
                if os.path.exists(filename):
                    final_path = filename
                else:
                     # Try to find the file with the expected ID prefix
                    for f in os.listdir(OUTPUT_DIR):
                        if f.startswith(file_id) and f.endswith(f".{format}"):
                            final_path = os.path.join(OUTPUT_DIR, f)
                            break
            
            if not os.path.exists(final_path):
                 raise HTTPException(status_code=500, detail="Downloaded file not found")

            return FileResponse(final_path, filename=os.path.basename(final_path), media_type=f"video/{format}" if format == 'mp4' else f"audio/{format}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")

@router.post("/convert/media/compress")
async def compress_video(file: UploadFile = File(...), crf: int = Form(28)):
    # CRF 28 is a good default for compression (lower is better quality, higher is smaller size)
    # Range 0-51, 18-28 is sane.
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"compressed_{file.filename}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        stream = ffmpeg.input(input_path)
        # Use libx264 for compatibility and CRF for compression
        stream = ffmpeg.output(stream, output_path, vcodec='libx264', crf=crf, preset='fast')
        ffmpeg.run(stream, overwrite_output=True, capture_stdout=True, capture_stderr=True)
        
        return FileResponse(output_path, filename=output_filename, media_type="video/mp4")
    except ffmpeg.Error as e:
        error_message = e.stderr.decode('utf8') if e.stderr else str(e)
        raise HTTPException(status_code=500, detail=f"Compression Error: {error_message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
