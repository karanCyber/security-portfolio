import React, { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const osintRisks = [
    { id: 1, title: "Social Media Fingerprinting", description: "Cross-platform correlation of user identities through behavioral patterns, metadata analysis, and writing style recognition." },
    { id: 2, title: "Digital Footprint Exploitation", description: "Aggregating publicly available data points to construct detailed profiles for targeted social engineering campaigns." },
    { id: 3, title: "Credential Intelligence", description: "Monitoring breach databases and dark web markets for leaked credentials associated with target organizations." },
    { id: 4, title: "Infrastructure Reconnaissance", description: "Mapping organizational attack surfaces through DNS records, certificate transparency logs, and service enumeration." },
    { id: 5, title: "Supply Chain Mapping", description: "Identifying weak links in vendor relationships and third-party service dependencies through open data analysis." },
    { id: 6, title: "Geospatial Intelligence", description: "Extracting location data from photos, check-ins, and IoT device broadcasts for physical security assessment." },
];

const OSINTRisks: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.osint-label', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
        gsap.fromTo('.osint-title', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1, delay: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });

        // Slide all cards from the right for consistency
        document.querySelectorAll('.osint-card').forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, x: 80 },
                {
                    opacity: 1, x: 0, duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section id="osint" ref={sectionRef} style={{ padding: '10rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="osint-label section-label">Threat Research</div>
                    <h2 className="osint-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem' }}>
                        OSINT <span className="gradient-text">Risk Vectors</span>
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {osintRisks.map((risk) => (
                        <div key={risk.id} className="glass-card osint-card" style={{
                            padding: '2rem',
                            display: 'flex',
                            gap: '1.25rem',
                            alignItems: 'flex-start',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Large backdrop number */}
                            <span style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '15px',
                                fontSize: '5rem',
                                fontWeight: 900,
                                color: 'rgba(0, 191, 255, 0.04)',
                                lineHeight: 1,
                                fontFamily: 'Space Grotesk',
                            }}>
                                {String(risk.id).padStart(2, '0')}
                            </span>

                            <div style={{
                                minWidth: '44px', height: '44px', borderRadius: '12px',
                                background: 'rgba(255, 100, 50, 0.1)',
                                border: '1px solid rgba(255, 100, 50, 0.2)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                color: '#ff6432'
                            }}>
                                <AlertTriangle size={20} />
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{risk.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{risk.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OSINTRisks;
