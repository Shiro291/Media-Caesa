import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface MathBallProps {
    position: [number, number, number];
    color: string;
    delay?: number;
}

function MathBall({ position, color, delay = 0 }: MathBallProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setActive(true);
        }, delay * 10); // Faster staggered entry
        return () => clearTimeout(timeout);
    }, [delay]);

    useFrame((_state, delta) => {
        if (!meshRef.current) return;
        
        const targetScale = active ? 1 : 0.0001;
        meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 12, delta);
        meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 12, delta);
        meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 12, delta);

        if (active) {
            meshRef.current.rotation.y += delta * 0.8;
            meshRef.current.rotation.z += delta * 0.3;
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={[0.1, 0.1, 0.1]}>
                    <sphereGeometry args={[0.55, 32, 24]} />
                    <meshStandardMaterial 
                        color={color} 
                        roughness={0.1} 
                        metalness={0.4}
                        emissive={color}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            </Float>
        </group>
    );
}

interface MathArena3DProps {
    count: number;
    color: string;
}

function MathScene({ count, color }: { count: number, color: string }) {
    const groupRef = useRef<THREE.Group>(null);
    
    const { balls, finalScale } = useMemo(() => {
        // Find best square-ish grid
        const itemsPerRow = Math.ceil(Math.sqrt(count * 1.1));
        const rows = Math.ceil(count / itemsPerRow);
        const spacing = 1.35;
        
        // Target area: roughly 10x10 world units
        const gridW = (itemsPerRow - 1) * spacing;
        const gridH = (rows - 1) * spacing;
        
        const scaleW = gridW > 0 ? 10 / (gridW + 2) : 1;
        const scaleH = gridH > 0 ? 9 / (gridH + 2) : 1;
        const finalScale = Math.min(1.0, scaleW, scaleH);

        const result = [];
        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / itemsPerRow);
            let col = i % itemsPerRow;
            
            // Snake logic: reverse every odd row
            if (row % 2 === 1) {
                col = (itemsPerRow - 1) - col;
            }

            result.push({
                id: i,
                position: [
                    (col - (itemsPerRow - 1) / 2) * spacing,
                    (row - (rows - 1) / 2) * spacing,
                    0
                ] as [number, number, number]
            });
        }
        return { balls: result, finalScale };
    }, [count]);
    
    useFrame((state) => {
        if (!groupRef.current) return;
        const targetX = (state.mouse.x * 0.15);
        const targetY = (state.mouse.y * 0.15);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    });

    return (
        <group ref={groupRef} scale={[finalScale, finalScale, finalScale]}>
            {balls.map((ball) => (
                <MathBall 
                    key={ball.id} 
                    position={ball.position} 
                    color={color} 
                    delay={ball.id}
                />
            ))}
        </group>
    );
}

export default function MathArena3D({ count, color }: MathArena3DProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-sky-50 to-white rounded-[40px] overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.05),inset_0_-20px_30px_rgba(255,255,255,0.8)] relative group/arena">
            <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }} resize={{ debounce: 0 }} dpr={[1, 2]}>
                {/* Advanced Lighting System */}
                <ambientLight intensity={0.8} />
                <hemisphereLight 
                    intensity={1} 
                    color="#ffffff" 
                    groundColor="#818cf8" 
                />
                
                <spotLight 
                    position={[10, 20, 10]} 
                    angle={0.3} 
                    penumbra={1} 
                    intensity={2.5} 
                    castShadow 
                />

                <pointLight position={[-10, -5, 10]} intensity={1.2} color="#ffffff" />
                
                <MathScene count={count} color={color} />

                <ContactShadows 
                    position={[0, -5, 0]} 
                    opacity={0.3} 
                    scale={15} 
                    blur={2.5} 
                    far={10} 
                />
                
                <Environment preset="city" />
            </Canvas>
            
            <div className="absolute top-6 right-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse delay-150"></div>
            </div>

        </div>
    );
}
