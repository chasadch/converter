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
        <div className="p-6 md:p-12 max-w-5xl mx-auto">
            <div className="mb-10 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Document Tools</h1>
                <p className="text-text-muted text-lg">Convert and manage your documents with ease</p>
            </div>

            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-thin">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap font-semibold transition-all ${
                            activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white hover:bg-surface border border-border text-text'
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
