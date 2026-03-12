import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const COLORS = {
    num1: '#3b82f6', // Bright Blue
    num2: '#ef4444', // Bright Red
    merged: '#2dd4bf', // Teal
    neutral: '#10b981' // Original Emerald
};

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
        }, delay * 12);
        return () => clearTimeout(timeout);
    }, [delay]);

    useFrame((_state, delta) => {
        if (!meshRef.current) return;
        
        const targetScale = active ? 1 : 0.0001;
        meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 10, delta);
        meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetScale, 10, delta);
        meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, targetScale, 10, delta);

        if (active) {
            meshRef.current.rotation.y += delta * 0.6;
            meshRef.current.rotation.z += delta * 0.2;
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={[0.0001, 0.0001, 0.0001]} castShadow receiveShadow>
                    <sphereGeometry args={[0.55, 32, 24]} />
                    <meshStandardMaterial 
                        color={color} 
                        roughness={0.1} 
                        metalness={0.4}
                        emissive={color}
                        emissiveIntensity={0.4}
                    />
                </mesh>
            </Float>
        </group>
    );
}

interface MathArena3DProps {
    num1: number;
    num2: number;
    mode: 'addition' | 'subtraction';
    phase: 'separate' | 'merging';
}

function MathScene({ num1, num2, mode, phase }: MathArena3DProps) {
    const groupRef = useRef<THREE.Group>(null);
    const count = mode === 'addition' ? num1 + num2 : Math.max(0, num1 - num2);
    const { viewport } = useThree();
    
    const { balls1, balls2, mergedBalls, finalScale } = useMemo(() => {
        const spacing = 1.35;
        
        const getGrid = (n: number) => {
            const cols = Math.ceil(Math.sqrt(Math.max(1, n) * 1.1));
            const r = Math.ceil(n / cols);
            return { cols, r };
        };

        const grid1 = getGrid(num1);
        const grid2 = getGrid(num2);
        const gridM = getGrid(count);

        // Calculate absolute widths required for each group
        const w1 = Math.max(0, (grid1.cols - 1)) * spacing;
        const w2 = Math.max(0, (grid2.cols - 1)) * spacing;
        const wM = Math.max(0, (gridM.cols - 1)) * spacing;
        
        const h1 = Math.max(0, (grid1.r - 1)) * spacing;
        const h2 = Math.max(0, (grid2.r - 1)) * spacing;
        const hM = Math.max(0, (gridM.r - 1)) * spacing;

        // Base separation distance. Give some breathing room between the two groups.
        const gap = 2; // Fixed gap units between the inner edges
        const separation = (w1 / 2) + gap + (w2 / 2);
        
        // Offset for group 1 and group 2 so they are centered around 0
        const offset1 = -separation / 2;
        const offset2 = separation / 2;

        // Total width and height of the 'separate' phase
        const totalW = w1 + w2 + gap;
        const maxH_sep = Math.max(h1, h2);

        // Calculate scale to fit viewport (using 85% of available space)
        const safeWidth = viewport.width * 0.85; 
        const safeHeight = viewport.height * 0.85; 

        // Account for a minimum divisor to avoid blowing up size for very small numbers
        const scaleSepX = safeWidth / Math.max(totalW + 2, 4); // +2 for padding
        const scaleSepY = safeHeight / Math.max(maxH_sep + 2, 4);
        
        const scaleMergeX = safeWidth / Math.max(wM + 2, 4);
        const scaleMergeY = safeHeight / Math.max(hM + 2, 4);

        // Take the absolute minimum needed so everything always fits perfectly
        const finalScale = Math.min(scaleSepX, scaleSepY, scaleMergeX, scaleMergeY, 1.2);

        const generateBalls = (n: number, cols: number, rows: number, offset: [number, number, number]) => {
            const result = [];
            for (let i = 0; i < n; i++) {
                const row = Math.floor(i / cols);
                let col = i % cols;
                if (row % 2 === 1) col = (cols - 1) - col; // Snake pattern
                result.push({
                    id: i,
                    pos: [
                        (col - (cols - 1) / 2) * spacing + offset[0],
                        (row - (rows - 1) / 2) * spacing + offset[1],
                        offset[2]
                    ] as [number, number, number]
                });
            }
            return result;
        };

        return {
            balls1: generateBalls(num1, grid1.cols, grid1.r, [offset1, 0, 0]),
            balls2: generateBalls(num2, grid2.cols, grid2.r, [offset2, 0, 0]),
            mergedBalls: generateBalls(count, gridM.cols, gridM.r, [0, 0, 0]),
            finalScale
        };
    }, [num1, num2, count, viewport.width, viewport.height]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const targetX = (state.mouse.x * 0.15);
        const targetY = (state.mouse.y * 0.15);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    });

    return (
        <group ref={groupRef} scale={[finalScale, finalScale, finalScale]}>
            {phase === 'separate' ? (
                <>
                    {balls1.map((b) => <MathBall key={`b1-${b.id}`} position={b.pos} color={COLORS.num1} delay={b.id} />)}
                    {balls2.map((b) => <MathBall key={`b2-${b.id}`} position={b.pos} color={COLORS.num2} delay={num1 + b.id} />)}
                </>
            ) : (
                <>
                    {mergedBalls.map((b) => <MathBall key={`m-${b.id}`} position={b.pos} color={COLORS.merged} delay={b.id} />)}
                </>
            )}
        </group>
    );
}

export default function MathArena3D({ num1, num2, mode, phase }: MathArena3DProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-sky-50 to-white rounded-[40px] overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.05),inset_0_-20px_30px_rgba(255,255,255,0.8)] relative group/arena">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} resize={{ debounce: 0 }} dpr={1}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, 5]} intensity={0.5} />
                
                <MathScene num1={num1} num2={num2} mode={mode} phase={phase} />
            </Canvas>
            
            <div className="absolute top-6 right-6 flex gap-2 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse delay-150"></div>
            </div>
        </div>
    );
}
