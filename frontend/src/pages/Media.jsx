import React from 'react';
import Converter from '../components/Converter';
import UrlConverter from '../components/UrlConverter';

const Media = () => {
    return (
        <div className="p-6 md:p-12">
            <div className="max-w-5xl mx-auto mb-10 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Audio & Video Hub</h1>
                <p className="text-text-muted text-lg">Download, convert, and compress media files</p>
            </div>

            <div className="space-y-16 max-w-4xl mx-auto">
                {/* Section 1: Video Downloader */}
                <section>
                    <UrlConverter
                        title="Download Video"
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
                        title="Compress Video"
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
                        title="Convert Format"
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
