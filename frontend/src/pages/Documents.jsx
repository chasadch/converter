import React, { useState } from 'react';
import Converter from '../components/Converter';

const Documents = () => {
    const [activeTab, setActiveTab] = useState('pdf-to-word');

    const tabs = [
        { id: 'pdf-to-word', label: 'PDF to Word' },
        { id: 'word-to-pdf', label: 'Word to PDF' },
        { id: 'csv-to-excel', label: 'CSV to Excel' },
        { id: 'md-to-html', label: 'Markdown to HTML' },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Document Tools</h1>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'bg-surface hover:bg-white/5 border border-border'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                {activeTab === 'pdf-to-word' && (
                    <Converter
                        title="PDF to Word"
                        description="Convert your PDF documents to editable Word files."
                        endpoint="/convert/pdf-to-word"
                        acceptedFileTypes=".pdf"
                    />
                )}
                {activeTab === 'word-to-pdf' && (
                    <Converter
                        title="Word to PDF"
                        description="Convert Word documents to professional PDF files."
                        endpoint="/convert/word-to-pdf"
                        acceptedFileTypes=".docx,.doc"
                    />
                )}
                {activeTab === 'csv-to-excel' && (
                    <Converter
                        title="CSV to Excel"
                        description="Convert CSV data files to Excel spreadsheets."
                        endpoint="/convert/csv-to-excel"
                        acceptedFileTypes=".csv"
                    />
                )}
                {activeTab === 'md-to-html' && (
                    <Converter
                        title="Markdown to HTML"
                        description="Convert Markdown text to HTML code."
                        endpoint="/convert/markdown-to-html"
                        acceptedFileTypes=".md"
                    />
                )}
            </div>
        </div>
    );
};

export default Documents;
