import React, { useRef } from 'react';
import { Shield, ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo('.hero-badge',
            { opacity: 0, x: 60, filter: 'blur(6px)' },
            { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1 }
        )
            .fromTo('.hero-title',
                { opacity: 0, x: 120, filter: 'blur(12px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.3 },
                '-=0.6'
            )
            .fromTo('.hero-subtitle',
                { opacity: 0, x: 80 },
                { opacity: 1, x: 0, duration: 1 },
                '-=0.6'
            )
            .fromTo('.hero-buttons',
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.8 },
                '-=0.4'
            );
    }, { scope: sectionRef });

    const handleTorchMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x}px`);
        e.currentTarget.style.setProperty('--y', `${y}px`);
    };

    const handleTorchLeave = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.setProperty('--x', `50%`);
        e.currentTarget.style.setProperty('--y', `50%`);
    };

    return (
        <section ref={sectionRef} style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '0 2rem', position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient radial glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '900px', height: '900px',
                background: 'radial-gradient(ellipse at center, rgba(0,191,255,0.06) 0%, rgba(68,102,255,0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{
                textAlign: 'center',
                maxWidth: '1200px',
                zIndex: 10
            }}>
                <div ref={contentRef}>
                    <div className="hero-badge" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '12px 28px', borderRadius: '50px',
                        background: 'rgba(0, 191, 255, 0.08)',
                        border: '1px solid rgba(0, 191, 255, 0.2)',
                        marginBottom: '3.5rem', color: 'var(--accent-cyan)',
                        fontSize: '0.95rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                    }} id="hero-badge">
                        <Shield size={18} /> Cybersecurity Architect
                    </div>

                    <h1
                        className="hero-title torch-text"
                        onMouseMove={handleTorchMove}
                        onMouseLeave={handleTorchLeave}
                        style={{
                            fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', marginBottom: '2.5rem',
                            lineHeight: 0.95, letterSpacing: '-0.05em', fontWeight: 800,
                        }} id="hero-title">
                        Securing the <br /> <span className="gradient-text">digital frontier</span>
                    </h1>

                    <p className="hero-subtitle" style={{
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                        color: 'var(--text-secondary)', lineHeight: 1.6,
                        maxWidth: '900px', margin: '0 auto 4.5rem auto',
                    }} id="hero-subtitle">
                        Network Security Engineer architecting Zero Trust frameworks,
                        Data Loss Prevention pipelines, and Cloud Security postures — protecting enterprises at scale.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }} id="hero-buttons">
                        <a href="#experience" className="btn btn-primary" style={{ gap: '12px', padding: '1.4rem 3.2rem', fontSize: '1.1rem' }}>
                            View Experience <ArrowRight size={22} />
                        </a>
                        <a href="#skills" className="btn btn-outline" style={{ padding: '1.4rem 3.2rem', fontSize: '1.1rem' }}>Technical Stack</a>
                    </div>
                </div>
            </div>

            <div style={{
                position: 'absolute', bottom: '3rem', left: '50%',
                transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px', color: 'var(--text-muted)',
                fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase',
                animation: 'scrollBounce 2s ease-in-out infinite',
            }}>
                <span>Scroll</span>
                <ChevronDown size={18} />
            </div>

            <style>{`
                @keyframes scrollBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(8px); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
