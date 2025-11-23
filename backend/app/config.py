import os

# FFmpeg Configuration
# Assuming the user extracted it to the Downloads folder as specified
FFMPEG_PATH = r"C:\Users\TECHNIFI\Downloads\ffmpeg-8.0.1\ffmpeg-8.0.1\bin\ffmpeg.exe"
FFPROBE_PATH = r"C:\Users\TECHNIFI\Downloads\ffmpeg-8.0.1\ffmpeg-8.0.1\bin\ffprobe.exe"

# Add FFmpeg to PATH for subprocess calls if needed
os.environ["PATH"] += os.pathsep + os.path.dirname(FFMPEG_PATH)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
