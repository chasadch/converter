from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
import uuid
from ..config import UPLOAD_DIR, OUTPUT_DIR
from pdf2docx import Converter
from docx2pdf import convert
import pythoncom
import pandas as pd
import markdown
import pdfkit

router = APIRouter()

@router.post("/convert/pdf-to-word")
async def pdf_to_word(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"{os.path.splitext(file.filename)[0]}.docx"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        cv = Converter(input_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()
        return FileResponse(output_path, filename=output_filename, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/word-to-pdf")
async def word_to_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith((".docx", ".doc")):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a Word document.")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"{os.path.splitext(file.filename)[0]}.pdf"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Initialize COM library for Windows
        pythoncom.CoInitialize()
        convert(input_path, output_path)
        return FileResponse(output_path, filename=output_filename, media_type="application/pdf")
    except Exception as e:
        error_msg = str(e)
        if "CoInitialize" in error_msg or "class not registered" in error_msg.lower():
             raise HTTPException(status_code=500, detail="Server Error: Microsoft Word is not installed or configured correctly on the server.")
        raise HTTPException(status_code=500, detail=f"Conversion failed: {error_msg}")
    finally:
        pythoncom.CoUninitialize()

@router.post("/convert/csv-to-excel")
async def csv_to_excel(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"{os.path.splitext(file.filename)[0]}.xlsx"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        df = pd.read_csv(input_path)
        df.to_excel(output_path, index=False)
        return FileResponse(output_path, filename=output_filename, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/markdown-to-html")
async def markdown_to_html(file: UploadFile = File(...)):
    if not file.filename.endswith(".md"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a Markdown file.")
    
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    output_filename = f"{os.path.splitext(file.filename)[0]}.html"
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_{output_filename}")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        with open(input_path, "r", encoding="utf-8") as f:
            text = f.read()
            html = markdown.markdown(text)
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
            
        return FileResponse(output_path, filename=output_filename, media_type="text/html")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
