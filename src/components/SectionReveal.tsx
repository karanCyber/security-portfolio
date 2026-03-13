import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
    children: React.ReactNode;
    id?: string;
    /** Set to true for sections that manage their own entry animation */
    skipReveal?: boolean;
}

/**
 * Parallax fade-up reveal: sections rise gently from below and fade in as they enter the viewport.
 * Much smoother than the previous slide-from-right approach and doesn't conflict with inner animations.
 */
const SectionReveal: React.FC<SectionRevealProps> = ({ children, id, skipReveal = false }) => {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || skipReveal) return;

        // Start invisible, slightly below natural position
        gsap.set(el, { opacity: 0, y: 60 });

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1.2,
            onUpdate(self) {
                const p = self.progress;
                // Ease in with a smooth cubic curve
                const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
                gsap.set(el, {
                    y: (1 - eased) * 60,
                    opacity: Math.min(1, p * 2),
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
