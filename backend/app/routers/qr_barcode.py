from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import Response
import qrcode
from io import BytesIO
import barcode
from barcode.writer import ImageWriter

router = APIRouter()

@router.post("/generate/qr")
async def generate_qr_code(
    data: str = Form(...),
    size: int = Form(10),
    border: int = Form(4),
    fill_color: str = Form("black"),
    back_color: str = Form("white")
):
    """
    Generate QR code from text/URL
    """
    try:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=size,
            border=border,
        )
        qr.add_data(data)
        qr.make(fit=True)

        img = qr.make_image(fill_color=fill_color, back_color=back_color)
        
        # Save to BytesIO
        buf = BytesIO()
        img.save(buf, format='PNG')
        buf.seek(0)
        
        return Response(
            content=buf.getvalue(),
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=qrcode.png"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"QR generation failed: {str(e)}")


@router.post("/generate/barcode")
async def generate_barcode_image(
    data: str = Form(...),
    barcode_type: str = Form("code128"),
):
    """
    Generate barcode
    Supported types: code128, code39, ean13, ean8, upca
    """
    try:
        # Map barcode types
        barcode_classes = {
            "code128": barcode.Code128,
            "code39": barcode.Code39,
            "ean13": barcode.EAN13,
            "ean8": barcode.EAN8,
            "upca": barcode.UPCA,
        }
        
        if barcode_type.lower() not in barcode_classes:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported barcode type. Supported: {', '.join(barcode_classes.keys())}"
            )
        
        barcode_class = barcode_classes[barcode_type.lower()]
        
        # Generate barcode
        buf = BytesIO()
        barcode_instance = barcode_class(data, writer=ImageWriter())
        barcode_instance.write(buf)
        buf.seek(0)
        
        return Response(
            content=buf.getvalue(),
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename=barcode_{barcode_type}.png"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Barcode generation failed: {str(e)}")
