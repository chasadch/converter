import React, { useState } from 'react';
import Converter from '../components/Converter';
import axios from 'axios';

const Utils = () => {
    const [activeTab, setActiveTab] = useState('base64');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleBase64 = async (action) => {
        try {
            const formData = new FormData();
            formData.append('text', inputText);
            const API_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
            const response = await axios.post(`${API_URL}/convert/utils/base64-${action}`, formData);
            setOutputText(response.data);
        } catch (err) {
            setOutputText('Error: ' + (err.response?.data?.detail || err.message));
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Utilities</h1>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab('base64')}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === 'base64'
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-surface hover:bg-white/5 border border-border'
                        }`}
                >
                    Base64 Converter
                </button>
                <button
                    onClick={() => setActiveTab('json-yaml')}
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === 'json-yaml'
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-surface hover:bg-white/5 border border-border'
                        }`}
                >
                    JSON ↔ YAML
                </button>
            </div>

            <div className="animate-fade-in">
                {activeTab === 'base64' && (
                    <div className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4">Base64 Encoder/Decoder</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">Input Text</label>
                                <textarea
                                    className="w-full h-48 bg-background border border-border rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Enter text to encode or decode..."
                                />
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleBase64('encode')}
                                        className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all"
                                    >
                                        Encode
                                    </button>
                                    <button
                                        onClick={() => handleBase64('decode')}
                                        className="flex-1 py-2 bg-surface hover:bg-white/5 border border-border rounded-lg font-medium transition-all"
                                    >
                                        Decode
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-muted">Output</label>
                                <textarea
                                    readOnly
                                    className="w-full h-48 bg-background/50 border border-border rounded-xl p-4 text-text-muted outline-none"
                                    value={outputText}
                                />
                                <button
                                    onClick={() => { navigator.clipboard.writeText(outputText) }}
                                    className="mt-4 w-full py-2 bg-surface hover:bg-white/5 border border-border rounded-lg font-medium transition-all"
                                >
                                    Copy to Clipboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'json-yaml' && (
                    <div className="space-y-8">
                        <Converter
                            title="JSON to YAML"
                            description="Convert JSON files to YAML format."
                            endpoint="/convert/utils/json-to-yaml"
                            acceptedFileTypes=".json"
                        />
                        <Converter
                            title="YAML to JSON"
                            description="Convert YAML files to JSON format."
                            endpoint="/convert/utils/yaml-to-json"
                            acceptedFileTypes=".yaml,.yml"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Utils;
