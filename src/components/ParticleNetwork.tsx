import React, { useRef, useEffect } from 'react';

const ParticleNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const numGlobePoints = 600;
        let angleY = 0;
        let angleX = 0.3;

        // Ambient particles
        const numAmbient = 40;
        let ambientParticles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

        // Scroll state
        let scrollProgress = 0;
        let currentShape = 0;
        let shapeMorphT = 0;
        let globeRadius = 250;
        let globeCenterX = 0;
        let globeCenterY = 0;

        // Interaction state for shape shaking
        let prevMouseX = 0;
        let prevMouseY = 0;
        let shapeOffsetX = 0;
        let shapeOffsetY = 0;
        let shapeVelX = 0;
        let shapeVelY = 0;
        let forwardTime = 0; // State for forward moving animation

        // Generate shapes (unit sphere coordinates)
        const generateSphere = () => {
            const pts: { ox: number; oy: number; oz: number }[] = [];
            const phi = Math.PI * (3 - Math.sqrt(5));
            for (let i = 0; i < numGlobePoints; i++) {
                const y = 1 - (i / (numGlobePoints - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const theta = phi * i;
                pts.push({ ox: Math.cos(theta) * r, oy: y, oz: Math.sin(theta) * r });
            }
            return pts;
        };

        const generateTorus = () => {
            const pts: { ox: number; oy: number; oz: number }[] = [];
            const R = 0.7, r = 0.35;
            for (let i = 0; i < numGlobePoints; i++) {
                const u = (i / numGlobePoints) * Math.PI * 2 * 20;
                const v = (i / numGlobePoints) * Math.PI * 2;
                pts.push({
                    ox: (R + r * Math.cos(v)) * Math.cos(u),
                    oy: r * Math.sin(v),
                    oz: (R + r * Math.cos(v)) * Math.sin(u)
                });
            }
            return pts;
        };

        const generateForward = () => {
            const pts: { ox: number; oy: number; oz: number; isForward?: boolean }[] = [];
            for (let i = 0; i < numGlobePoints; i++) {
                pts.push({
                    ox: (Math.random() - 0.5) * 8,
                    oy: (Math.random() - 0.5) * 8,
                    oz: (Math.random() - 0.5) * 8,
                    isForward: true
                });
            }
            return pts;
        };

        const generateCube = () => {
            const pts: { ox: number; oy: number; oz: number }[] = [];
            const perFace = Math.floor(numGlobePoints / 6);
            const faces = [
                (u: number, v: number) => ({ ox: u, oy: v, oz: 1 }),
                (u: number, v: number) => ({ ox: u, oy: v, oz: -1 }),
                (u: number, v: number) => ({ ox: 1, oy: u, oz: v }),
                (u: number, v: number) => ({ ox: -1, oy: u, oz: v }),
                (u: number, v: number) => ({ ox: u, oy: 1, oz: v }),
                (u: number, v: number) => ({ ox: u, oy: -1, oz: v }),
            ];
            for (let f = 0; f < 6; f++) {
                for (let i = 0; i < perFace; i++) {
                    pts.push(faces[f]((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
                }
            }
            while (pts.length < numGlobePoints) pts.push({ ox: 0, oy: 0, oz: 0 });
            return pts;
        };

        const generateDisc = () => {
            const pts: { ox: number; oy: number; oz: number }[] = [];
            for (let i = 0; i < numGlobePoints; i++) {
                const angle = (i / numGlobePoints) * Math.PI * 2 * 5;
                const r = 0.3 + (i / numGlobePoints) * 0.7;
                pts.push({ ox: Math.cos(angle) * r, oy: 0, oz: Math.sin(angle) * r });
            }
            return pts;
        };

        const shapes = [
            generateSphere(), // Hero: Sphere
            generateSphere(), // About Me Timeline
            generateForward(),// Pillars
            generateTorus(),  // Experience
            generateCube(),   // Marquee
            generateDisc()    // Skills
        ];

        // Position offsets per section: [xOffset, yOffset] as fraction of viewport
        const positionOffsets = [
            [0.5, 0.5],     // Hero: centered "Hi Karan"
            [0.85, 0.5],    // About Me Timeline: Sphere shifted right
            [0.25, 0.5],    // Pillars: Torus shifted left
            [0.75, 0.5],    // Experience: Helix shifted right
            [0.5, 0.5],     // Marquee: Cube centered
            [0.5, 0.5],     // Skills: Disc centered
        ];

        const initAmbient = () => {
            ambientParticles = [];
            for (let i = 0; i < numAmbient; i++) {
                ambientParticles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.2 + 0.05
                });
            }
        };

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
            globeRadius = Math.min(window.innerWidth, window.innerHeight) * 0.6;
            initAmbient();
        };

        const onScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            const shapeFraction = scrollProgress * (shapes.length - 1);
            currentShape = Math.min(Math.floor(shapeFraction), shapes.length - 2);
            shapeMorphT = shapeFraction - currentShape;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (prevMouseX === 0 && prevMouseY === 0) {
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
            const dx = e.clientX - prevMouseX;
            const dy = e.clientY - prevMouseY;

            // Apply requested playbackRate mapping to velocity injection
            const playbackRate = 0.8;
            shapeVelX += dx * (0.08 * playbackRate);
            shapeVelY += dy * (0.08 * playbackRate);

            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const smoothstep = (t: number) => t * t * (3 - 2 * t);

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Shape shake effect scaled perfectly by playbackRate: 0.8
            const playbackRate = 0.8;
            const springForce = 0.04 * playbackRate;
            const damping = 1 - (0.15 * playbackRate); // Base damping was 0.85

            // Spring pulls back towards center (0,0 offset)
            shapeVelX += (0 - shapeOffsetX) * springForce;
            shapeVelY += (0 - shapeOffsetY) * springForce;

            // Apply damping and integrate velocity
            shapeVelX *= damping;
            shapeVelY *= damping;
            shapeOffsetX += shapeVelX;
            shapeOffsetY += shapeVelY;

            // Ambient particles (also affected slightly by shaking)
            for (const p of ambientParticles) {
                p.x += p.vx + shapeVelX * 0.15;
                p.y += p.vy + shapeVelY * 0.15;
                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;
                const isLight = document.body.classList.contains('light-mode');
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = isLight ? `rgba(0, 119, 204, ${p.alpha * 1.5})` : `rgba(0, 191, 255, ${p.alpha})`;
                ctx.fill();
            }

            // Globe
            angleY += 0.003;
            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            const dynamicRadius = globeRadius * (0.85 + scrollProgress * 0.35);
            const t = smoothstep(shapeMorphT);

            // Smoothly interpolate base position, then add the spring/shake offset
            const posA = positionOffsets[currentShape];
            const posB = positionOffsets[Math.min(currentShape + 1, positionOffsets.length - 1)];
            globeCenterX = lerp(posA[0], posB[0], t) * window.innerWidth + shapeOffsetX;
            globeCenterY = lerp(posA[1], posB[1], t) * window.innerHeight + shapeOffsetY;

            const shapeA = shapes[currentShape];
            const shapeB = shapes[Math.min(currentShape + 1, shapes.length - 1)];

            const projected: { px: number; py: number; z: number; depth: number; colorRatio: number }[] = [];

            forwardTime += 0.04; // Speed of the forward moving space effect

            for (let i = 0; i < numGlobePoints; i++) {
                let aOx = shapeA[i].ox;
                let aOy = shapeA[i].oy;
                let aOz = shapeA[i].oz;
                // Run forward effect: shift Z towards negative (towards screen), wrap around
                if ('isForward' in shapeA[i]) {
                    let newZ = shapeA[i].oz - (forwardTime % 8);
                    if (newZ < -4) newZ += 8;
                    aOz = newZ;
                }

                let bOx = shapeB[i].ox;
                let bOy = shapeB[i].oy;
                let bOz = shapeB[i].oz;
                if ('isForward' in shapeB[i]) {
                    let newZ = shapeB[i].oz - (forwardTime % 8);
                    if (newZ < -4) newZ += 8;
                    bOz = newZ;
                }

                const mx = lerp(aOx, bOx, t);
                const my = lerp(aOy, bOy, t);
                const mz = lerp(aOz, bOz, t);

                let px = mx * dynamicRadius;
                let py = my * dynamicRadius;
                let pz = mz * dynamicRadius;

                let x1 = px * cosY + pz * sinY;
                let z1 = -px * sinY + pz * cosY;
                let y1 = py * cosX - z1 * sinX;
                let z2 = py * sinX + z1 * cosX;

                const perspective = 800 / (800 + z2);
                projected.push({
                    px: globeCenterX + x1 * perspective,
                    py: globeCenterY + y1 * perspective,
                    z: z2,
                    depth: perspective,
                    colorRatio: (my + 1) / 2
                });
            }

            projected.sort((a, b) => a.z - b.z);

            for (const pt of projected) {
                const size = Math.max(0.6, pt.depth * 2.8);
                const opacity = Math.min(1, Math.max(0.12, (pt.z + dynamicRadius * 1.2) / (dynamicRadius * 2.4)));

                const isLight = document.body.classList.contains('light-mode');
                // Adjust colors for light mode: Deep blue vs Cyan
                const r = isLight ? Math.floor(lerp(0, 106, pt.colorRatio)) : Math.floor(lerp(0, 138, pt.colorRatio));
                const g = isLight ? Math.floor(lerp(119, 13, pt.colorRatio)) : Math.floor(lerp(191, 43, pt.colorRatio));
                const b = isLight ? Math.floor(lerp(204, 173, pt.colorRatio)) : Math.floor(lerp(255, 226, pt.colorRatio));

                ctx.beginPath();
                ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
                ctx.fillStyle = isLight ? `rgba(${r}, ${g}, ${b}, ${opacity * 0.95})` : `rgba(${r}, ${g}, ${b}, ${opacity * 0.85})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        resizeCanvas();
        onScroll();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div data-speed="0.8">
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default ParticleNetwork;
