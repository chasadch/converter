import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-surface hover:bg-surface-hover border border-border transition-all duration-300 hover:scale-110 group"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-text-muted group-hover:text-primary transition-colors" />
            ) : (
                <Sun size={20} className="text-text-muted group-hover:text-primary transition-colors" />
            )}
        </button>
    );
};

export default ThemeToggle;
