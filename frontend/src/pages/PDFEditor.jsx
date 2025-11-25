import React, { useState } from 'react';
import axios from 'axios';
import { Edit, Type, ImagePlus, Droplet, Download, Search } from 'lucide-react';

const PDFEditor = () => {
    const [activeTab, setActiveTab] = useState('replace'); // replace, addText, addImage, watermark
    const [pdfFile, setPdfFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    // Find/Replace
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');

    // Add Text
    const [newText, setNewText] = useState('');
    const [textX, setTextX] = useState(100);
    const [textY, setTextY] = useState(100);
    const [fontSize, setFontSize] = useState(12);
    const [textColor, setTextColor] = useState('black');

    // Watermark
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

    const handleFindReplace = async () => {
        if (!pdfFile || !findText) {
            setError('Please select PDF and enter text to find');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('find_text', findText);
        formData.append('replace_text', replaceText);

        try {
            const response = await axios.post('/pdf/edit/find-replace', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Find/replace failed');
            setStatus('error');
        }
    };

    const handleAddText = async () => {
        if (!pdfFile || !newText) {
            setError('Please select PDF and enter text');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('text', newText);
        formData.append('page_num', 0);
        formData.append('x', textX);
        formData.append('y', textY);
        formData.append('font_size', fontSize);
        formData.append('color', textColor);

        try {
            const response = await axios.post('/pdf/edit/add-text', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Add text failed');
            setStatus('error');
        }
    };

    const handleAddImage = async () => {
        if (!pdfFile || !imageFile) {
            setError('Please select both PDF and image');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('pdf_file', pdfFile);
        formData.append('image_file', imageFile);
        formData.append('page_num', 0);
        formData.append('x', 100);
        formData.append('y', 100);
        formData.append('width', 150);
        formData.append('height', 150);

        try {
            const response = await axios.post('/pdf/edit/add-image', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Add image failed');
            setStatus('error');
        }
    };

    const handleAddWatermark = async () => {
        if (!pdfFile || !watermarkText) {
            setError('Please select PDF and enter watermark text');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('watermark_text', watermarkText);
        formData.append('opacity', 0.3);

        try {
            const response = await axios.post('/pdf/edit/add-watermark', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Watermark failed');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Edit className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">PDF Editor</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Edit text, add images, watermarks, and annotations
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { id: 'replace', label: 'Find & Replace', icon: Search },
                        { id: 'addText', label: 'Add Text', icon: Type },
                        { id: 'addImage', label: 'Add Image', icon: ImagePlus },
                        { id: 'watermark', label: 'Watermark', icon: Droplet },
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setResult(null);
                                    setError('');
                                }}
                                className={`py-3 px-4 rounded-lg font-semibold transition-all ${activeTab === tab.id
                                        ? 'bg-primary text-white'
                                        : 'bg-surface border border-border text-text hover:bg-surface-hover'
                                    }`}
                            >
                                <Icon className="inline mr-2" size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* PDF Upload */}
                <div className="bg-surface border border-border rounded-lg p-6 mb-6">
                    <label className="block text-sm font-medium text-text mb-2">Upload PDF:</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                            setPdfFile(e.target.files[0]);
                            setResult(null);
                        }}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                    />
                    {pdfFile && <p className="text-sm text-text-muted mt-2">Selected: {pdfFile.name}</p>}
                </div>

                {/* Find & Replace */}
                {activeTab === 'replace' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Find and Replace Text</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Find:</label>
                                <input
                                    type="text"
                                    value={findText}
                                    onChange={(e) => setFindText(e.target.value)}
                                    placeholder="Text to find..."
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Replace with:</label>
                                <input
                                    type="text"
                                    value={replaceText}
                                    onChange={(e) => setReplaceText(e.target.value)}
                                    placeholder="Replacement text..."
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                />
                            </div>
                            <button
                                onClick={handleFindReplace}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Processing...' : 'Find & Replace'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Text */}
                {activeTab === 'addText' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Add Text to PDF</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Text:</label>
                                <textarea
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    placeholder="Enter text..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">Font Size:</label>
                                    <input
                                        type="number"
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Number(e.target.value))}
                                        min="8"
                                        max="72"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">Color:</label>
                                    <select
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                    >
                                        <option value="black">Black</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={handleAddText}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Adding...' : 'Add Text'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Image */}
                {activeTab === 'addImage' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Add Image/Logo to PDF</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Select Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                />
                            </div>
                            <button
                                onClick={handleAddImage}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Adding...' : 'Add Image to PDF'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Watermark */}
                {activeTab === 'watermark' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Add Watermark</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">Watermark Text:</label>
                                <input
                                    type="text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    placeholder="CONFIDENTIAL"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                />
                            </div>
                            <button
                                onClick={handleAddWatermark}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Adding...' : 'Add Watermark to All Pages'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Result */}
                {result && (
                    <div className="mt-6 bg-surface border border-border rounded-lg p-8 text-center">
                        <h4 className="font-semibold mb-4 text-success">✓ PDF Edited Successfully!</h4>
                        <a
                            href={result}
                            download="edited.pdf"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg"
                        >
                            <Download size={20} />
                            Download Edited PDF
                        </a>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFEditor;
