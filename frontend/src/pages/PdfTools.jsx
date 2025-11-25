import React from 'react';
import Converter from '../components/Converter';

const PdfTools = () => {
    return (
        <div className="p-6 md:p-12">
            <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">PDF Tools</h1>
                <p className="text-text-muted text-lg">Merge, protect, unlock, and compress PDF files</p>
            </div>

            <div className="space-y-16 max-w-4xl mx-auto">
                <Converter
                    title="Merge PDFs"
                    description="Combine multiple PDF files into a single document. Order is preserved."
                    endpoint="/convert/pdf/merge"
                    acceptedFileTypes=".pdf"
                    optionLabel="Action"
                    defaultOption="Merge"
                    conversionOptions={[{ value: 'Merge', label: 'Merge Files' }]}
                    multiple={true}
                    outputExtension="pdf"
                />

                <div className="border-t border-border pt-12">
                    <Converter
                        title="Protect PDF"
                        description="Add a password to your PDF file."
                        endpoint="/convert/pdf/protect"
                        acceptedFileTypes=".pdf"
                        optionLabel="Action"
                        defaultOption="Protect"
                        conversionOptions={[{ value: 'Protect', label: 'Encrypt PDF' }]}
                        outputExtension="pdf"
                    />
                </div>

                <div className="border-t border-border pt-12">
                    <Converter
                        title="Unlock PDF"
                        description="Remove password security from a PDF file."
                        endpoint="/convert/pdf/unlock"
                        acceptedFileTypes=".pdf"
                        optionLabel="Action"
                        defaultOption="Unlock"
                        conversionOptions={[{ value: 'Unlock', label: 'Decrypt PDF' }]}
                        outputExtension="pdf"
                    />
                </div>

                <div className="border-t border-border pt-12">
                    <Converter
                        title="Compress PDF"
                        description="Reduce the file size of your PDF documents."
                        endpoint="/convert/pdf/compress"
                        acceptedFileTypes=".pdf"
                        optionLabel="Action"
                        defaultOption="Compress"
                        conversionOptions={[{ value: 'Compress', label: 'Compress PDF' }]}
                        outputExtension="pdf"
                    />
                </div>
            </div>
        </div>
    );
};

export default PdfTools;
