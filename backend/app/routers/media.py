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
        
        return FileResponse(output_path, filename=output_filename)
    except ffmpeg.Error as e:
        error_message = e.stderr.decode('utf8') if e.stderr else str(e)
        raise HTTPException(status_code=500, detail=f"FFmpeg Error: {error_message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
