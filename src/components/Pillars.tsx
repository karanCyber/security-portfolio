import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        num: '01.',
        title: 'Zero Trust Architecture',
        description: 'Designing and deploying identity-centric security frameworks with Zscaler ZIA/ZPA, eliminating implicit trust across enterprise networks with 35,000+ users.',
        colorClass: 'pillar-card-cyan',
        icon: (
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none" stroke="rgba(0,191,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="40" cy="40" r="28" />
                <circle cx="40" cy="40" r="16" />
                <circle cx="40" cy="40" r="6" />
                <line x1="40" y1="12" x2="40" y2="24" />
                <line x1="40" y1="56" x2="40" y2="68" />
                <line x1="12" y1="40" x2="24" y2="40" />
                <line x1="56" y1="40" x2="68" y2="40" />
            </svg>
        ),
    },
    {
        num: '02.',
        title: 'Data Loss Prevention',
        description: 'Implementing enterprise DLP strategies with Forcepoint across web, SASE, and endpoint channels — safeguarding critical data assets from insider and external threats.',
        colorClass: 'pillar-card-dark',
        icon: (
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="20" y="28" width="40" height="32" rx="4" />
                <path d="M28 28V22a12 12 0 0 1 24 0v6" />
                <circle cx="40" cy="44" r="4" />
                <line x1="40" y1="48" x2="40" y2="54" />
            </svg>
        ),
    },
    {
        num: '03.',
        title: 'Cloud Security',
        description: 'Securing cloud-native infrastructure and driving digital transformation for financial, media, and energy sector organizations — from legacy perimeter to SASE.',
        colorClass: 'pillar-card-gray',
        icon: (
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none" stroke="rgba(0,191,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 52a14 14 0 1 1 6-27 16 16 0 1 1 30 8 10 10 0 0 1-2 19z" />
                <line x1="40" y1="52" x2="40" y2="64" />
                <line x1="32" y1="60" x2="48" y2="60" />
            </svg>
        ),
    },
];

const Pillars: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.pillar-label', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        });

        gsap.fromTo('.pillar-card', { opacity: 0, y: 50, scale: 0.92 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15,
            ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{ padding: '8rem 0' }}>
            <div className="container">
                <div className="pillar-label section-label" style={{ marginBottom: '1.5rem' }}>Core Expertise</div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '4rem', maxWidth: '600px' }}>
                    Three pillars of <span className="gradient-text">enterprise defense</span>
                </h2>

                <div className="pillars-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {pillars.map((p, i) => (
                        <div key={i} className={`pillar-card ${p.colorClass}`}>
                            <div>
                                <span style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    fontFamily: 'Space Grotesk', fontSize: '0.9rem',
                                    color: i === 1 ? 'var(--text-muted)' : 'var(--accent-cyan)',
                                    fontWeight: 600,
                                }}>{p.num}</span>
                                {p.icon}
                            </div>
                            <div style={{ marginTop: 'auto' }}>
                                <h3 style={{
                                    fontSize: '1.5rem', fontWeight: 700,
                                    marginBottom: '0.8rem', lineHeight: 1.3,
                                }}>{p.title}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.95rem', lineHeight: 1.7,
                                }}>{p.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;
