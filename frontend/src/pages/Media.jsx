import React from 'react';
import Converter from '../components/Converter';
import UrlConverter from '../components/UrlConverter';

const Media = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 gradient-text">Audio & Video Tools</h1>

            <div className="space-y-12">
                {/* Section 1: Video Downloader */}
                <section>
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
                </section>

                {/* Section 2: Video Compressor */}
                <section className="border-t border-border pt-12">
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
                </section>

                {/* Section 3: Format Converter */}
                <section className="border-t border-border pt-12">
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
                </section>
            </div>
        </div>
    );
};

export default Media;
