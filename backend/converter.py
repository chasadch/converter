from pdf2docx import Converter
from docx2pdf import convert
import pythoncom

def convert_pdf_to_word(input_path, output_path):
    """Converts a PDF file to a Word document."""
    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)
    cv.close()

def convert_word_to_pdf(input_path, output_path):
    """Converts a Word document to a PDF file."""
    # Initialize COM library for Windows (needed for docx2pdf in a thread/async context)
    try:
        pythoncom.CoInitialize()
        convert(input_path, output_path)
    finally:
        pythoncom.CoUninitialize()
