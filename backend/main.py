from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import documents, images, media, archives, utils
from app.config import UPLOAD_DIR, OUTPUT_DIR
import os

app = FastAPI(title="All-in-One Converter API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(documents.router, tags=["Documents"])
app.include_router(images.router, tags=["Images"])
app.include_router(media.router, tags=["Media"])
app.include_router(archives.router, tags=["Archives"])
app.include_router(utils.router, tags=["Utilities"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
