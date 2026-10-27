import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Icosahedron,
  Cylinder,
  Environment, 
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { MeshPhysicalMaterial } from 'three';
extend({ MeshPhysicalMaterial });

const LuxuryGeometricStructure = () => {
  const group = useRef<THREE.Group>(null);
  
  // Architectural-inspired forms
  const shapes = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({
    type: i % 2 === 0 ? 'icosahedron' : 'cylinder',
    position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 2 - 1] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    color: i % 2 === 0 ? '#A67C52' : '#C5A880',
    roughness: 0.1,
    metalness: 0.9,
  })), []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          {shape.type === 'icosahedron' ? (
            <Icosahedron args={[0.8, 0]} position={shape.position} rotation={shape.rotation}>
              <meshPhysicalMaterial
                color={shape.color}
                roughness={shape.roughness}
                metalness={shape.metalness}
                clearcoat={1}
                clearcoatRoughness={0}
              />
            </Icosahedron>
          ) : (
            <Cylinder args={[0.3, 0.3, 1.5, 32]} position={shape.position} rotation={shape.rotation}>
              <meshPhysicalMaterial
                color={shape.color}
                roughness={shape.roughness}
                metalness={shape.metalness}
                clearcoat={1}
                clearcoatRoughness={0}
              />
            </Cylinder>
          )}
        </Float>
      ))}
    </group>
  );
};

// Parallax camera component
const CameraController = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

export const Hero3DBackground: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#171717]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <CameraController />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} angle={0.5} castShadow />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#A67C52" />
        
        <Environment preset="city" />
        
        <LuxuryGeometricStructure />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
