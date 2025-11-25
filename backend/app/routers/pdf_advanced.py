from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response, JSONResponse
from PyPDF2 import PdfReader, PdfWriter, PdfMerger
import io
import os
from typing import List

router = APIRouter()

@router.post("/convert/pdf/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """
    Merge multiple PDF files into one
    """
    try:
        if len(files) < 2:
            raise HTTPException(status_code=400, detail="At least 2 PDF files required")
        
        merger = PdfMerger()
        
        for file in files:
            contents = await file.read()
            pdf_stream = io.BytesIO(contents)
            merger.append(pdf_stream)
        
        output = io.BytesIO()
        merger.write(output)
        merger.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF merge failed: {str(e)}")


@router.post("/convert/pdf/split")
async def split_pdf(
    file: UploadFile = File(...),
    pages: str = Form(...)  # Format: "1-3,5,7-9"
):
    """
    Split PDF and extract specific pages
    Format: "1-3,5,7-9" extracts pages 1,2,3,5,7,8,9
    """
    try:
        contents = await file.read()
        pdf = PdfReader(io.BytesIO(contents))
        
        # Parse page numbers
        page_numbers = []
        for part in pages.split(','):
            if '-' in part:
                start, end = map(int, part.split('-'))
                page_numbers.extend(range(start - 1, end))  # 0-indexed
            else:
                page_numbers.append(int(part) - 1)
        
        writer = PdfWriter()
        for page_num in page_numbers:
            if 0 <= page_num < len(pdf.pages):
                writer.add_page(pdf.pages[page_num])
        
        output = io.BytesIO()
        writer.write(output)
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=split_pages.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF split failed: {str(e)}")


@router.post("/convert/pdf/rotate")
async def rotate_pdf(
    file: UploadFile = File(...),
    angle: int = Form(90)  # 90, 180, 270
):
    """
    Rotate all pages in a PDF
    """
    try:
        if angle not in [90, 180, 270, -90]:
            raise HTTPException(status_code=400, detail="Angle must be 90, 180, or 270")
        
        contents = await file.read()
        pdf = PdfReader(io.BytesIO(contents))
        writer = PdfWriter()
        
        for page in pdf.pages:
            page.rotate(angle)
            writer.add_page(page)
        
        output = io.BytesIO()
        writer.write(output)
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=rotated.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF rotation failed: {str(e)}")


@router.post("/convert/pdf/info")
async def get_pdf_info(file: UploadFile = File(...)):
    """
    Get PDF metadata and information
    """
    try:
        contents = await file.read()
        pdf = PdfReader(io.BytesIO(contents))
        
        metadata = pdf.metadata if pdf.metadata else {}
        
        return JSONResponse(content={
            "pages": len(pdf.pages),
            "title": metadata.get('/Title', 'N/A'),
            "author": metadata.get('/Author', 'N/A'),
            "subject": metadata.get('/Subject', 'N/A'),
            "creator": metadata.get('/Creator', 'N/A'),
            "producer": metadata.get('/Producer', 'N/A'),
            "creation_date": str(metadata.get('/CreationDate', 'N/A')),
            "isEncrypted": pdf.is_encrypted
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read PDF info: {str(e)}")
