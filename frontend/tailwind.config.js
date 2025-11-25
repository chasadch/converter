/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-hover': 'var(--primary-hover)',
                'primary-light': 'var(--primary-light)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                background: 'var(--background)',
                surface: 'var(--surface)',
                'surface-hover': 'var(--surface-hover)',
                text: 'var(--text)',
                'text-muted': 'var(--text-muted)',
                border: 'var(--border)',
                success: 'var(--success)',
                error: 'var(--error)',
                warning: 'var(--warning)',
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
            },
            borderRadius: {
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',
            },
        },
    },
    plugins: [],
}
