import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Video, Archive, Settings, ArrowRight, Wand2, Youtube } from 'lucide-react';

const Home = () => {
    const cards = [
        { title: 'Documents', icon: FileText, path: '/documents', desc: 'PDF, Word, Excel, Markdown' },
        { title: 'Images', icon: Image, path: '/images', desc: 'JPG, PNG, WebP, GIF' },
        { title: 'Bg Remover', icon: Wand2, path: '/bg-remover', desc: 'AI Background Removal' },
        { title: 'Video Tools', icon: Youtube, path: '/video-tools', desc: 'Download & Compress' },
        { title: 'Converter', icon: Video, path: '/media', desc: 'MP4, MP3, WAV, AVI' },
        { title: 'Archives', icon: Archive, path: '/archives', desc: 'Zip Extraction & Creation' },
        { title: 'Utilities', icon: Settings, path: '/utils', desc: 'Base64, JSON, YAML' },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="text-center mb-16 pt-8">
                <h1 className="text-5xl font-bold mb-6 gradient-text">All-in-One Converter</h1>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                    The ultimate suite for all your file conversion needs. Fast, secure, and running locally on your machine.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.path}
                            to={card.path}
                            className="glass-panel p-8 rounded-2xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="text-primary" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                            <p className="text-text-muted mb-6">{card.desc}</p>
                            <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                                Open Tool <ArrowRight size={18} className="ml-2" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
