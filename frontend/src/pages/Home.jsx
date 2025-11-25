import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, Archive, Settings, ArrowRight, Wand2, Shield, Zap, Clock } from 'lucide-react';

const Home = () => {
    const tools = [
        { 
            title: 'Documents', 
            icon: FileText, 
            path: '/documents', 
            desc: 'PDF, Word, Excel, Markdown',
            color: 'from-blue-500 to-cyan-500'
        },
        { 
            title: 'Images', 
            icon: Image, 
            path: '/images', 
            desc: 'JPG, PNG, WebP, GIF',
            color: 'from-purple-500 to-pink-500'
        },
        { 
            title: 'Background Remover', 
            icon: Wand2, 
            path: '/bg-remover', 
            desc: 'AI-powered removal',
            color: 'from-amber-500 to-orange-500'
        },
        { 
            title: 'Media', 
            icon: Video, 
            path: '/media', 
            desc: 'Audio & Video tools',
            color: 'from-red-500 to-rose-500'
        },
        { 
            title: 'Archives', 
            icon: Archive, 
            path: '/archives', 
            desc: 'ZIP creation & extraction',
            color: 'from-green-500 to-emerald-500'
        },
        { 
            title: 'Utilities', 
            icon: Settings, 
            path: '/utils', 
            desc: 'Base64, JSON, YAML',
            color: 'from-slate-500 to-gray-500'
        },
    ];

    const features = [
        { icon: Shield, title: 'Secure', desc: 'Files processed locally' },
        { icon: Zap, title: 'Fast', desc: 'Instant conversion' },
        { icon: Clock, title: 'Free', desc: 'No limits or subscriptions' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative px-6 py-16 md:py-24 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary-light rounded-full text-primary font-semibold text-sm">
                        All-in-One File Converter
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text">
                        Convert Files{' '}
                        <span className="gradient-text">Instantly</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
                        Professional file conversion tools for documents, images, videos, and more. 
                        Fast, secure, and completely free.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        <Link 
                            to="/documents" 
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Start Converting
                            <ArrowRight size={20} />
                        </Link>
                        <Link 
                            to="/pdf-tools" 
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            PDF Tools
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx} 
                                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border animate-fade-in"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                                    <feature.icon className="text-primary" size={20} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-text">{feature.title}</h3>
                                    <p className="text-sm text-text-muted">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="px-6 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                            Choose Your Tool
                        </h2>
                        <p className="text-text-muted">
                            Select a tool below to get started with your conversion
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool, idx) => {
                            const Icon = tool.icon;
                            return (
                                <Link
                                    key={tool.path}
                                    to={tool.path}
                                    className="group card p-6 hover:scale-105 transition-all duration-300 animate-slide-up"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon className="text-white" size={28} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">
                                        {tool.title}
                                    </h3>
                                    
                                    <p className="text-text-muted mb-4 text-sm">
                                        {tool.desc}
                                    </p>
                                    
                                    <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                        Open Tool 
                                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 pb-16 md:pb-24">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Convert?
                        </h2>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust our platform for their file conversion needs. 
                            No registration required, start converting now.
                        </p>
                        <Link 
                            to="/documents" 
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:scale-105 transition-transform shadow-xl"
                        >
                            Get Started Free
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
