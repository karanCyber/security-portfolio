import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlassShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                {/* A complex geometry for the glass look - dodecahedron looks crystalline */}
                <dodecahedronGeometry args={[2, 0]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    thickness={0.5}
                    transmission={1}
                    roughness={0.1}
                    envMapIntensity={1.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    ior={1.5}
                    color="#00bfff"
                    distortion={0.3}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                />
            </mesh>
        </Float>
    );
};

const GlassObject: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#0a0a0f']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <GlassShape />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default GlassObject;
