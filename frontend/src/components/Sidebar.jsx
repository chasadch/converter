import { FileText, Image, Video, Archive, Settings, Home, X, Wand2, FileCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/pdf-tools', label: 'PDF Tools', icon: FileCheck },
        { path: '/images', label: 'Images', icon: Image },
        { path: '/bg-remover', label: 'Bg Remover', icon: Wand2 },
        { path: '/media', label: 'Audio & Video', icon: Video },
        { path: '/archives', label: 'Archives', icon: Archive },
        { path: '/utils', label: 'Utilities', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                w-64 bg-white border-r border-border h-screen fixed left-0 top-0 flex flex-col p-6 z-40 shadow-xl
                transition-transform duration-300 ease-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                            <FileText size={20} className="text-white" />
                        </div>
                        <h1 className="text-xl font-bold gradient-text">Converter</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors"
                    >
                        <X size={20} className="text-text" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;

                        return (
                            <Link
                                key={link.path + link.label}
                                to={link.path}
                                onClick={() => onClose()}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-text-muted hover:bg-surface hover:text-text'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="space-y-3">
                    <ThemeToggle />
                    <div className="pt-2 text-xs text-text-muted text-center border-t border-border">
                        <p className="font-semibold text-text mb-1">All-in-One Converter</p>
                        <p>v2.0 • Made with ❤️</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
