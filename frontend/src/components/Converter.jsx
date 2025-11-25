import React, { useState } from 'react';
import axios from 'axios';
import { Upload, File, CheckCircle, AlertCircle, Loader2, ArrowRight, Download, RefreshCw, X } from 'lucide-react';

const Converter = ({
    title,
    description,
    endpoint,
    acceptedFileTypes,
    conversionOptions = [],
    defaultOption = "",
    optionLabel = "Select Format",
    multiple = false,
    outputExtension = null
}) => {
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, uploading, converting, success, error
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        validateAndSetFiles(selectedFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        validateAndSetFiles(droppedFiles);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleAddFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        if (newFiles.length > 0) {
            setFiles(prev => [...prev, ...newFiles]);
            e.target.value = null;
        }
    };

    const validateAndSetFiles = (selectedFiles) => {
        if (selectedFiles.length > 0) {
            if (!multiple) {
                setFiles([selectedFiles[0]]);
            } else {
                setFiles(selectedFiles);
            }
            setError(null);
            setStatus('idle');
            setDownloadUrl(null);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleConvert = async () => {
        if (files.length === 0) return;
        if (conversionOptions.length > 0 && !selectedOption) {
            setError(`Please ${optionLabel.toLowerCase()}`);
            return;
        }

        setStatus('converting');
        setError(null);

        const formData = new FormData();
        if (multiple) {
            files.forEach(file => {
                formData.append('files', file);
            });
        } else {
            formData.append('file', files[0]);
        }

        if (selectedOption) {
            if (endpoint.includes('protect') || endpoint.includes('unlock')) {
                formData.append('password', selectedOption);
            } else {
                formData.append('target_format', selectedOption);
            }
        }

        try {
            const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
            const response = await axios.post(`${API_URL}${endpoint}`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            setStatus('success');
        } catch (err) {
            console.error("Conversion error:", err);
            setStatus('error');

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
        setFiles([]);
        setStatus('idle');
        setDownloadUrl(null);
        setError(null);
        setSelectedOption(defaultOption);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">{title}</h2>
                <p className="text-text-muted text-lg">{description}</p>
            </div>

            <div className="card p-6 md:p-10 animate-scale-in">
                
                {/* File Upload Area */}
                {files.length === 0 && status !== 'success' && (
                    <div
                        className={`drop-zone ${dragActive ? 'active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept={acceptedFileTypes}
                            multiple={multiple}
                            onChange={handleFileChange}
                        />
                        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                            <Upload className="text-primary" size={36} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-text">
                            Drop {multiple ? "files" : "file"} here or click to browse
                        </h3>
                        <p className="text-text-muted">
                            {acceptedFileTypes ? `Supported: ${acceptedFileTypes}` : 'All file types supported'}
                        </p>
                    </div>
                )}

                {/* Selected Files */}
                {files.length > 0 && status !== 'success' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-3">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center p-4 bg-surface rounded-xl border border-border group hover:border-primary transition-all">
                                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mr-4 shrink-0">
                                        <File className="text-primary" size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate text-text">{file.name}</p>
                                        <p className="text-sm text-text-muted">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    {files.length > 1 && (
                                        <button 
                                            onClick={() => removeFile(index)} 
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2"
                                        >
                                            <X size={20} className="text-text-muted hover:text-error" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {multiple && files.length > 0 && (
                            <div>
                                <button
                                    onClick={() => document.getElementById('addFileInput').click()}
                                    className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                                >
                                    + Add more files
                                </button>
                                <input
                                    type="file"
                                    id="addFileInput"
                                    className="hidden"
                                    accept={acceptedFileTypes}
                                    multiple={true}
                                    onChange={handleAddFiles}
                                />
                            </div>
                        )}

                        {/* Format Options */}
                        {conversionOptions.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold mb-3 text-text">{optionLabel}</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {conversionOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setSelectedOption(opt.value)}
                                            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                                                selectedOption === opt.value
                                                    ? 'bg-primary text-white shadow-lg scale-105'
                                                    : 'bg-surface border border-border hover:border-primary hover:bg-primary-light text-text'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 animate-fade-in">
                                <AlertCircle className="shrink-0 mt-0.5" size={20} />
                                <div className="flex-1">
                                    <p className="font-semibold mb-1">Conversion Failed</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Convert Button */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleConvert}
                                disabled={status === 'converting'}
                                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <button
                                onClick={reset}
                                className="px-6 btn-secondary"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div className="text-center py-12 animate-scale-in">
                        <div className="w-24 h-24 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-text">Conversion Complete!</h3>
                        <p className="text-text-muted mb-8">Your file is ready to download</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <a
                                href={downloadUrl}
                                download={files.length > 0 ? `converted_${files[0].name.split('.')[0]}.${outputExtension || (selectedOption ? selectedOption.toLowerCase() : 'converted')}` : 'converted_file'}
                                className="flex-1 btn-primary flex items-center justify-center gap-2"
                            >
                                <Download size={20} />
                                Download File
                            </a>

                            <button
                                onClick={reset}
                                className="flex-1 btn-secondary flex items-center justify-center gap-2"
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
