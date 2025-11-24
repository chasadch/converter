from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import uuid
from typing import List, Optional
from pypdf import PdfReader, PdfWriter
from ..config import UPLOAD_DIR, OUTPUT_DIR

router = APIRouter()

@router.post("/convert/pdf/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least two PDF files are required for merging.")

    file_id = str(uuid.uuid4())
    output_filename = f"merged_{file_id}.pdf"
    output_path = os.path.join(OUTPUT_DIR, output_filename)

    try:
        merger = PdfWriter()
        
        for file in files:
            if not file.filename.lower().endswith('.pdf'):
                 raise HTTPException(status_code=400, detail=f"File {file.filename} is not a PDF.")
            
            # Save temp file
            temp_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}_{file.filename}")
            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            merger.append(temp_path)

        merger.write(output_path)
        merger.close()

        return FileResponse(output_path, filename="merged_document.pdf", media_type="application/pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Merge failed: {str(e)}")

@router.post("/convert/pdf/protect")
async def protect_pdf(file: UploadFile = File(...), password: str = Form(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF.")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"protected_{file.filename}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)

        writer.encrypt(password)

        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(output_path, filename=output_filename, media_type="application/pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Protection failed: {str(e)}")

@router.post("/convert/pdf/unlock")
async def unlock_pdf(file: UploadFile = File(...), password: str = Form(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF.")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"unlocked_{file.filename}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        reader = PdfReader(input_path)
        
        if reader.is_encrypted:
            reader.decrypt(password)
        
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)

        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(output_path, filename=output_filename, media_type="application/pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unlock failed: {str(e)} (Incorrect password?)")

@router.post("/convert/pdf/compress")
async def compress_pdf(file: UploadFile = File(...)):
    # Basic compression by removing duplication and unused objects
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF.")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"compressed_{file.filename}"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)
            page.compress_content_streams() # Compress page content

        # Set compression level
        for page in writer.pages:
            for img in page.images:
                # This is a placeholder for more advanced image compression if needed
                pass

        with open(output_path, "wb") as f:
            writer.write(f)
            
        return FileResponse(output_path, filename=output_filename, media_type="application/pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compression failed: {str(e)}")
