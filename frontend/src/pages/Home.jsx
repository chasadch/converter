import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, Archive, Settings, Wand2, FileCheck, CheckCircle, ScanText, QrCode, Merge, Hash } from 'lucide-react';

const Home = () => {
    const tools = [
        {
            title: 'PDF to Word',
            icon: FileText,
            path: '/documents',
            desc: 'Convert PDF to editable Word documents',
        },
        {
            title: 'Merge PDF',
            icon: FileCheck,
            path: '/pdf-tools',
            desc: 'Combine multiple PDFs into one',
        },
        {
            title: 'Compress PDF',
            icon: FileText,
            path: '/pdf-tools',
            desc: 'Reduce the size of your PDF',
        },
        {
            title: 'Image Converter',
            icon: Image,
            path: '/images',
            desc: 'Convert JPG, PNG, WebP, and more',
        },
        {
            title: 'Background Remover',
            icon: Wand2,
            path: '/bg-remover',
            desc: 'Remove background from images',
        },
        {
            title: 'OCR - Text Extract',
            icon: ScanText,
            path: '/ocr',
            desc: 'Extract text from images (OCR)',
        },
        {
            title: 'Video Converter',
            icon: Video,
            path: '/media',
            desc: 'Convert and compress video files',
        },
        {
            title: 'PDF Advanced',
            icon: Merge,
            path: '/pdf-advanced',
            desc: 'Merge, split, and rotate PDFs',
        },
        {
            title: 'QR & Barcode',
            icon: QrCode,
            path: '/qr-generator',
            desc: 'Generate QR codes and barcodes',
        },
        {
            title: 'Hash Generator',
            icon: Hash,
            path: '/hash-generator',
            desc: 'Generate file hashes (MD5, SHA256)',
        },
        {
            title: 'Archive Creator',
            icon: Archive,
            path: '/archives',
            desc: 'Create and extract ZIP files',
        },
        {
            title: 'Utilities',
            icon: Settings,
            path: '/utils',
            desc: 'Base64, JSON, and YAML tools',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-16 pb-12 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text leading-tight">
                        We make file conversion{' '}
                        <span className="text-primary">easy.</span>
                    </h1>

                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
                        All the tools you need to convert, compress, and edit your files in one place.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                                <Link
                                    key={tool.path + tool.title}
                                    to={tool.path}
                                    className="group bg-surface border border-border rounded-lg p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="text-primary" size={32} />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2 text-text">
                                        {tool.title}
                                    </h3>

                                    <p className="text-sm text-text-muted leading-relaxed">
                                        {tool.desc}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-16 bg-surface border-y border-border">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="w-12 h-12 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="text-success" size={24} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">Secure & Private</h3>
                            <p className="text-sm text-text-muted">Your files are processed securely</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="text-primary" size={24} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">Lightning Fast</h3>
                            <p className="text-sm text-text-muted">Convert files in seconds</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 mx-auto mb-4 bg-info/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="text-info" size={24} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">Completely Free</h3>
                            <p className="text-sm text-text-muted">No limits, no subscriptions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text">
                        Ready to get started?
                    </h2>
                    <p className="text-lg text-text-muted mb-8">
                        Choose a tool above and start converting your files now.
                    </p>
                    <Link
                        to="/documents"
                        className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                        Get Started Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
