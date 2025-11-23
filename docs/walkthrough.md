# All-in-One Converter Walkthrough

## Overview
The All-in-One Converter is a modern web application that allows users to convert PDF files to Word documents and vice-versa. It features a premium React frontend and a robust Python FastAPI backend.

## Features
- **PDF to Word**: Convert `.pdf` files to `.docx`.
- **Word to PDF**: Convert `.docx` files to `.pdf`.
- **Modern UI**: Glassmorphism design, smooth animations, and responsive layout.
- **Drag & Drop**: Easy file upload interface.

## Verification Steps

### 1. Start the Servers
Ensure both backend and frontend servers are running.
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:5173`

### 2. Test PDF to Word
1.  Open the frontend in your browser.
2.  Select "PDF to Word" mode.
3.  Drag and drop a PDF file.
4.  Click "Convert Now".
5.  Wait for the conversion to complete.
6.  Click "Download File" and verify the `.docx` output.

### 3. Test Word to PDF
1.  Select "Word to PDF" mode.
2.  Drag and drop a Word document (`.docx`).
3.  Click "Convert Now".
4.  Wait for the conversion to complete.
5.  Click "Download File" and verify the `.pdf` output.

## Notes
- The Word to PDF conversion requires Microsoft Word to be installed on the server machine (your computer).
- Ensure the backend virtual environment is activated if running manually.
