import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
    children: React.ReactNode;
    id?: string;
    /** Set to true for sections that contain a GSAP pin internally (like ScrollText) */
    skipReveal?: boolean;
}

/**
 * Wraps a section so it slides in from the RIGHT as the user scrolls down.
 * The clip mask translates from right-to-left as scroll progress advances.
 */
const SectionReveal: React.FC<SectionRevealProps> = ({ children, id, skipReveal = false }) => {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || skipReveal) return;

        // Start fully off-screen to the right
        gsap.set(el, { x: '100vw', opacity: 0 });

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            end: 'top 15%',
            scrub: 1,
            onUpdate(self) {
                const p = self.progress;
                // Ease the translation with a cubic curve for snappier feel
                const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
                gsap.set(el, {
                    x: `${(1 - eased) * 100}vw`,
                    opacity: Math.min(1, p * 2.5),
                });
            },
        });

        return () => {
            st.kill();
        };
    }, [skipReveal]);

    return (
        <div
            ref={wrapRef}
            id={id}
            style={{
                willChange: 'transform, opacity',
                position: 'relative',
            }}
        >
            {children}
        </div>
    );
};

export default SectionReveal;
