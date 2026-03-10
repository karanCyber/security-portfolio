import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(
        (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark'
    );

    useEffect(() => {
        const root = document.body;
        if (theme === 'light') {
            root.classList.add('light-mode');
        } else {
            root.classList.remove('light-mode');
        }
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
            style={{
                position: 'fixed',
                top: '2rem',
                right: '2rem',
                zIndex: 9999,
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(128, 128, 128, 0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'var(--transition-smooth)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
            }}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
