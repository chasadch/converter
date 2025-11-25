import React from 'react';
import Converter from '../components/Converter';
import UrlConverter from '../components/UrlConverter';

const VideoTools = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Video Tools</h1>

            <div className="space-y-12">
                <UrlConverter
                    title="Video Downloader"
                    description="Download videos from YouTube, TikTok, Twitter, and more."
                    endpoint="/convert/media/download"
                    buttonLabel="Download Video"
                    formats={[
                        { value: 'mp4', label: 'MP4 (Video)' },
                        { value: 'mp3', label: 'MP3 (Audio Only)' }
                    ]}
                />

                <div className="border-t border-border pt-12">
                    <Converter
                        title="Video Compressor"
                        description="Reduce video file size while maintaining quality."
                        endpoint="/convert/media/compress"
                        acceptedFileTypes="video/*"
                        optionLabel="Compression Level"
                        defaultOption="28"
                        conversionOptions={[
                            { value: '23', label: 'High Quality (Larger)' },
                            { value: '28', label: 'Balanced (Recommended)' },
                            { value: '35', label: 'High Compression (Smaller)' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoTools;
