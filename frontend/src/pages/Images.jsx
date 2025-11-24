import React from 'react';
import Converter from '../components/Converter';

const Images = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Image Tools</h1>

            <Converter
                title="Image Converter"
                description="Convert images between formats (JPG, PNG, WEBP, GIF, etc)."
                endpoint="/convert/image"
                acceptedFileTypes="image/*"
                optionLabel="Convert to:"
                conversionOptions={[
                    { value: 'PNG', label: 'PNG' },
                    { value: 'JPEG', label: 'JPG' },
                    { value: 'WEBP', label: 'WebP' },
                    { value: 'GIF', label: 'GIF' },
                    { value: 'BMP', label: 'BMP' },
                    { value: 'TIFF', label: 'TIFF' },
                    { value: 'PDF', label: 'PDF' },
                ]}
            />

            <div className="mt-12 border-t border-border pt-12">
                <Converter
                    title={
                        <span className="flex items-center gap-3">
                            Background Remover
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/20">NEW</span>
                        </span>
                    }
                    description="Automatically remove the background from any image using AI."
                    endpoint="/convert/image/remove-bg"
                    acceptedFileTypes="image/*"
                    defaultOption="PNG"
                />
            </div>
        </div>
    );
};

export default Images;
