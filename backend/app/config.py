import os

# FFmpeg Configuration
# Use environment variable if set (for Docker/Production), otherwise use local path
FFMPEG_PATH = os.environ.get("FFMPEG_PATH", r"C:\Users\TECHNIFI\Downloads\ffmpeg-8.0.1\ffmpeg-8.0.1\bin\ffmpeg.exe")
FFPROBE_PATH = os.environ.get("FFPROBE_PATH", r"C:\Users\TECHNIFI\Downloads\ffmpeg-8.0.1\ffmpeg-8.0.1\bin\ffprobe.exe")

# Add FFmpeg to PATH for subprocess calls if needed
os.environ["PATH"] += os.pathsep + os.path.dirname(FFMPEG_PATH)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
