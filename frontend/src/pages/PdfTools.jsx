import React from 'react';
import Converter from '../components/Converter';

const PdfTools = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">PDF Tools</h1>

            <div className="space-y-12">
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
