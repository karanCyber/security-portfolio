import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        const moveCursor = gsap.quickTo(cursor, 'css', { duration: 0.5, ease: 'power3.out' });
        const moveDot = gsap.quickTo(dot, 'css', { duration: 0.15, ease: 'power2.out' });

        const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
        const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });
        const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });

        const onMouseMove = (e: MouseEvent) => {
            xCursor(e.clientX - 20);
            yCursor(e.clientY - 20);
            xDot(e.clientX - 4);
            yDot(e.clientY - 4);
        };

        const onClick = () => {
            gsap.fromTo(cursor, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(0, 191, 255, 0.4)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    mixBlendMode: 'difference',
                }}
            />
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent-cyan)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform',
                    boxShadow: '0 0 10px rgba(0, 191, 255, 0.5)',
                }}
            />
        </>
    );
};

export default CustomCursor;
