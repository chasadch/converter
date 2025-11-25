import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Image, Video, Archive, Settings, Wand2, FileCheck, ChevronDown, ScanText, QrCode, Merge, Hash, Palette, Code } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
    const location = useLocation();

    const tools = [
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/pdf-tools', label: 'PDF Tools', icon: FileCheck },
        { path: '/pdf-advanced', label: 'PDF Advanced', icon: Merge },
        { path: '/images', label: 'Images', icon: Image },
        { path: '/bg-remover', label: 'Background Remover', icon: Wand2 },
        { path: '/ocr', label: 'OCR (Text Extract)', icon: ScanText },
        { path: '/qr-generator', label: 'QR & Barcode', icon: QrCode },
        { path: '/hash-generator', label: 'Hash Generator', icon: Hash },
        { path: '/image-toolkit', label: 'Image Toolkit', icon: Palette },
        { path: '/dev-tools', label: 'Developer Tools', icon: Code },
        { path: '/media', label: 'Audio & Video', icon: Video },
        { path: '/archives', label: 'Archives', icon: Archive },
        { path: '/utils', label: 'Utilities', icon: Settings },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <FileText size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:inline">FileConverter</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-text-muted hover:text-text'
                                }`}
                        >
                            Home
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                                className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text transition-colors"
                            >
                                Tools
                                <ChevronDown size={16} className={`transform transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isToolsDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsToolsDropdownOpen(false)}
                                    />
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-surface rounded-xl border border-border shadow-xl py-2 z-20 animate-scale-in">
                                        {tools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.path}
                                                    to={tool.path}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-surface-hover transition-colors"
                                                    onClick={() => setIsToolsDropdownOpen(false)}
                                                >
                                                    <Icon size={18} className="text-text-muted" />
                                                    {tool.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-surface animate-slide-up">
                    <div className="px-4 py-4 space-y-1">
                        <Link
                            to="/"
                            className="block px-4 py-2.5 rounded-lg text-sm font-medium text-text hover:bg-surface-hover transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <div className="pt-2 pb-1 text-xs font-semibold text-text-muted uppercase tracking-wider px-4">
                            Tools
                        </div>

                        {tools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                                <Link
                                    key={tool.path}
                                    to={tool.path}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-text hover:bg-surface-hover transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon size={18} className="text-text-muted" />
                                    {tool.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
