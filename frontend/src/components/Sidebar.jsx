import { FileText, Image, Video, Archive, Settings, Home, X, Wand2, FileCheck, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/pdf-tools', label: 'PDF Tools', icon: FileCheck },
        { path: '/images', label: 'Images', icon: Image },
        { path: '/bg-remover', label: 'Bg Remover', icon: Wand2 },
        { path: '/video-tools', label: 'Video Tools', icon: Youtube },
        { path: '/media', label: 'Converter', icon: Video },
        { path: '/archives', label: 'Archives', icon: Archive },
        { path: '/utils', label: 'Utilities', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                w-64 bg-surface/95 backdrop-blur-xl border-r border-border h-screen fixed left-0 top-0 flex flex-col p-4 z-40
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <div className="mb-8 px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold gradient-text">Converter</h1>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => onClose()} // Close on navigation (mobile)
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-text-muted hover:bg-white/5 hover:text-text'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 text-xs text-text-muted text-center border-t border-border mt-4">
                    v2.0.0 • Premium Edition
                </div>
            </div>
        </>
    );
};

export default Sidebar;
