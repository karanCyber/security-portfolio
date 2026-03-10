import React, { useRef } from 'react';
import { GraduationCap, Award, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    {
        name: 'Security Architecture',
        skills: [
            'Zero Trust Architecture',
            'Secure Remote Access',
            'Identity-Centric Security',
            'Cloud Security Operations',
            'NIST Framework Compliance'
        ]
    },
    {
        name: 'Technical Specializations',
        skills: [
            'Zscaler Internet Access',
            'Zscaler Private Access',
            'Forcepoint DLP Administration',
            'Next-Gen Firewall',
            'Management Endpoint Data Protection'
        ]
    },
    {
        name: 'Automation & Systems',
        skills: [
            'Python Security Automation',
            'Linux System Administration',
            'Bash Scripting Operations',
            'SQL Data Management',
            'SIEM Threat Monitoring'
        ]
    },
    {
        name: 'Professional Operations',
        skills: [
            'Full-Cycle Implementation',
            'Proof of Concept',
            'Root Cause Analysis',
            'Enterprise Technical Support',
            'SLA Compliance Management'
        ]
    },
];

const certifications = [
    { name: 'Google Cybersecurity Professional Certificate (v2)', issuer: 'Google', date: 'Jan 2026', color: '#4285F4' },
    { name: 'Automate Cybersecurity Tasks with Python', issuer: 'Google', date: 'Jan 2026', color: '#4285F4' },
    { name: 'Zscaler Digital Transformation Administrator', issuer: 'Zscaler', date: 'May 2025', color: '#00bfff' },
    { name: 'Certified Forcepoint DLP Administrator', issuer: 'Forcepoint', date: 'Oct 2025', color: '#e84b3a' },
    { name: 'ZIA Certified Support Specialist', issuer: 'Zscaler', date: 'Feb 2024', color: '#00bfff' },
    { name: 'Google Cloud Fundamentals: Core Infrastructure', issuer: 'Google', date: 'Dec 2025', color: '#34A853' },
    { name: 'Tools of the Trade: Linux and SQL', issuer: 'Google', date: 'Dec 2025', color: '#FBBC04' },

    // Professional Certifications
    { name: 'Zscaler Sales Professional Certification', issuer: 'Zscaler Training', date: 'Nov 2024', color: '#00bfff' },
    { name: 'Zscaler Sales Engineer Certification', issuer: 'Zscaler Training', date: 'Mar 2024', color: '#00bfff' },
    { name: 'Zscaler Internet Access (ZIA) Delivery Specialist', issuer: 'Zscaler Training', date: 'Mar 2024', color: '#00bfff' },
    { name: 'Zscaler Zero Trust Certified Associate (ZTCA)', issuer: 'Zscaler Academy', date: 'Nov 2023', color: '#00bfff' },
    { name: 'Zscaler Private Access (ZPA) Administrator Certification', issuer: 'Zscaler Training', date: 'Nov 2023', color: '#00bfff' },
    { name: 'Zscaler Certified Delivery Specialist (58 hrs)', issuer: 'Zscaler Academy', date: 'Sep 2024', color: '#00bfff' },
    { name: 'Zscaler Private Access (ZPA) Delivery Specialist', issuer: 'Zscaler Training', date: 'Jan 2024', color: '#00bfff' },
    { name: 'Zscaler Internet Access (ZIA) Administrator Certification', issuer: 'Zscaler Training', date: 'Jan 2024', color: '#00bfff' },

    // Technical Course Completions
    { name: 'Introduction to Networking for Cyber Professionals (EDU-101)', issuer: 'Zscaler Training', date: 'Mar 2024', color: '#00bfff' },
    { name: 'Endpoint DLP (EDU-222)', issuer: 'Zscaler Training', date: 'Feb 2024', color: '#00bfff' },
    { name: 'Zscaler For Users - Advanced (EDU-202) Certificate', issuer: 'Zscaler Academy', date: 'Jan 2024', color: '#00bfff' },
    { name: 'Browser Isolation (EDU-233)', issuer: 'Zscaler Training', date: 'Aug 2024', color: '#00bfff' },
    { name: 'Zscaler For Users - Essentials (EDU-200) Certificate', issuer: 'Zscaler Training', date: 'Dec 2023', color: '#00bfff' },
];

const education = {
    degree: 'Master of Science — Informatics & Business',
    school: 'Fachhochschule Südwestfalen',
    location: 'Hagen, Germany',
    period: 'Sep 2025 — Present',
};

