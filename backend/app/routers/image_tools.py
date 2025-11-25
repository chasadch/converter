from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response, JSONResponse
from PIL import Image, ImageFilter, ImageEnhance
import io
import piexif
from colorthief import ColorThief

router = APIRouter()

@router.post("/convert/image/filter")
async def apply_image_filter(
    file: UploadFile = File(...),
    filter_type: str = Form(...)  # grayscale, sepia, blur, sharpen, edge, emboss
):
    """Apply filters to images"""
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Apply filters
        if filter_type == 'grayscale':
            img = img.convert('L').convert('RGB')
        elif filter_type == 'sepia':
            # Sepia tone
            img = img.convert('L')
            img = ImageEnhance.Color(img.convert('RGB')).enhance(0.0)
            r, g, b = img.split()
            img = Image.merge('RGB', (
                r.point(lambda i: min(255, int(i * 1.0))),
                g.point(lambda i: min(255, int(i * 0.95))),
                b.point(lambda i: min(255, int(i * 0.82)))
            ))
        elif filter_type == 'blur':
            img = img.filter(ImageFilter.BLUR)
        elif filter_type == 'sharpen':
            img = img.filter(ImageFilter.SHARPEN)
        elif filter_type == 'edge':
            img = img.filter(ImageFilter.FIND_EDGES)
        elif filter_type == 'emboss':
            img = img.filter(ImageFilter.EMBOSS)
        else:
            raise HTTPException(status_code=400, detail="Invalid filter type")
        
        # Save to bytes
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        
        return Response(
            content=buf.getvalue(),
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename=filtered_{file.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Filter failed: {str(e)}")


@router.post("/convert/image/adjust")
async def adjust_image(
    file: UploadFile = File(...),
    brightness: float = Form(1.0),  # 0.5 = darker, 1.5 = brighter
    contrast: float = Form(1.0),
    saturation: float = Form(1.0)
):
    """Adjust brightness, contrast, saturation"""
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Apply adjustments
        if brightness != 1.0:
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(brightness)
        
        if contrast != 1.0:
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(contrast)
        
        if saturation != 1.0:
            enhancer = ImageEnhance.Color(img)
            img = enhancer.enhance(saturation)
        
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        
        return Response(
            content=buf.getvalue(),
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename=adjusted_{file.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Adjustment failed: {str(e)}")


@router.post("/convert/image/exif")
async def get_exif_data(file: UploadFile = File(...)):
    """Get EXIF metadata from image"""
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        exif_dict = {}
        if hasattr(img, '_getexif') and img._getexif():
            exif_data = img._getexif()
            for tag_id, value in exif_data.items():
                tag = piexif.TAGS.get(tag_id, tag_id)
                exif_dict[str(tag)] = str(value)
        
        return JSONResponse(content={
            "filename": file.filename,
            "has_exif": bool(exif_dict),
            "exif_data": exif_dict or {}
        })
    except Exception as e:
        return JSONResponse(content={
            "filename": file.filename,
            "has_exif": False,
            "exif_data": {},
            "error": str(e)
        })


@router.post("/convert/image/strip-exif")
async def remove_exif(file: UploadFile = File(...)):
    """Remove EXIF data from image"""
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))
        
        # Remove EXIF by saving without it
        data = list(img.getdata())
        image_without_exif = Image.new(img.mode, img.size)
        image_without_exif.putdata(data)
        
        buf = io.BytesIO()
        image_without_exif.save(buf, format='PNG')
        buf.seek(0)
        
        return Response(
            content=buf.getvalue(),
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename=no_exif_{file.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"EXIF removal failed: {str(e)}")


@router.post("/extract/colors")
async def extract_color_palette(
    file: UploadFile = File(...),
    color_count: int = Form(5)
):
    """Extract dominant colors from image"""
    try:
        contents = await file.read()
        
        # Save to temp BytesIO for ColorThief
        buf = io.BytesIO(contents)
        color_thief = ColorThief(buf)
        
        # Get palette
        palette = color_thief.get_palette(color_count=color_count, quality=1)
        
        # Convert to hex
        hex_colors = ['#{:02x}{:02x}{:02x}'.format(r, g, b) for r, g, b in palette]
        
        return JSONResponse(content={
            "filename": file.filename,
            "colors": [
                {
                    "hex": hex_col,
                    "rgb": f"rgb({rgb[0]}, {rgb[1]}, {rgb[2]})",
                    "values": {"r": rgb[0], "g": rgb[1], "b": rgb[2]}
                }
                for hex_col, rgb in zip(hex_colors, palette)
            ]
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Color extraction failed: {str(e)}")
