import React from 'react';
import Converter from '../components/Converter';

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Media = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Audio & Video Converter</h1>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-1">Looking for Video Downloader?</h3>
                    <p className="text-text-muted text-sm">We've moved the Video Downloader and Compressor to a dedicated page.</p>
                </div>
                <Link to="/video-tools" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors">
                    Go to Video Tools <ArrowRight size={16} />
                </Link>
            </div>

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
