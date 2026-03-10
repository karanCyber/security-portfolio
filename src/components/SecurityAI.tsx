import React, { useRef } from 'react';
import { BrainCircuit } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';

gsap.registerPlugin(ScrollTrigger);

const lottieUrls = [
    'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/mKMjO0DLkE.json',
    'https://lottie.host/e5513665-0a75-4e68-8f5a-1d1c5cb0f350/YflHAmYatX.json',
    'https://lottie.host/2cfc7e1f-df53-4dd3-93d0-dcfbb6224c60/VuJXDPRIl2.json',
    'https://lottie.host/9bb994cf-638f-444a-83df-0b65fb792378/qd4PvVAjyf.json',
    'https://lottie.host/8e8ecdd0-5a91-442f-bb27-93f6cbebc7b4/gK32VKPpkB.json',
    'https://lottie.host/83de76ee-7e07-465e-b7a2-4a7a5de7c66f/3bZNUQXLfd.json',
];

const LottieCardIcon: React.FC<{ url: string }> = ({ url }) => {
    const [animationData, setAnimationData] = React.useState<object | null>(null);
    React.useEffect(() => {
        fetch(url).then(r => r.ok ? r.json() : null).then(d => setAnimationData(d)).catch(() => { });
    }, [url]);

    if (!animationData) {
        return (
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-gradient)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BrainCircuit size={22} color="white" />
            </div>
        );
    }
    return <div style={{ width: 56, height: 56 }}><Lottie animationData={animationData} loop autoplay style={{ width: '100%', height: '100%' }} /></div>;
};

const practices = [
    { lottieIndex: 0, title: "Adversarial ML Defense", description: "Robust boundary training to prevent evasion attacks where adversaries subtly alter inputs to deceive ML models." },
    { lottieIndex: 1, title: "LLM Prompt Injection", description: "Strict semantic filters and input sanitization layers to neutralize malicious prompt injection against GenAI." },
    { lottieIndex: 2, title: "Data Poisoning Mitigation", description: "Cryptographic provenance and anomaly detection during model training to ensure dataset integrity." },
    { lottieIndex: 3, title: "Privacy-Preserving AI", description: "Differential Privacy and Homomorphic Encryption to learn from sensitive data without exposing identities." },
    { lottieIndex: 4, title: "AI Supply Chain", description: "Zero-trust principles for pre-trained models to prevent injection of hidden backdoors in weights." },
    { lottieIndex: 5, title: "Continuous Red Teaming", description: "Automated and manual offensive engagements to discover edge-case vulnerabilities before deployment." },
];

const SecurityAI: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo('.ai-section-label', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
        gsap.fromTo('.ai-section-title', { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1, delay: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
        gsap.fromTo('.ai-section-desc', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
        gsap.fromTo('.ai-card', { opacity: 0, x: 80 }, {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.ai-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
    }, { scope: sectionRef });

    return (
        <section id="ai-security" ref={sectionRef} style={{ padding: '10rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="ai-section-label section-label">What I Do</div>
                    <h2 className="ai-section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem' }}>
                        Security Practices in <span className="gradient-text">AI</span>
                    </h2>
                    <p className="ai-section-desc" style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                        Modern approaches to securing Machine Learning ecosystems against emerging threats.
                    </p>
                </div>

                <div className="ai-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {practices.map((p, i) => (
                        <div key={i} className="glass-card ai-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <LottieCardIcon url={lottieUrls[p.lottieIndex]} />
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.3 }}>{p.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>{p.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecurityAI;
