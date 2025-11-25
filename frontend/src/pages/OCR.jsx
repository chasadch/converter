import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Upload, Download, Copy, CheckCircle } from 'lucide-react';

const OCR = () => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [status, setStatus] = useState('idle'); // idle, processing, success, error
    const [error, setError] = useState('');
    const [stats, setStats] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/bmp', 'image/gif'];
            if (allowedTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                setError('');
                setExtractedText('');
                setStats(null);
            } else {
                setError('Please select a valid image file (JPG, PNG, TIFF, BMP, GIF)');
                setFile(null);
            }
        }
    };

    const handleExtractText = async () => {
        if (!file) return;

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/convert/ocr/extract', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setExtractedText(response.data.text);
            setStats({
                characters: response.data.character_count,
                words: response.data.word_count
            });
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'OCR extraction failed');
            setStatus('error');
        }
    };

    const handleDownloadText = () => {
        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.split('.')[0]}_extracted.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(extractedText);
    };

    const handleCreateSearchablePDF = async () => {
        if (!file) return;

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/convert/ocr/searchable-pdf', formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file.name.split('.')[0]}_searchable.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'PDF creation failed');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">OCR - Text Extraction</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Extract text from images using Optical Character Recognition (OCR)
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-surface border border-border rounded-lg p-8 mb-6">
                    <div className="text-center">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/jpeg,image/png,image/tiff,image/bmp,image/gif"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg cursor-pointer transition-all hover:-translate-y-0.5"
                        >
                            <Upload size={20} />
                            Choose Image
                        </label>

                        {file && (
                            <div className="mt-4 p-4 bg-surface-hover rounded-lg">
                                <p className="text-sm text-text-muted">Selected: <span className="text-text font-medium">{file.name}</span></p>
                                <p className="text-xs text-text-muted mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={handleExtractText}
                                disabled={status === 'processing'}
                                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'processing' ? 'Extracting...' : 'Extract Text'}
                            </button>
                            <button
                                onClick={handleCreateSearchablePDF}
                                disabled={status === 'processing'}
                                className="px-6 py-3 bg-surface hover:bg-surface-hover border border-border text-text font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Searchable PDF
                            </button>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                        {error}
                    </div>
                )}

                {/* Success & Results */}
                {extractedText && (
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-text">Extracted Text</h3>
                            {stats && (
                                <div className="flex gap-4 text-sm text-text-muted">
                                    <span>{stats.characters} characters</span>
                                    <span>{stats.words} words</span>
                                </div>
                            )}
                        </div>

                        <textarea
                            value={extractedText}
                            onChange={(e) => setExtractedText(e.target.value)}
                            className="w-full h-64 p-4 bg-background border border-border rounded-lg text-text font-mono text-sm resize-y"
                        />

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={handleDownloadText}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all"
                            >
                                <Download size={18} />
                                Download as TXT
                            </button>
                            <button
                                onClick={handleCopyText}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover border border-border text-text font-medium rounded-lg transition-all"
                            >
                                <Copy size={18} />
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                )}

                {/* How it Works */}
                <div className="mt-12 bg-surface border border-border rounded-lg p-8">
                    <h3 className="text-xl font-semibold mb-4 text-text">How to Use</h3>
                    <ol className="space-y-3 text-text-muted">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold">1</span>
                            <span>Upload an image containing text (JPG, PNG, TIFF, BMP, or GIF)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold">2</span>
                            <span>Click "Extract Text" to get plain text, or "Create Searchable PDF" for a PDF with embedded text</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold">3</span>
                            <span>Download the extracted text or copy it to your clipboard</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default OCR;
