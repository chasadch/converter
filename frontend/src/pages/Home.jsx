import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ScrollRevealSection from '../components/animations/ScrollRevealSection';
import CountUp from '../components/animations/CountUp';
import MorphButton from '../components/animations/MorphButton';
import {
    FileText, Image, Video, Archive, Settings, Wand2, FileCheck,
    ScanText, QrCode, Merge, Hash, Palette, Code, Edit,
    ArrowRight, Shield, Lock, Headphones, Smartphone,
    Minimize2, ArrowRightLeft, Combine, PenLine, Pencil,
    Zap, Users, Star
} from 'lucide-react';

// Lazy load Three.js component for performance
const ParticleBackground = lazy(() => import('../components/animations/ParticleBackground'));

const Home = () => {
    const popularTools = [
        {
            icon: FileText,
            title: 'PDF to Word',
            desc: 'Convert PDFs to editable Word documents',
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            path: '/documents'
        },
        {
            icon: Merge,
            title: 'Merge PDF',
            desc: 'Combine multiple PDFs into one unified document',
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            path: '/pdf-advanced'
        },
        {
            icon: Image,
            title: 'JPG to PDF',
            desc: 'Transform JPG, PNG, BMP, GIF, and TIFF images to PDF',
            color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
            path: '/images'
        },
        {
            icon: PenLine,
            title: 'Sign PDF',
            desc: 'Create an electronic signature and sign your documents',
            color: 'bg-gradient-to-br from-green-500 to-emerald-600',
            path: '/pdf-editor'
        },
        {
            icon: Edit,
            title: 'Edit PDF',
            desc: 'Add text, shapes, images and freehand annotations to your PDF',
            color: 'bg-gradient-to-br from-pink-500 to-rose-600',
            path: '/pdf-editor'
        },
        {
            icon: Minimize2,
            title: 'Compress PDF',
            desc: 'Reduce the size of your PDF without losing quality',
            color: 'bg-gradient-to-br from-red-500 to-pink-600',
            path: '/pdf-tools'
        },
    ];

    const stats = [
        { icon: Users, value: 15420, label: 'Active Users', suffix: '+' },
        { icon: Zap, value: 50000, label: 'Files Converted', suffix: '+' },
        { icon: Star, value: 4.8, label: 'User Rating', decimals: 1 },
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
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    const cardHoverVariants = {
        rest: { scale: 1, rotateY: 0 },
        hover: {
            scale: 1.05,
            rotateY: 5,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <SEO
                title="Free PDF Converter - Convert, Merge, Compress PDF Online"
                description="Free online PDF converter with 30+ tools. Convert PDF to Word, Excel, JPG. Merge, compress, edit PDFs. Fast, secure, no signup required. Try now!"
                keywords="pdf converter, pdf to word, merge pdf, compress pdf, convert pdf to jpg, online pdf tools, free pdf converter, pdf editor, pdf to excel, image converter"
                url="https://asad1254-whats.hf.space/"
                structuredData={structuredData}
            />

            {/* Three.js Particle Background */}
            <Suspense fallback={null}>
                <ParticleBackground />
            </Suspense>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 bg-gradient-to-b from-gray-50 via-white to-white">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center space-y-8"
                    >
                        {/* Main Heading with gradient */}
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-6xl md:text-7xl font-bold leading-tight"
                        >
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                We make PDF
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient">
                                easy.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            All the tools you'll need to be more productive and work smarter with documents.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <Link to="/documents">
                                <MorphButton className="h-16 px-10 text-lg bg-gradient-to-r from-primary to-red-500 hover:from-red-500 hover:to-primary text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all">
                                    <span className="flex items-center gap-2">
                                        Start Free Trial
                                        <ArrowRight size={20} />
                                    </span>
                                </MorphButton>
                            </Link>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/pdf-tools" className="h-16 px-10 text-lg border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold rounded-xl transition-all inline-flex items-center justify-center">
                                    Explore All Tools
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap justify-center gap-12 pt-12"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <stat.icon className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">
                                            <CountUp end={stat.value} suffix={stat.suffix || ''} />
                                        </div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Tools Grid */}
            <ScrollRevealSection direction="up">
                <section className="py-20 bg-white px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Most Popular PDF Tools
                            </h2>
                            <p className="text-xl text-gray-600">
                                30 tools to convert, compress, and edit PDFs for free. Try it out today!
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {popularTools.map((tool, index) => {
                                const Icon = tool.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        className="perspective-1000"
                                    >
                                        <Link to={tool.path}>
                                            <motion.div
                                                variants={cardHoverVariants}
                                                className="h-full bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                                            >
                                                <motion.div
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                    className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}
                                                >
                                                    <Icon className="text-white" size={32} />
                                                </motion.div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                                    {tool.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {tool.desc}
                                                </p>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-16 text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-10 py-4 font-semibold text-primary bg-blue-50 hover:bg-blue-100 rounded-xl transition-all shadow-md hover:shadow-lg"
                            >
                                See All PDF Tools
                                <ArrowRightLeft size={20} />
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </ScrollRevealSection>

            {/* Features - with Unsplash Images */}
            <ScrollRevealSection direction="left">
                <section className="py-20 bg-gray-50 px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Keep Your Simple Tasks Simple
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                FileConverter is the first and only PDF software you'll love. We have all the tools you'll need to start, manage, and finish your work with digital documents.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            className="relative group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                                alt="Dashboard Analytics"
                                className="w-full h-96 object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                        </motion.div>
                    </div>
                </section>
            </ScrollRevealSection>

            {/* Security Section - Dark with animations */}
            <ScrollRevealSection direction="up">
                <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold text-center mb-20"
                        >
                            Why Choose FileConverter?
                        </motion.h2>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-3 gap-10"
                        >
                            {[
                                {
                                    icon: Shield,
                                    title: 'Security Standards',
                                    desc: 'ISO/IEC 27001 certified and GDPR, CCPA compliant.',
                                    color: 'from-blue-500 to-cyan-500'
                                },
                                {
                                    icon: Lock,
                                    title: '256-Bit Encryption',
                                    desc: 'Military-grade TLS encryption for secure transfers.',
                                    color: 'from-green-500 to-emerald-500'
                                },
                                {
                                    icon: Headphones,
                                    title: '24/7 Support',
                                    desc: 'Round-the-clock customer support whenever you need.',
                                    color: 'from-purple-500 to-pink-500'
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="text-center p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className={`mx-auto w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6 shadow-2xl`}
                                    >
                                        <feature.icon size={40} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </ScrollRevealSection>

            {/* Footer */}
            <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-400"
                    >
                        © 2024 FileConverter. All rights reserved.
                    </motion.p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
