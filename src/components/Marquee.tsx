import React from 'react';

const marqueeItems = ['Zero Trust', 'Data Security', 'Cloud', 'AI', 'SASE', 'Zero Trust', 'DLP'];

const Marquee: React.FC = () => {
    const text = marqueeItems.join('  ·  ');

    return (
        <div style={{
            overflow: 'hidden',
            padding: '4rem 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
        }}>
            {/* Faint gradient edges */}
            <div style={{
                position: 'absolute', left: 0, top: 0, width: '200px', height: '100%',
                background: 'linear-gradient(to right, var(--bg-primary), transparent)',
                zIndex: 2, pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', right: 0, top: 0, width: '200px', height: '100%',
                background: 'linear-gradient(to left, var(--bg-primary), transparent)',
                zIndex: 2, pointerEvents: 'none',
            }} />

            <div className="marquee-track">
                {[1, 2].map((_, ti) => (
                    <span key={ti} style={{
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        fontFamily: 'Space Grotesk',
                        fontWeight: 700,
                        color: 'transparent',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.03em',
                        WebkitTextStroke: '1px var(--marquee-stroke)',
                        paddingRight: '2rem',
                        userSelect: 'none',
                    }}>
                        {text}  ·  {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
