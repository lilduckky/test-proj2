import { useRef } from 'react';

import * as THREE from 'three';

const ProgrammaticShirt = ({ color }) => {
  const groupRef = useRef();

  // A simple representation of a T-shirt
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Torso */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.8, 2.2, 32]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Left Sleeve */}
      <mesh position={[-1.1, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.3, 0.25, 0.8, 16]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Right Sleeve */}
      <mesh position={[1.1, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.3, 0.25, 0.8, 16]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Neck Hole */}
      <mesh position={[0, 1.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <torusGeometry args={[0.4, 0.05, 16, 32]} />
         <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default ProgrammaticShirt;
