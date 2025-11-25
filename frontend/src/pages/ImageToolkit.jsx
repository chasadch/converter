import React, { useState } from 'react';
import axios from 'axios';
import { Palette, Download, Copy, Eye, EyeOff } from 'lucide-react';

const ImageToolkit = () => {
    const [activeTab, setActiveTab] = useState('filters'); // filters, exif, colors
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    // Filter settings
    const [selectedFilter, setSelectedFilter] = useState('grayscale');

    // Color palette
    const [colorCount, setColorCount] = useState(5);

    const handleFilterApply = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('filter_type', selectedFilter);

        try {
            const response = await axios.post('/convert/image/filter', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult({ type: 'image', url });
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Filter failed');
            setStatus('error');
        }
    };

    const handleGetEXIF = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/convert/image/exif', formData);
            setResult({ type: 'exif', data: response.data });
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to read EXIF');
            setStatus('error');
        }
    };

    const handleRemoveEXIF = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/convert/image/strip-exif', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setResult({ type: 'image', url });
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'EXIF removal failed');
            setStatus('error');
        }
    };

    const handleExtractColors = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('color_count', colorCount);

        try {
            const response = await axios.post('/extract/colors', formData);
            setResult({ type: 'colors', data: response.data });
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Color extraction failed');
            setStatus('error');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Palette className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">Image Toolkit</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Filters, EXIF data, and color palette extraction
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { id: 'filters', label: 'Filters & Effects' },
                        { id: 'exif', label: 'EXIF Data' },
                        { id: 'colors', label: 'Color Palette' },
                    ].map(tab => (
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
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* File Upload */}
                <div className="bg-surface border border-border rounded-lg p-8 mb-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setResult(null);
                        }}
                        className="hidden"
                        id="image-input"
                    />
                    <label
                        htmlFor="image-input"
                        className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                    >
                        <Eye className="mx-auto mb-4 text-text-muted" size={48} />
                        <p className="text-text font-medium">
                            {file ? file.name : 'Click to select image'}
                        </p>
                    </label>
                </div>

                {/* Filters Tab */}
                {activeTab === 'filters' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Apply Filter</h3>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {['grayscale', 'sepia', 'blur', 'sharpen', 'edge', 'emboss'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`py-3 px-4 rounded-lg font-medium capitalize transition-all ${selectedFilter === filter
                                            ? 'bg-primary text-white'
                                            : 'bg-background border border-border text-text hover:bg-surface'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleFilterApply}
                            disabled={status === 'processing'}
                            className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Applying...' : 'Apply Filter'}
                        </button>
                    </div>
                )}

                {/* EXIF Tab */}
                {activeTab === 'exif' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">EXIF Data</h3>

                        <div className="flex gap-3">
                            <button
                                onClick={handleGetEXIF}
                                disabled={status === 'processing'}
                                className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Reading...' : 'View EXIF Data'}
                            </button>
                            <button
                                onClick={handleRemoveEXIF}
                                disabled={status === 'processing'}
                                className="flex-1 px-6 py-3 bg-background hover:bg-surface border border-border text-text font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                <EyeOff className="inline mr-2" size={20} />
                                Remove EXIF
                            </button>
                        </div>
                    </div>
                )}

                {/* Colors Tab */}
                {activeTab === 'colors' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Extract Color Palette</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-text mb-2">
                                Number of Colors: {colorCount}
                            </label>
                            <input
                                type="range"
                                min="3"
                                max="10"
                                value={colorCount}
                                onChange={(e) => setColorCount(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <button
                            onClick={handleExtractColors}
                            disabled={status === 'processing'}
                            className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Extracting...' : 'Extract Colors'}
                        </button>
                    </div>
                )}

                {/* Results */}
                {result && result.type === 'image' && (
                    <div className="mt-6 bg-surface border border-border rounded-lg p-8 text-center">
                        <h4 className="font-semibold mb-4">Result:</h4>
                        <img src={result.url} alt="Result" className="mx-auto max-w-full rounded-lg border border-border mb-4" />
                        <a
                            href={result.url}
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg"
                        >
                            <Download size={20} />
                            Download Image
                        </a>
                    </div>
                )}

                {result && result.type === 'exif' && (
                    <div className="mt-6 bg-surface border border-border rounded-lg p-8">
                        <h4 className="font-semibold mb-4">EXIF Data:</h4>
                        {result.data.has_exif ? (
                            <div className="p-4 bg-background rounded-lg font-mono text-xs max-h-96 overflow-auto">
                                <pre>{JSON.stringify(result.data.exif_data, null, 2)}</pre>
                            </div>
                        ) : (
                            <p className="text-text-muted">No EXIF data found in this image</p>
                        )}
                    </div>
                )}

                {result && result.type === 'colors' && (
                    <div className="mt-6 bg-surface border border-border rounded-lg p-8">
                        <h4 className="font-semibold mb-4">Color Palette:</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {result.data.colors.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                                    <div
                                        className="w-16 h-16 rounded-lg border border-border"
                                        style={{ backgroundColor: color.hex }}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="font-mono text-sm font-semibold">{color.hex}</p>
                                        <p className="font-mono text-xs text-text-muted">{color.rgb}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(color.hex)}
                                        className="px-3 py-2 bg-surface hover:bg-surface-hover border border-border rounded-lg transition-colors"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageToolkit;
