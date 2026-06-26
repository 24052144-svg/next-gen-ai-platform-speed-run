import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';

const AnimatedCore = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* Inner glowing distorted sphere */}
      <Sphere ref={sphereRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#114C5A" /* --color-nocturnal-expedition */
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#FF9932" /* --color-deep-saffron */
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Outer wireframe sphere for technical look */}
      <Sphere args={[1.8, 32, 32]}>
        <meshStandardMaterial 
          color="#FFC801" /* --color-forsythia */
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
      
      {/* Abstract ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#D9E8E2" /* --color-mystic-mint */ transparent opacity={0.5} />
      </mesh>
    </Float>
  );
};

export default function Hero3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ pointerEvents: 'auto' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#114C5A" intensity={2} />
        
        <AnimatedCore />
        <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.6} color="#FFC801" />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
