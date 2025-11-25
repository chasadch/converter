import React from 'react';
import Converter from '../components/Converter';

const Images = () => {
    return (
        <div className="p-6 md:p-12">
            <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Image Tools</h1>
                <p className="text-text-muted text-lg">Convert images between different formats</p>
            </div>

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


        </div>
    );
};

export default Images;
