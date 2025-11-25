from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routers import documents, images, media, archives, utils, pdf_tools, ocr, qr_barcode, pdf_advanced
from app.config import UPLOAD_DIR, OUTPUT_DIR
import os

app = FastAPI(title="All-in-One Converter API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this allows the frontend on the same origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router, tags=["Documents"])
app.include_router(images.router, tags=["Images"])
app.include_router(media.router, tags=["Media"])
app.include_router(archives.router, tags=["Archives"])
app.include_router(utils.router, tags=["Utils"])
app.include_router(pdf_tools.router, tags=["PDF Tools"])
app.include_router(ocr.router, tags=["OCR"])
app.include_router(qr_barcode.router, tags=["QR & Barcode"])
app.include_router(pdf_advanced.router, tags=["PDF Advanced"])

# Serve Frontend Static Files (Production)
# We assume the frontend build is copied to 'static' directory in Docker
if os.path.exists("static"):
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Allow API routes to pass through
        if full_path.startswith("convert") or full_path.startswith("docs") or full_path.startswith("openapi"):
            return None # Let FastAPI handle it (404 if not found)
            
        # Serve index.html for all other routes (SPA)
        return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
