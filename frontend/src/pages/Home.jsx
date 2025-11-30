import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
    FileText, Image, Video, Archive, Settings, Wand2, FileCheck,
    ScanText, QrCode, Merge, Hash, Palette, Code, Edit,
    ArrowRight, Shield, Lock, Headphones, Smartphone,
    Minimize2, ArrowRightLeft, Combine, PenLine, Pencil
} from 'lucide-react';

const Home = () => {
    const popularTools = [
        {
            icon: FileText,
            title: 'PDF to Word',
            desc: 'Convert PDFs to editable Word documents',
            color: 'bg-blue-500',
            path: '/documents'
        },
        {
            icon: Merge,
            title: 'Merge PDF',
            desc: 'Combine multiple PDFs into one unified document',
            color: 'bg-purple-500',
            path: '/pdf-advanced'
        },
        {
            icon: Image,
            title: 'JPG to PDF',
            desc: 'Transform JPG, PNG, BMP, GIF, and TIFF images to PDF',
            color: 'bg-yellow-500',
            path: '/images'
        },
        {
            icon: PenLine,
            title: 'Sign PDF',
            desc: 'Create an electronic signature and sign your documents',
            color: 'bg-green-500',
            path: '/pdf-editor'
        },
        {
            icon: Edit,
            title: 'Edit PDF',
            desc: 'Add text, shapes, images and freehand annotations to your PDF',
            color: 'bg-pink-500',
            path: '/pdf-editor'
        },
        {
            icon: Minimize2,
            title: 'Compress PDF',
            desc: 'Reduce the size of your PDF without losing quality',
            color: 'bg-red-500',
            path: '/pdf-tools'
        },
    ];

    const allTools = [
        { icon: FileText, title: 'PDF to Word', path: '/documents' },
        { icon: Merge, title: 'Merge PDF', path: '/pdf-advanced' },
        { icon: FileCheck, title: 'Compress PDF', path: '/pdf-tools' },
        { icon: Edit, title: 'PDF Editor', path: '/pdf-editor' },
        { icon: Image, title: 'Image Converter', path: '/images' },
        { icon: Wand2, title: 'Background Remover', path: '/bg-remover' },
        { icon: ScanText, title: 'OCR', path: '/ocr' },
        { icon: Palette, title: 'Image Toolkit', path: '/image-toolkit' },
        { icon: QrCode, title: 'QR & Barcode', path: '/qr-generator' },
        { icon: Hash, title: 'Hash Generator', path: '/hash-generator' },
        { icon: Code, title: 'Developer Tools', path: '/dev-tools' },
        { icon: Video, title: 'Video Converter', path: '/media' },
        { icon: Archive, title: 'Archive Creator', path: '/archives' },
        { icon: Settings, title: 'Utilities', path: '/utils' },
    ];

    // Structured Data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "FileConverter - All-in-One PDF Tools",
        "url": "https://asad1254-whats.hf.space",
        "description": "Free online PDF converter with 30+ tools. Convert PDF to Word, Excel, JPG. Merge, compress, edit PDFs. Fast, secure, no signup required.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "15420",
            "bestRating": "5",
            "worstRating": "1"
        },
        "features": [
            "Convert PDF to Word",
            "Merge PDF files",
            "Compress PDF",
            "PDF to JPG conversion",
            "Edit PDF online",
            "OCR text extraction",
            "Image conversion",
            "QR code generator"
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Free PDF Converter - Convert, Merge, Compress PDF Online"
                description="Free online PDF converter with 30+ tools. Convert PDF to Word, Excel, JPG. Merge, compress, edit PDFs. Fast, secure, no signup required. Try now!"
                keywords="pdf converter, pdf to word, merge pdf, compress pdf, convert pdf to jpg, online pdf tools, free pdf converter, pdf editor, pdf to excel, image converter"
                url="https://asad1254-whats.hf.space/"
                structuredData={structuredData}
            />
            {/* Hero Section */}
            <section className="relative pt-20 pb-24 overflow-hidden bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                            We make PDF easy.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            All the tools you'll need to be more productive and work smarter with documents.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                to="/documents"
                                className="h-14 px-8 text-lg bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all shadow-lg inline-flex items-center justify-center"
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                to="/pdf-tools"
                                className="h-14 px-8 text-lg border-2 border-gray-300 hover:bg-white hover:text-primary text-gray-700 font-semibold rounded-lg transition-all inline-flex items-center justify-center"
                            >
                                Explore All PDF Tools
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-red-100/50 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </section>

            {/* Popular Tools Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900">Most Popular PDF Tools</h2>
                        <p className="text-gray-600 text-lg">
                            30 tools to convert, compress, and edit PDFs for free. Try it out today!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularTools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <Link
                                    key={index}
                                    to={tool.path}
                                    className="h-full p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-none shadow-sm bg-gray-50 hover:bg-white group rounded-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${tool.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-lg text-gray-900">{tool.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {tool.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center justify-center px-8 py-4 font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                            See All PDF Tools
                            <ArrowRightLeft className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature 1 - Simple Tasks */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Keep Your Simple Tasks Simple
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            FileConverter is the first and only PDF software you'll love. We have all the tools you'll need to start, manage, and finish your work with digital documents.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="w-full max-w-md h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <FileText size={120} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature 2 - Work Directly */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <Edit size={120} className="text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Work Directly on Your Files
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents. You can connect to 30 other tools to enhance your files further.
                        </p>
                        <Link
                            to="/pdf-editor"
                            className="inline-flex items-center h-12 px-8 text-lg bg-primary text-white hover:bg-primary-hover font-semibold rounded-lg transition-all shadow-md"
                        >
                            Edit a PDF now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature 3 - Digital Signatures */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Digital Signatures Made Easy
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Fill in forms, e-sign contracts, and close deals in a few simple steps. You can also request e-signatures and track your document every step of the way.
                        </p>
                        <Link
                            to="/pdf-editor"
                            className="inline-flex items-center h-12 px-8 text-lg bg-primary text-white hover:bg-primary-hover font-semibold rounded-lg transition-all shadow-md"
                        >
                            Try eSign
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="w-full max-w-md h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <PenLine size={120} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature 4 - Manage Documents */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md h-80 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                            <Archive size={120} className="text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Manage Documents—All in One Place
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            No more working across multiple apps! Save time by storing, managing, and sharing files across devices—straight from our web platform.
                        </p>
                        <Link
                            to="/documents"
                            className="inline-flex items-center h-12 px-8 text-lg bg-primary text-white hover:bg-primary-hover font-semibold rounded-lg transition-all shadow-md"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mobile App Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                            <Smartphone className="w-4 h-4" />
                            <span>Mobile App</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Get It on Mobile
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Create PDF scans, organize documents, and share files from all your connected devices with the FileConverter Mobile App—wherever you are.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="bg-gray-900 text-white hover:bg-gray-800 h-12 px-6 rounded-lg flex items-center gap-2 font-medium transition-all">
                                App Store
                            </button>
                            <button className="bg-gray-900 text-white hover:bg-gray-800 h-12 px-6 rounded-lg flex items-center gap-2 font-medium transition-all">
                                Google Play
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[400px] flex items-center justify-center">
                        <div className="w-[280px] h-[500px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl rotate-[-6deg] transform hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative border-4 border-gray-800">
                                <div className="absolute top-0 w-full h-6 bg-gray-100 flex justify-center items-center gap-2">
                                    <div className="w-16 h-4 bg-black rounded-b-xl"></div>
                                </div>
                                <div className="p-6 mt-8 space-y-4">
                                    <div className="w-12 h-12 bg-red-500 rounded-xl mb-8"></div>
                                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                    <div className="grid grid-cols-2 gap-2 mt-8">
                                        <div className="aspect-square bg-blue-50 rounded-lg"></div>
                                        <div className="aspect-square bg-purple-50 rounded-lg"></div>
                                        <div className="aspect-square bg-yellow-50 rounded-lg"></div>
                                        <div className="aspect-square bg-green-50 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Security Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Why Choose FileConverter?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4 text-center p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                            <div className="mx-auto w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">Security Standards</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Your safety is our priority. FileConverter is ISO/IEC 27001 certified and GDPR, CCPA, and nFADP compliant.
                            </p>
                        </div>

                        <div className="space-y-4 text-center p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                            <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">256-Bit TLS Encryption</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We use 256-bit TLS encryption for secure information transfer.
                            </p>
                        </div>

                        <div className="space-y-4 text-center p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300">
                            <div className="mx-auto w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6">
                                <Headphones className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">24/7 Customer Support</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Get all the help you need with our round-the-clock customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <p>© 2024 FileConverter. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
