from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import pytesseract
from PIL import Image
import io
import os

router = APIRouter()

@router.post("/convert/ocr/extract")
async def extract_text_from_image(file: UploadFile = File(...)):
    """
    Extract text from an image using OCR (Optical Character Recognition)
    Supports: JPG, PNG, TIFF, BMP, GIF
    """
    try:
        # Validate file type
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp', '.gif']
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if necessary (for transparency)
        if image.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
            image = background
        
        # Perform OCR
        try:
            extracted_text = pytesseract.image_to_string(image, lang='eng')
        except pytesseract.TesseractNotFoundError:
            raise HTTPException(
                status_code=500,
                detail="Tesseract OCR is not installed or not found in PATH. Please install tesseract-ocr."
            )
        
        # Return extracted text
        return JSONResponse(content={
            "success": True,
            "filename": file.filename,
            "text": extracted_text.strip(),
            "character_count": len(extracted_text.strip()),
            "word_count": len(extracted_text.split())
        })
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}")


@router.post("/convert/ocr/searchable-pdf")
async def create_searchable_pdf(file: UploadFile = File(...)):
    """
    Convert an image to a searchable PDF (OCR embedded)
    """
    try:
        # Validate file type
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp']
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB
        if image.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
            image = background
        
        # Create searchable PDF using pytesseract
        pdf_bytes = pytesseract.image_to_pdf_or_hocr(image, extension='pdf')
        
        # Return PDF
        from fastapi.responses import Response
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{os.path.splitext(file.filename)[0]}_ocr.pdf"'
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF creation failed: {str(e)}")
