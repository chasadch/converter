---
title: All In One Converter
emoji: 🔄
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
app_port: 7860
---

# All-in-One File Converter

A premium web application for converting PDF to Word and Word to PDF.

## Prerequisites
- **Python 3.8+**: Ensure Python is installed and added to PATH.
- **Node.js**: Ensure Node.js and npm are installed.
- **Microsoft Word**: Required for Word to PDF conversion on Windows.
- **FFmpeg**: Required for video/audio conversions (auto-installed in Docker).
- **Internet Connection**: Required for video download feature.

## Quick Start (Windows)
Double-click the `run.bat` file to automatically set up dependencies and start the application.

## Manual Setup

### Backend
1. Navigate to the `backend` folder.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Accessing the App
Open your browser and go to: [http://localhost:5173](http://localhost:5173)

## Docker Deployment

### Quick Start with Docker Compose (Recommended)
```bash
docker-compose up -d
```
Access at: [http://localhost:7860](http://localhost:7860)

### Manual Docker Build
```bash
# Build the image
docker build -t allinone-converter .

# Run with DNS configuration (fixes video download issues)
docker run -p 7860:7860 --dns 8.8.8.8 --dns 8.8.4.4 allinone-converter
```

### Troubleshooting
If you encounter **"Failed to resolve 'www.youtube.com'"** error:
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for DNS fixes
- Run network test: `cd backend && python test_network.py`

## Testing Network Connectivity
```bash
cd backend
python test_network.py
```
This will verify DNS, HTTPS, yt-dlp, and FFmpeg are working correctly.
