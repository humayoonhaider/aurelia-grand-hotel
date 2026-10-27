import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const LuxuryFloatingShapes = () => {
  const group = useRef<THREE.Group>(null);
  
  // Create 5 distinct parts with varied shapes/materials
  const shapes = useMemo(() => [
    { position: [-2, 1, -2], color: '#A67C52' },
    { position: [2, -1, -3], color: '#C5A880' },
    { position: [-1, -2, -1], color: '#FAF8F5' },
    { position: [1, 2, -4], color: '#8C653E' },
    { position: [0, 0, -5], color: '#A67C52' },
  ], []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[1, 32, 32]} position={new THREE.Vector3(...shape.position as [number, number, number])}>
            <MeshDistortMaterial
              color={shape.color}
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

export const Hero3DBackground: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#171717]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LuxuryFloatingShapes />
      </Canvas>
    </div>
  );
};
