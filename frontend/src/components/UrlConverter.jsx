import React, { useState } from 'react';
import axios from 'axios';
import { Link as LinkIcon, Loader2, ArrowRight, Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const UrlConverter = ({
    title,
    description,
    endpoint,
    placeholder = "Paste URL here...",
    buttonLabel = "Download",
    formats = []
}) => {
    const [url, setUrl] = useState('');
    const [selectedFormat, setSelectedFormat] = useState(formats[0]?.value || 'mp4');
    const [status, setStatus] = useState('idle');
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [error, setError] = useState(null);
    const [filename, setFilename] = useState('download');

    const handleConvert = async () => {
        if (!url) {
            setError("Please enter a URL");
            return;
        }

        setStatus('converting');
        setError(null);

        const formData = new FormData();
        formData.append('url', url);
        formData.append('format', selectedFormat);

        try {
            const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
            const response = await axios.post(`${API_URL}${endpoint}`, formData, {
                responseType: 'blob',
            });

            // Extract filename from headers if available
            const contentDisposition = response.headers['content-disposition'];
            let extractedFilename = 'download.' + selectedFormat;
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch[1]) {
                    extractedFilename = filenameMatch[1];
                }
            }
            setFilename(extractedFilename);

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const downloadUrl = window.URL.createObjectURL(blob);
            setDownloadUrl(downloadUrl);
            setStatus('success');
        } catch (err) {
            console.error("Download error:", err);
            setStatus('error');
            if (err.response && err.response.data instanceof Blob) {
                const text = await err.response.data.text();
                try {
                    const json = JSON.parse(text);
                    setError(json.detail || "Download failed. Please check the URL.");
                } catch {
                    setError("An unexpected error occurred.");
                }
            } else {
                setError(err.message || "Network error.");
            }
        }
    };

    const reset = () => {
        setUrl('');
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

                {status !== 'success' && (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-muted">Video URL</label>
                            <div className="flex items-center gap-2 bg-surface border border-border rounded-xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <LinkIcon className="text-text-muted ml-2" size={20} />
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder={placeholder}
                                    className="bg-transparent border-none outline-none w-full p-2 text-text placeholder:text-text-muted/50"
                                />
                            </div>
                        </div>

                        {formats.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">Format</label>
                                <div className="flex flex-wrap gap-3">
                                    {formats.map(fmt => (
                                        <button
                                            key={fmt.value}
                                            onClick={() => setSelectedFormat(fmt.value)}
                                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${selectedFormat === fmt.value
                                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                                : 'bg-surface border border-border hover:border-primary/50'
                                                }`}
                                        >
                                            {fmt.label}
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
                            disabled={status === 'converting' || !url}
                            className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'converting' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {buttonLabel}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Ready!</h3>
                        <p className="text-text-muted mb-8">Your video has been processed.</p>

                        <div className="flex flex-col gap-3">
                            <a
                                href={downloadUrl}
                                download={filename}
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
                                Process Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlConverter;
