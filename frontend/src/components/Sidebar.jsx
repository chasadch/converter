import { FileText, Image, Video, Archive, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/images', label: 'Images', icon: Image },
        { path: '/media', label: 'Audio & Video', icon: Video },
        { path: '/archives', label: 'Archives', icon: Archive },
        { path: '/utils', label: 'Utilities', icon: Settings },
    ];

    return (
        <div className="w-64 bg-surface/50 backdrop-blur-lg border-r border-border h-screen fixed left-0 top-0 flex flex-col p-4 z-20">
            <div className="mb-8 px-4">
                <h1 className="text-2xl font-bold gradient-text">Converter</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
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

            <div className="p-4 text-xs text-text-muted text-center">
                v2.0.0 • Premium Edition
            </div>
        </div>
    );
};

export default Sidebar;
