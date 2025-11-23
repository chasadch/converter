import React, { useState } from 'react';
import Converter from '../components/Converter';

const Archives = () => {
    const [activeTab, setActiveTab] = useState('extract');

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Archive Tools</h1>

            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => setActiveTab('extract')}
                    className={`px-6 py-2 rounded-full transition-all ${activeTab === 'extract'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-surface hover:bg-white/5 border border-border'
                        }`}
                >
                    Extract Archive
                </button>
                <button
                    onClick={() => setActiveTab('create')}
                    className={`px-6 py-2 rounded-full transition-all ${activeTab === 'create'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-surface hover:bg-white/5 border border-border'
                        }`}
                >
                    Create Archive
                </button>
            </div>

            <div className="animate-fade-in">
                {activeTab === 'extract' && (
                    <Converter
                        title="Extract Archive"
                        description="Extract files from ZIP archives."
                        endpoint="/convert/archive/extract"
                        acceptedFileTypes=".zip"
                    />
                )}
                {activeTab === 'create' && (
                    <div className="text-center p-12 glass-panel rounded-2xl">
                        <p className="text-text-muted">Multi-file upload for archive creation is coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Archives;
