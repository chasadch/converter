from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import uuid
from ..config import UPLOAD_DIR, OUTPUT_DIR
from PIL import Image

router = APIRouter()

@router.post("/convert/image")
async def convert_image(file: UploadFile = File(...), target_format: str = Form(...)):
    valid_formats = ["PNG", "JPEG", "WEBP", "GIF", "BMP", "TIFF", "PDF"]
    target_format = target_format.upper()
    
    if target_format not in valid_formats:
        raise HTTPException(status_code=400, detail=f"Invalid target format. Supported: {', '.join(valid_formats)}")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    
    # Handle JPEG extension
    ext = "jpg" if target_format == "JPEG" else target_format.lower()
    output_filename = f"{os.path.splitext(file.filename)[0]}.{ext}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        print(f"Processing image: {file.filename} -> {target_format}")
        with Image.open(input_path) as img:
            print(f"Image opened. Mode: {img.mode}, Size: {img.size}")
            # Convert to RGB if saving as JPEG (handles transparency)
            if target_format == "JPEG" and img.mode in ("RGBA", "P"):
                print("Converting to RGB for JPEG")
                img = img.convert("RGB")
            
            print(f"Saving to {output_path}")
            img.save(output_path, target_format)
            print("Save complete")
            
        media_type = f"image/{ext}" if target_format != "PDF" else "application/pdf"
        return FileResponse(output_path, filename=output_filename, media_type=media_type)
    except Exception as e:
        print(f"Error converting image: {e}")
        raise HTTPException(status_code=500, detail=str(e))
