import React, { useRef } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        title: 'Technical Engineer — Data Security',
        company: 'Hitachi India Systems Pvt. Ltd.',
        location: 'Mumbai, India',
        period: 'Apr 2025 — Oct 2025',
        accent: '#00bfff',
        points: [
            'Provided L2/L3 technical support for enterprise Zscaler ZIA & ZPA deployments — owning the full incident lifecycle from P3 to critical P1 cases with structured Root Cause Analysis and resolution documentation.',
            'Led Zscaler Zero Trust architectural transformation for Shriram Finance, modernizing legacy infrastructure to a cloud-native security model; delivered weekly strategic progress and ROI reports directly to CTO.',
            'Delivered P3-P1 Forcepoint Proxy & DLP support for Axis Mutual Fund, Nerolac Paints, and Niwas Housing Finance — ensuring 24/7 data integrity and zero-breach availability.',
            'Managed Forcepoint Proxy environments for Gujarat Gas, securing web gateways and preventing data exfiltration across critical energy sector infrastructure.',
            'Executed end-to-end POCs for Zscaler and Forcepoint suites, translating complex client requirements into production-ready security architectures.'
        ],
    },
    {
        title: 'Network Security Engineer',
        company: 'DC Infotech & Communication Ltd.',
        location: 'Mumbai, India',
        period: 'Oct 2023 — Mar 2025',
        accent: '#4466ff',
        points: [
            'Directed end-to-end Zscaler deployment for a 35,000+ user enterprise environment in the banking sector — achieving full rollout with zero downtime.',
            'Designed and delivered Zscaler Zero Trust POCs for IDBI Bank and FCC Clutch, focusing on secure financial transactions and network modernization.',
            'Executed DLP POC (Web, SASE & Endpoint) for JioHotstar, aligning data protection policies with large-scale media streaming infrastructure.',
            'Resolved 75+ complex technical incidents with 100% SLA compliance for Sony, Viacom18, Edelweiss Life Insurance, and CBIC (USA).',
            'Authored Quarterly Business Reviews (QBR) and Policy Risk Reports submitted to client leadership to identify security gaps and optimize firewall/DLP policies.'
        ],
    },
    {
        title: 'Technical Associate',
        company: 'Meta Infotech Pvt. Ltd.',
        location: 'Mumbai, India',
        period: 'May 2023 — Sep 2023',
        accent: '#8a2be2',
        points: [
            'Completed intensive onboarding for Zscaler ZIA and ZPA, gaining hands-on depth in Zero Trust architecture and cloud security operations.',
            'Managed and resolved enterprise security tickets, providing real-time remote support via Zoom and remote desktop tools.',
            'Diagnosed connectivity and policy issues within the Zscaler ecosystem to maintain client security perimeters.'
        ],
    },
    {
        title: 'Associate Software Tester',
        company: 'JetSynthesys Pvt. Ltd.',
        location: 'Pune, India',
        period: 'May 2021 — Apr 2022',
        accent: '#00bfff',
        points: [
            'Promoted from Consultant to Full-Time Associate within 7 months based on outstanding contributions to the Jet Media Network project.',
            'Conducted end-to-end manual and functional testing for the global media application "Ronaldinho", ensuring high-quality user experience across all modules.',
            'Managed the complete defect lifecycle in Jira — from test case authoring and bug reporting through to final verification and sign-off.',
            'Collaborated with cross-functional dev teams to perform root-cause analysis, improving software stability and reducing deployment risks.'
        ],
    },
];

const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.exp-label', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
        gsap.fromTo('.exp-title', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });

        document.querySelectorAll('.experience-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, x: 60, y: 20 },
                {
                    opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out',
                    delay: i * 0.05,
                    scrollTrigger: {
                        trigger: card, start: 'top 88%', end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section id="experience" ref={sectionRef} style={{ padding: '8rem 0' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <div className="exp-label section-label">Career Arc</div>
                    <h2 className="exp-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                </div>

                <div style={{ display: 'grid', gap: '1.8rem', maxWidth: '900px' }}>
                    {experiences.map((exp, i) => (
                        <div key={i} className="experience-card" style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '20px',
                            padding: '2rem 2.2rem',
                            borderLeft: `3px solid ${exp.accent}`,
                            boxShadow: `inset 0 0 40px rgba(0,0,0,0.2)`,
                            transition: 'var(--transition-smooth)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Subtle glow accent */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: `radial-gradient(ellipse at 0% 50%, ${exp.accent}08 0%, transparent 60%)`,
                                pointerEvents: 'none',
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.4rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{exp.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: exp.accent, fontSize: '0.9rem', fontWeight: 600 }}>
                                            <Briefcase size={14} /><span>{exp.company}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                            <MapPin size={12} /><span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <span style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '5px 14px', borderRadius: '20px',
                                    background: `${exp.accent}12`,
                                    border: `1px solid ${exp.accent}30`,
                                    fontSize: '0.78rem', color: exp.accent, fontWeight: 600, whiteSpace: 'nowrap',
                                }}>
                                    <Calendar size={12} /> {exp.period}
                                </span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                                {exp.points.map((pt, pi) => (
                                    <li key={pi} style={{ color: 'var(--text-secondary)', fontSize: '0.91rem', lineHeight: 1.7, paddingLeft: '1.4rem', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, color: exp.accent, fontWeight: 700 }}>›</span>{pt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
