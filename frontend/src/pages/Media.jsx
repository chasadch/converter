import React from 'react';
import Converter from '../components/Converter';

const Media = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Audio & Video Converter</h1>

            <Converter
                title="Format Converter"
                description="Convert video and audio files to different formats."
                endpoint="/convert/media"
                acceptedFileTypes="video/*,audio/*"
                optionLabel="Convert to:"
                conversionOptions={[
                    { value: 'mp4', label: 'MP4 (Video)' },
                    { value: 'avi', label: 'AVI (Video)' },
                    { value: 'mov', label: 'MOV (Video)' },
                    { value: 'mkv', label: 'MKV (Video)' },
                    { value: 'mp3', label: 'MP3 (Audio)' },
                    { value: 'wav', label: 'WAV (Audio)' },
                    { value: 'flac', label: 'FLAC (Audio)' },
                    { value: 'ogg', label: 'OGG (Audio)' },
                    { value: 'aac', label: 'AAC (Audio)' },
                ]}
            />
        </div>
    );
};

export default Media;
