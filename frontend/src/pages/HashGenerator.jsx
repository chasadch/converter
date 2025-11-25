import React, { useState } from 'react';
import axios from 'axios';
import { Hash, Upload, Copy } from 'lucide-react';

const HashGenerator = () => {
    const [file, setFile] = useState(null);
    const [algorithm, setAlgorithm] = useState('sha256');
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleGenerateHash = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('algorithm', algorithm);

        try {
            const response = await axios.post('/utils/hash', formData);
            setResult(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Hash generation failed');
            setStatus('error');
        }
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result.hash);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Hash className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">Hash Generator</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Generate file hashes and checksums for verification
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-surface border border-border rounded-lg p-8">
                    {/* File Upload */}
                    <div className="mb-6">
                        <input
                            type="file"
                            id="file-input"
                            className="hidden"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                                setResult(null);
                            }}
                        />
                        <label
                            htmlFor="file-input"
                            className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                        >
                            <Upload className="mx-auto mb-4 text-text-muted" size={48} />
                            <p className="text-text font-medium">
                                {file ? file.name : 'Click to select file'}
                            </p>
                            {file && (
                                <p className="text-sm text-text-muted mt-2">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            )}
                        </label>
                    </div>

                    {/* Algorithm Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text mb-2">
                            Hash Algorithm
                        </label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                        >
                            <option value="md5">MD5</option>
                            <option value="sha1">SHA-1</option>
                            <option value="sha256">SHA-256 (Recommended)</option>
                            <option value="sha512">SHA-512</option>
                        </select>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerateHash}
                        disabled={status === 'processing'}
                        className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                    >
                        {status === 'processing' ? 'Generating Hash...' : 'Generate Hash'}
                    </button>

                    {/* Result */}
                    {result && (
                        <div className="mt-6 p-4 bg-background rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold">Hash Result:</h4>
                                <button
                                    onClick={copyToClipboard}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-surface hover:bg-surface-hover border border-border rounded-lg transition-colors"
                                >
                                    <Copy size={16} />
                                    Copy
                                </button>
                            </div>

                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-text-muted">File:</dt>
                                    <dd className="text-text font-medium">{result.filename}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-text-muted">Algorithm:</dt>
                                    <dd className="text-text font-medium uppercase">{result.algorithm}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-text-muted">Size:</dt>
                                    <dd className="text-text font-medium">{(result.size_bytes / 1024).toFixed(2)} KB</dd>
                                </div>
                            </dl>

                            <div className="mt-4">
                                <p className="text-xs text-text-muted mb-1">Hash Value:</p>
                                <div className="p-3 bg-surface border border-border rounded font-mono text-xs break-all">
                                    {result.hash}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                            {error}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="mt-8 bg-surface border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">About File Hashes</h3>
                    <p className="text-sm text-text-muted mb-4">
                        File hashes are used to verify file integrity and authenticity. Compare hashes to ensure files haven't been modified or corrupted.
                    </p>
                    <ul className="space-y-2 text-sm text-text-muted">
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span><strong>MD5:</strong> Fast but not cryptographically secure</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span><strong>SHA-1:</strong> Better than MD5, but still not recommended for security</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span><strong>SHA-256:</strong> Secure and widely used (recommended)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span><strong>SHA-512:</strong> Maximum security for critical applications</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HashGenerator;
