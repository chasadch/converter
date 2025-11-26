import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, Archive, Settings, Wand2, FileCheck, ScanText, QrCode, Merge, Hash, Palette, Code, Edit, ArrowRight } from 'lucide-react';

const Home = () => {
    const tools = [
        {
            title: 'PDF to Word',
            icon: FileText,
            path: '/documents',
            desc: 'Convert PDF to editable Word',
            category: 'PDF'
        },
        {
            title: 'Merge PDF',
            icon: Merge,
            path: '/pdf-advanced',
            desc: 'Combine multiple PDFs',
            category: 'PDF'
        },
        {
            title: 'Compress PDF',
            icon: FileCheck,
            path: '/pdf-tools',
            desc: 'Reduce PDF file size',
            category: 'PDF'
        },
        {
            title: 'PDF Editor',
            icon: Edit,
            path: '/pdf-editor',
            desc: 'Edit text & add images',
            category: 'PDF'
        },
        {
            title: 'Image Converter',
            icon: Image,
            path: '/images',
            desc: 'Convert JPG, PNG, WebP',
            category: 'Image'
        },
        {
            title: 'Background Remover',
            icon: Wand2,
            path: '/bg-remover',
            desc: 'Remove image backgrounds',
            category: 'Image'
        },
        {
            title: 'OCR',
            icon: ScanText,
            path: '/ocr',
            desc: 'Extract text from images',
            category: 'Image'
        },
        {
            title: 'Image Toolkit',
            icon: Palette,
            path: '/image-toolkit',
            desc: 'Filters, EXIF, colors',
            category: 'Image'
        },
        {
            title: 'QR & Barcode',
            icon: QrCode,
            path: '/qr-generator',
            desc: 'Generate codes',
            category: 'Tools'
        },
        {
            title: 'Hash Generator',
            icon: Hash,
            path: '/hash-generator',
            desc: 'MD5, SHA256 hashes',
            category: 'Tools'
        },
        {
            title: 'Developer Tools',
            icon: Code,
            path: '/dev-tools',
            desc: 'JSON, UUID, URL tools',
            category: 'Tools'
        },
        {
            title: 'Video Converter',
            icon: Video,
            path: '/media',
            desc: 'Convert video files',
            category: 'Media'
        },
        {
            title: 'Archive Creator',
            icon: Archive,
            path: '/archives',
            desc: 'Create ZIP, TAR files',
            category: 'Tools'
        },
        {
            title: 'Utilities',
            icon: Settings,
            path: '/utils',
            desc: 'Base64, JSON, YAML',
            category: 'Tools'
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Smallpdf Style */}
            <section className="py-20 px-6 text-center bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        All your file conversion needs in one place
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Convert, compress, and edit your files with professional tools. Fast, secure, and completely free.
                    </p>
                    <Link
                        to="/documents"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Tools Grid - Smallpdf Style */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        All Tools
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <Link
                                    key={index}
                                    to={tool.path}
                                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="text-primary" size={28} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {tool.desc}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileCheck className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
                            <p className="text-gray-600">All processing happens securely on our servers</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wand2 className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                            <p className="text-gray-600">Simple drag-and-drop interface for all tools</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Archive className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">All Formats</h3>
                            <p className="text-gray-600">Support for PDF, images, videos, and more</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto text-center text-gray-600">
                    <p>© 2024 FileConverter. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
