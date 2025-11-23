import React, { useState } from 'react';
import axios from 'axios';
import { Upload, File, CheckCircle, AlertCircle, Loader2, ArrowRight, Download, RefreshCw } from 'lucide-react';

const Converter = ({
    title,
    description,
    endpoint,
    acceptedFileTypes,
    conversionOptions = [],
    defaultOption = "",
    optionLabel = "Select Format"
}) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, converting, success, error
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile) {
            // Basic validation (can be expanded)
            setFile(selectedFile);
            setError(null);
            setStatus('idle');
            setDownloadUrl(null);
        }
    };

    const handleConvert = async () => {
        if (!file) return;
        if (conversionOptions.length > 0 && !selectedOption) {
            setError(`Please ${optionLabel.toLowerCase()}`);
            return;
        }

        setStatus('converting');
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        if (selectedOption) {
            formData.append('target_format', selectedOption);
        }

        try {
            const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
            const response = await axios.post(`${API_URL}${endpoint}`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Create download link
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            setStatus('success');
        } catch (err) {
            console.error("Conversion error:", err);
            setStatus('error');

            // Try to read the error message from the blob
            if (err.response && err.response.data instanceof Blob) {
                const text = await err.response.data.text();
                try {
                    const json = JSON.parse(text);
                    setError(json.detail || "Conversion failed. Please try again.");
                } catch {
                    setError("An unexpected error occurred.");
                }
            } else {
                setError(err.message || "Network error. Please check if the backend is running.");
            }
        }
    };

    const reset = () => {
        setFile(null);
        setStatus('idle');
        setDownloadUrl(null);
        setError(null);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 gradient-text">{title}</h2>
                <p className="text-text-muted">{description}</p>
            </div>

            <div className="glass-panel p-4 md:p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">

                {/* File Upload Area */}
                {!file && (
                    <div
                        className="border-2 border-dashed border-border rounded-xl p-12 text-center transition-all duration-300 hover:border-primary hover:bg-primary/5 group cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept={acceptedFileTypes}
                            onChange={handleFileChange}
                        />
                        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Upload className="text-primary" size={28} />
                        </div>
                        <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-text-muted">Supported files: {acceptedFileTypes || "All files"}</p>
                    </div>
                )}

                {/* Selected File & Options */}
                {file && status !== 'success' && (
                    <div className="space-y-6">
                        <div className="flex items-center p-4 bg-surface rounded-xl border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                                <File className="text-primary" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium truncate">{file.name}</p>
                                <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <AlertCircle size={20} className="text-text-muted hover:text-red-400" />
                            </button>
                        </div>

                        {conversionOptions.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">{optionLabel}</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {conversionOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setSelectedOption(opt.value)}
                                            className={`py-2 px-3 md:px-4 rounded-lg text-sm font-medium transition-all ${selectedOption === opt.value
                                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                                : 'bg-surface border border-border hover:border-primary/50'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-200">
                                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleConvert}
                            disabled={status === 'converting'}
                            className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'converting' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Converting...
                                </>
                            ) : (
                                <>
                                    Convert Now
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Conversion Complete!</h3>
                        <p className="text-text-muted mb-8">Your file is ready for download.</p>

                        <div className="flex flex-col gap-3">
                            <a
                                href={downloadUrl}
                                download={file ? `converted_${file.name.split('.')[0]}.${selectedOption ? selectedOption.toLowerCase() : 'converted'}` : 'converted_file'}
                                className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                            >
                                <Download size={20} />
                                Download File
                            </a>

                            <button
                                onClick={reset}
                                className="w-full py-4 bg-surface hover:bg-white/5 border border-border rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={20} />
                                Convert Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Converter;
