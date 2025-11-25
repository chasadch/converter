import React, { useState } from 'react';
import axios from 'axios';
import { Code, Copy, RefreshCw } from 'lucide-react';

const DevTools = () => {
    const [activeTab, setActiveTab] = useState('json'); // json, uuid, url, lorem
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleJSONFormat = async (minify = false) => {
        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('text', input);
        formData.append('minify', minify);

        try {
            const response = await axios.post('/tools/json-format', formData);
            setOutput(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'JSON formatting failed');
            setStatus('error');
        }
    };

    const handleUUIDGenerate = async (version = 4, count = 10) => {
        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('count', count);
        formData.append('version', version);

        try {
            const response = await axios.post('/tools/uuid-generate', formData);
            setOutput(response.data.uuids.join('\n'));
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'UUID generation failed');
            setStatus('error');
        }
    };

    const handleURLEncode = async () => {
        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('text', input);

        try {
            const response = await axios.post('/tools/url-encode', formData);
            setOutput(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'URL encoding failed');
            setStatus('error');
        }
    };

    const handleURLDecode = async () => {
        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('text', input);

        try {
            const response = await axios.post('/tools/url-decode', formData);
            setOutput(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'URL decoding failed');
            setStatus('error');
        }
    };

    const handleLoremGenerate = async (paragraphs = 3) => {
        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('paragraphs', paragraphs);
        formData.append('words_per_para', 50);

        try {
            const response = await axios.post('/tools/lorem-ipsum', formData);
            setOutput(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Lorem Ipsum generation failed');
            setStatus('error');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Code className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">Developer Tools</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        JSON formatter, UUID generator, URL encoder, and more
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { id: 'json', label: 'JSON' },
                        { id: 'uuid', label: 'UUID' },
                        { id: 'url', label: 'URL' },
                        { id: 'lorem', label: 'Lorem' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setInput('');
                                setOutput('');
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input */}
                    {(activeTab === 'json' || activeTab === 'url') && (
                        <div className="bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-3">Input:</h3>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-64 p-4 bg-background border border-border rounded-lg text-text font-mono text-sm resize-none"
                                placeholder={activeTab === 'json' ? '{"key": "value"}' : 'https://example.com'}
                            />

                            {activeTab === 'json' && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleJSONFormat(false)}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg"
                                    >
                                        Format
                                    </button>
                                    <button
                                        onClick={() => handleJSONFormat(true)}
                                        className="flex-1 px-4 py-2 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                    >
                                        Minify
                                    </button>
                                </div>
                            )}

                            {activeTab === 'url' && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={handleURLEncode}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg"
                                    >
                                        Encode
                                    </button>
                                    <button
                                        onClick={handleURLDecode}
                                        className="flex-1 px-4 py-2 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                    >
                                        Decode
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'uuid' && (
                        <div className="bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-3">Generate UUIDs:</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleUUIDGenerate(4, 1)}
                                    className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg"
                                >
                                    Generate 1 UUID v4
                                </button>
                                <button
                                    onClick={() => handleUUIDGenerate(4, 10)}
                                    className="w-full px-4 py-3 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                >
                                    Generate 10 UUIDs v4
                                </button>
                                <button
                                    onClick={() => handleUUIDGenerate(1, 1)}
                                    className="w-full px-4 py-3 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                >
                                    Generate 1 UUID v1
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lorem' && (
                        <div className="bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-3">Generate Lorem Ipsum:</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleLoremGenerate(1)}
                                    className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg"
                                >
                                    1 Paragraph
                                </button>
                                <button
                                    onClick={() => handleLoremGenerate(3)}
                                    className="w-full px-4 py-3 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                >
                                    3 Paragraphs
                                </button>
                                <button
                                    onClick={() => handleLoremGenerate(5)}
                                    className="w-full px-4 py-3 bg-background hover:bg-surface border border-border text-text rounded-lg"
                                >
                                    5 Paragraphs
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Output */}
                    <div className="bg-surface border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">Output:</h3>
                            {output && (
                                <button
                                    onClick={copyToClipboard}
                                    className="px-3 py-1.5 bg-background hover:bg-surface-hover border border-border rounded-lg text-sm flex items-center gap-2"
                                >
                                    <Copy size={16} />
                                    Copy
                                </button>
                            )}
                        </div>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-64 p-4 bg-background border border-border rounded-lg text-text font-mono text-sm resize-none"
                            placeholder="Output will appear here..."
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevTools;
