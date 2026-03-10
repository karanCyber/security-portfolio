import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
    {
        num: "01",
        title: "Introduction",
        desc: [
            "I’m Karan Pandit, a cybersecurity engineer and technology enthusiast currently pursuing a Master’s in Informatics and Business in Germany.",
            "My focus is on Zero Trust security, cloud security, and building secure digital infrastructure."
        ]
    },
    {
        num: "02",
        title: "Early Tech Journey",
        desc: [
            "I started my career as a Software Tester at JetSynthesys where I was promoted from consultant to full-time within 7 months.",
            "This experience built my foundation in software quality, testing workflows, and product development."
        ]
    },
    {
        num: "03",
        title: "Cybersecurity Career",
        desc: [
            "I transitioned into cybersecurity and network security, working on enterprise deployments and Zero Trust architectures.",
            "My experience includes Zscaler, DLP systems, and secure network infrastructure for large organizations."
        ]
    },
    {
        num: "04",
        title: "Entrepreneurship – GenBombay",
        desc: [
            "I founded GenBombay to help local businesses build their digital presence through websites and applications.",
            "Through this initiative I developed solutions for small businesses and community platforms."
        ]
    },
    {
        num: "05",
        title: "Projects",
        desc: [
            "Projects developed through GenBombay:"
        ],
        projects: [
            { name: "79 Bakers Website", url: "https://www.79bakers.in/" },
            { name: "Trillium Dental Centre Website", url: "https://trilliumdentalcentre.in/" },
            { name: "Ramwadi Donation App", url: "https://play.google.com/store/apps/details?id=com.ramwadi.donation" }
        ]
    }
];

const ScrollText: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const steps = gsap.utils.toArray<HTMLElement>('.timeline-step');

        steps.forEach((step, index) => {
            const line = step.querySelector('.timeline-line');
            const dot = step.querySelector('.timeline-dot');
            const content = step.querySelector('.timeline-content');

            // Set initial state
            gsap.set([dot, content], { opacity: 0, y: 30 });
            if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

            // Animate on scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%", // trigger when the top of the step hits 80% down the viewport
                    end: "top 40%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.to(dot, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
                .to(content, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

            if (line) {
                // Line connection animation
                gsap.to(line, {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 70%",
                        end: "bottom 50%",
                        scrub: 1
                    }
                });
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{ padding: '8rem 0', minHeight: '100vh', position: 'relative' }}>
            <div className="container">
                <div className="section-label" style={{ marginBottom: '4rem' }}>About Me</div>

                <div style={{ paddingLeft: 'clamp(1rem, 5vw, 4rem)' }}>
                    {timelineSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="timeline-step"
                            style={{
                                display: 'flex',
                                position: 'relative',
                                gap: '3rem',
                                paddingBottom: idx === timelineSteps.length - 1 ? '2rem' : '4rem',
                            }}
                        >
                            {/* Line & Dot column */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '30px', /* Fixed width for alignment */
                                flexShrink: 0
                            }}>
                                {/* Dot */}
                                <div
                                    className="timeline-dot"
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: 'var(--accent-cyan)',
                                        boxShadow: '0 0 15px var(--accent-cyan), inset 0 0 4px #000',
                                        zIndex: 2,
                                        marginTop: '10px' // Align with text
                                    }}
                                />

                                {/* Line connecting to next dot */}
                                {idx < timelineSteps.length - 1 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '26px', // Below the dot
                                            bottom: '-10px', // Reaches down to the next dot
                                            width: '2px',
                                            background: 'rgba(255,255,255,0.05)',
                                            zIndex: 1,
                                            left: '14px' // Centered
                                        }}
                                    >
                                        <div
                                            className="timeline-line"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                background: 'var(--accent-cyan)',
                                                boxShadow: '0 0 10px var(--accent-cyan)'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Content column */}
                            <div className="timeline-content" style={{ flex: 1, paddingBottom: '2rem' }}>
                                {/* Title Area: 01 / Introduction */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: '12px',
                                    marginBottom: '1.2rem',
                                    fontFamily: 'Space Grotesk'
                                }}>
                                    <span style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: 'var(--accent-cyan)'
                                    }}>
                                        {step.num}
                                    </span>
                                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                                    {/* Number / total length */}
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '8px' }}>
                                        0{timelineSteps.length}
                                    </span>
                                    <h3 style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        margin: 0
                                    }}>
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Description Texts */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {step.desc.map((para, i) => (
                                        <p key={i} style={{
                                            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                                            lineHeight: 1.6,
                                            color: 'var(--text-secondary)',
                                            maxWidth: '850px'
                                        }}>
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Projects Links */}
                                {step.projects && (
                                    <div style={{
                                        marginTop: '1.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem'
                                    }}>
                                        {step.projects.map((proj, i) => (
                                            <a
                                                key={i}
                                                href={proj.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="glass-card"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '0.8rem 1.2rem',
                                                    width: 'fit-content',
                                                    fontSize: '0.95rem',
                                                    color: 'var(--text-primary)'
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)';
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)';
                                                }}
                                            >
                                                <ExternalLink size={16} color="var(--accent-cyan)" />
                                                {proj.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScrollText;
