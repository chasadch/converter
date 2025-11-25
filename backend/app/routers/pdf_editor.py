from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
import fitz  # PyMuPDF
import io

router = APIRouter()

@router.post("/pdf/edit/find-replace")
async def find_replace_text(
    file: UploadFile = File(...),
    find_text: str = Form(...),
    replace_text: str = Form(...)
):
    """Find and replace text in PDF"""
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        
        replacements_made = 0
        
        for page_num in range(len(doc)):
            page = doc[page_num]
            
            # Search for text
            text_instances = page.search_for(find_text)
            
            for inst in text_instances:
                # Redact (remove) old text
                page.add_redact_annot(inst, fill=(1, 1, 1))  # White fill
                page.apply_redactions()
                
                # Add new text in same position
                page.insert_text(
                    inst.top_left,
                    replace_text,
                    fontsize=12,
                    color=(0, 0, 0)
                )
                replacements_made += 1
        
        # Save to bytes
        output = io.BytesIO()
        doc.save(output)
        doc.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=edited.pdf",
                "X-Replacements-Made": str(replacements_made)
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text replacement failed: {str(e)}")


@router.post("/pdf/edit/add-text")
async def add_text_to_pdf(
    file: UploadFile = File(...),
    text: str = Form(...),
    page_num: int = Form(0),
    x: float = Form(100),
    y: float = Form(100),
    font_size: int = Form(12),
    color: str = Form("black")  # "black", "red", "blue"
):
    """Add text overlay to PDF"""
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        
        if page_num >= len(doc):
            raise HTTPException(status_code=400, detail="Invalid page number")
        
        page = doc[page_num]
        
        # Color mapping
        color_map = {
            "black": (0, 0, 0),
            "red": (1, 0, 0),
            "blue": (0, 0, 1),
            "green": (0, 1, 0),
            "white": (1, 1, 1)
        }
        rgb_color = color_map.get(color, (0, 0, 0))
        
        # Add text
        page.insert_text(
            (x, y),
            text,
            fontsize=font_size,
            color=rgb_color
        )
        
        output = io.BytesIO()
        doc.save(output)
        doc.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=with_text.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Add text failed: {str(e)}")


@router.post("/pdf/edit/add-image")
async def add_image_to_pdf(
    pdf_file: UploadFile = File(...),
    image_file: UploadFile = File(...),
    page_num: int = Form(0),
    x: float = Form(100),
    y: float = Form(100),
    width: float = Form(100),
    height: float = Form(100)
):
    """Add image to PDF"""
    try:
        pdf_contents = await pdf_file.read()
        image_contents = await image_file.read()
        
        doc = fitz.open(stream=pdf_contents, filetype="pdf")
        
        if page_num >= len(doc):
            raise HTTPException(status_code=400, detail="Invalid page number")
        
        page = doc[page_num]
        
        # Define rectangle for image placement
        rect = fitz.Rect(x, y, x + width, y + height)
        
        # Insert image
        page.insert_image(rect, stream=image_contents)
        
        output = io.BytesIO()
        doc.save(output)
        doc.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=with_image.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Add image failed: {str(e)}")


@router.post("/pdf/edit/add-watermark")
async def add_watermark(
    file: UploadFile = File(...),
    watermark_text: str = Form(...),
    opacity: float = Form(0.3)
):
    """Add watermark to all pages"""
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        
        for page_num in range(len(doc)):
            page = doc[page_num]
            
            # Get page dimensions
            page_width = page.rect.width
            page_height = page.rect.height
            
            # Add watermark diagonally across page
            page.insert_text(
                (page_width / 2, page_height / 2),
                watermark_text,
                fontsize=60,
                color=(0.7, 0.7, 0.7),
                rotate=45,
                overlay=True
            )
        
        output = io.BytesIO()
        doc.save(output)
        doc.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=watermarked.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Watermark failed: {str(e)}")


@router.post("/pdf/edit/highlight")
async def add_highlight(
    file: UploadFile = File(...),
    page_num: int = Form(0),
    x0: float = Form(...),
    y0: float = Form(...),
    x1: float = Form(...),
    y1: float = Form(...)
):
    """Add highlight annotation to PDF"""
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        
        if page_num >= len(doc):
            raise HTTPException(status_code=400, detail="Invalid page number")
        
        page = doc[page_num]
        
        # Create highlight annotation
        highlight = page.add_highlight_annot(fitz.Rect(x0, y0, x1, y1))
        highlight.set_colors(stroke=(1, 1, 0))  # Yellow
        highlight.update()
        
        output = io.BytesIO()
        doc.save(output)
        doc.close()
        output.seek(0)
        
        return Response(
            content=output.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=highlighted.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Highlight failed: {str(e)}")
