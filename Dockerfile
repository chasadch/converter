# Stage 1: Build Frontend
FROM node:18 as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Setup Backend & Runtime
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FFMPEG_PATH=ffmpeg

# Install system dependencies (FFmpeg is crucial)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY backend/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# Copy the frontend build from Stage 1 to 'static' directory in backend
COPY --from=frontend-build /app/frontend/dist /app/static

# Create uploads and outputs directories
RUN mkdir -p uploads outputs

# Expose the port the app runs on (Hugging Face Spaces uses 7860 by default)
EXPOSE 7860

# Command to run the application
# Note: Hugging Face expects the app to listen on port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
