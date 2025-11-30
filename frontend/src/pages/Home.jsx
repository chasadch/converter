import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import {
    FileText, Image, Zap, Sparkles, Heart, Star, Rocket,
    Wand2, Merge, Edit, Minimize2, Lock, TrendingUp
} from 'lucide-react';

const ParticleBackground = lazy(() => import('../components/animations/ParticleBackground'));

const Home = () => {
    const tools = [
        {
            icon: FileText,
            title: 'PDF Magic',
            emoji: '📄',
            desc: 'convert pdfs like a pro',
            gradient: 'from-purple-500 via-pink-500 to-red-500',
            path: '/documents'
        },
        {
            icon: Merge,
            title: 'Merge Files',
            emoji: '🔗',
            desc: 'combine pdfs instantly',
            gradient: 'from-cyan-500 via-blue-500 to-purple-500',
            path: '/pdf-advanced'
        },
        {
            icon: Image,
            title: 'Image Converter',
            emoji: '🖼️',
            desc: 'transform any image',
            gradient: 'from-yellow-400 via-orange-500 to-red-500',
            path: '/images'
        },
        {
            icon: Edit,
            title: 'Edit PDFs',
            emoji: '✏️',
            desc: 'edit like never before',
            gradient: 'from-green-400 via-emerald-500 to-teal-500',
            path: '/pdf-editor'
        },
        {
            icon: Minimize2,
            title: 'Compress',
            emoji: '🗜️',
            desc: 'make files tiny af',
            gradient: 'from-pink-500 via-rose-500 to-red-500',
            path: '/pdf-tools'
        },
        {
            icon: Wand2,
            title: 'AI Tools',
            emoji: '🪄',
            desc: 'smart conversions',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            path: '/bg-remover'
        },
    ];

    const stats = [
        { value: '15K+', label: 'happy users', emoji: '🎉' },
        { value: '50K+', label: 'files converted', emoji: '⚡' },
        { value: '4.8', label: 'user rating', emoji: '⭐' },
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "FileConverter - All-in-One PDF Tools",
        "url": "https://asad1254-whats.hf.space",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "15420"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-900 text-white overflow-hidden relative">
            <SEO
                title="FileConverter - ur file conversion bestie 💜"
                description="Convert, merge, edit PDFs & images. Fast, free, no cap. 15K+ users vibing with us!"
                url="https://asad1254-whats.hf.space/"
                structuredData={structuredData}
            />

            {/* Animated Background */}
            <Suspense fallback={null}>
                <ParticleBackground />
            </Suspense>

            {/* Grid Pattern Overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] pointer-events-none"></div>

            {/* Floating Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-48 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-20 pb-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-6 mb-12"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm">your file conversion bestie</span>
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>

                            {/* Main Heading */}
                            <h1 className="text-6xl md:text-8xl font-black leading-tight">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                                    convert
                                </span>
                                <br />
                                <span className="text-white">
                                    anything
                                </span>
                                <span className="inline-block ml-4">✨</span>
                            </h1>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
                                pdfs, images, videos - we got u covered.
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                    fast. free. no cap.
                                </span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <Link to="/documents">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            start converting 🚀
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-white/20 font-bold text-lg hover:bg-white/20 transition-all"
                                >
                                    explore tools →
                                </motion.button>
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-8 pt-12"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.1, rotate: 3 }}
                                        className="text-center"
                                    >
                                        <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center gap-1">
                                            <span>{stat.label}</span>
                                            <span>{stat.emoji}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Bento Grid Tools */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black mb-12 flex items-center gap-3"
                        >
                            <span>popular tools</span>
                            <span className="text-3xl">🔥</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tools.map((tool, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative"
                                >
                                    <Link to={tool.path}>
                                        {/* Glass Card */}
                                        <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                                            {/* Gradient Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                                            {/* Content */}
                                            <div className="relative z-10 space-y-4">
                                                {/* Icon with Emoji */}
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                                        <tool.icon className="w-7 h-7 text-white" />
                                                    </div>
                                                    <span className="text-4xl group-hover:scale-125 transition-transform">{tool.emoji}</span>
                                                </div>

                                                {/* Text */}
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                                                        {tool.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm lowercase">
                                                        {tool.desc}
                                                    </p>
                                                </div>

                                                {/* Arrow */}
                                                <div className="flex items-center gap-2 text-sm text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span>let's go</span>
                                                    <span>→</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us - Glassmorphism Cards */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black mb-12 text-center"
                        >
                            <span>why we're</span>
                            <span className="ml-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                different
                            </span>
                            <span className="ml-2">💎</span>
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: 'lightning fast',
                                    desc: 'convert files in seconds, not minutes',
                                    gradient: 'from-yellow-400 to-orange-500'
                                },
                                {
                                    icon: Lock,
                                    title: 'secure af',
                                    desc: 'your files, your privacy. always.',
                                    gradient: 'from-green-400 to-emerald-500'
                                },
                                {
                                    icon: Heart,
                                    title: 'actually free',
                                    desc: 'no hidden fees, no bs. promise.',
                                    gradient: 'from-pink-400 to-rose-500'
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all text-center"
                                >
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl rotate-6 hover:rotate-12 transition-transform`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 lowercase">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-400">
                            made with <span className="text-pink-500">💜</span> for the internet
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            © 2024 FileConverter. all vibes reserved.
                        </p>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Home;
