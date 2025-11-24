import React from 'react';
import Converter from '../components/Converter';

const BackgroundRemover = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Background Remover</h1>

            <Converter
                title="AI Background Remover"
                description="Automatically remove the background from any image using advanced AI. Upload your image and get a transparent PNG in seconds."
                endpoint="/convert/image/remove-bg"
                acceptedFileTypes="image/*"
                defaultOption="PNG"
            />
        </div>
    );
};

export default BackgroundRemover;