const SkillsAndCerts: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.skills-label', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });

        gsap.fromTo('.skill-tag', { opacity: 0, scale: 0.8, y: 20 }, {
            opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.cert-card', { opacity: 0, x: 60, y: 10 }, {
            opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.certs-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.edu-card', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.edu-card', start: 'top 88%', toggleActions: 'play none none reverse' }
        });
    }, { scope: sectionRef });

    return (
        <section id="skills" ref={sectionRef} style={{ padding: '8rem 0 0 0' }}>
            <div className="container">

                {/* ── Skills ── */}
                <div style={{ marginBottom: '6rem' }}>
                    <div className="skills-label section-label">Technical Arsenal</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3rem' }}>
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>

                    <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {skillCategories.map((cat, i) => (
                            <div key={i} className="glass-card" style={{ padding: '1.8rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                                    {cat.name}
                                    <div className="neon-line" style={{ marginTop: '0.7rem' }} />
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {cat.skills.map((s, si) => (
                                        <span key={si} className="skill-tag" style={{
                                            padding: '5px 13px', borderRadius: '20px',
                                            background: 'rgba(0, 191, 255, 0.06)',
                                            border: '1px solid rgba(0, 191, 255, 0.14)',
                                            fontSize: '0.82rem', color: 'var(--text-secondary)',
                                            cursor: 'default',
                                            transition: 'var(--transition-smooth)',
                                        }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLElement).style.background = 'rgba(0,191,255,0.14)';
                                                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLElement).style.background = 'rgba(0, 191, 255, 0.06)';
                                                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                                            }}
                                        >{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Certifications ── */}
                <div style={{ marginBottom: '6rem' }}>
                    <div className="section-label" style={{ marginBottom: '1.5rem' }}>Credentials</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '2.5rem' }}>
                        Certifications
                    </h2>
                    <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
                        {certifications.map((cert, ci) => (
                            <div key={ci} className="cert-card" style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1.1rem 1.4rem',
                                background: 'rgba(255,255,255,0.025)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderLeft: `3px solid ${cert.color}`,
                                borderRadius: '14px',
                                transition: 'var(--transition-smooth)',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                                }}
                            >
                                <Award size={18} color={cert.color} style={{ flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.87rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cert.name}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>{cert.issuer}</div>
                                </div>
                                <span style={{ color: cert.color, fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{cert.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Education ── */}
                <div style={{ marginBottom: '6rem' }}>
                    <div className="section-label" style={{ marginBottom: '1.5rem' }}>Education</div>
                    <div className="edu-card glass-card" style={{
                        padding: '2rem 2.5rem', maxWidth: '640px',
                        borderLeft: '3px solid', borderImage: 'var(--accent-gradient) 1',
                        display: 'flex', flexDirection: 'column', gap: '0.6rem',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.4rem' }}>
                            <GraduationCap size={22} color="var(--accent-cyan)" />
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{education.degree}</h3>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600 }}>{education.school}</div>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', alignItems: 'center' }}>
                            <span>{education.location}</span>
                            <span>·</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{education.period}</span>
                        </div>
                    </div>
                </div>

                {/* ── Contact ── */}
                <div style={{ marginBottom: '6rem' }}>
                    <div className="section-label" style={{ marginBottom: '1.5rem' }}>Get In Touch</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem' }}>
                        Let's <span className="gradient-text">connect</span>
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href="mailto:pkaran0802@gmail.com"
                            className="btn btn-primary"
                            style={{ gap: '10px' }}
                        >
                            <Mail size={18} /> Email Me
                        </a>
                        <a
                            href="https://www.linkedin.com/in/karancybersec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ gap: '10px' }}
                        >
                            <Linkedin size={18} /> LinkedIn
                        </a>
                        <a
                            href="https://github.com/karanCyber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ gap: '10px' }}
                        >
                            <Github size={18} /> GitHub
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '3rem 0',
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Space Grotesk' }}>
                        Karan <span className="gradient-text">Pandit</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                        <a href="https://www.linkedin.com/in/karancybersec" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--text-muted)', transition: 'var(--transition-smooth)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#0A66C2'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                        >
                            <Linkedin size={18} />
                        </a>
                        <a href="https://github.com/karanCyber" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--text-muted)', transition: 'var(--transition-smooth)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                        >
                            <Github size={18} />
                        </a>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            © 2026 · Network Security Engineer · Hagen, Germany
                        </span>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default SkillsAndCerts;
