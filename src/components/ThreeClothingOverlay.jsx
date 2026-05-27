import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import ProgrammaticShirt from './ProgrammaticShirt';

// This component updates the position and rotation of the 3D shirt
// every frame based on the latest MediaPipe pose landmarks.
const TrackingController = ({ poseLandmarks, shirtColor }) => {
  const { camera } = useThree();
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current || !poseLandmarks) return;

    const leftShoulder = poseLandmarks[11];
    const rightShoulder = poseLandmarks[12];
    const leftHip = poseLandmarks[23];
    const rightHip = poseLandmarks[24];

    if (!leftShoulder || !rightShoulder || leftShoulder.visibility < 0.5 || rightShoulder.visibility < 0.5) {
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true;

    // 1. Calculate 2D Center coordinates (0-1 normalized space)
    const centerX = (leftShoulder.x + rightShoulder.x) / 2;
    const centerY = (leftShoulder.y + rightShoulder.y) / 2;

    // 2. Map normalized coordinates (0-1) to Three.js world coordinates
    // Assuming the camera is at z=5. We use unproject to find the world position.
    // MediaPipe origin is top-left (0,0), Three.js screen space is center (0,0).
    const vec = new THREE.Vector3();
    const pos = new THREE.Vector3();

    // Convert to normalized device coordinates (NDC) for Three.js (-1 to +1)
    // IMPORTANT: x is inverted because the video feed is mirrored
    vec.set(
      ((1 - centerX) * 2) - 1,
      -(centerY * 2) + 1,
      0.5
    );

    vec.unproject(camera);
    vec.sub(camera.position).normalize();

    // Estimate depth. Z coordinate from MediaPipe is relative to hips.
    // We scale it so leaning forward/backward translates to z-depth.
    const averageZ = (leftShoulder.z + rightShoulder.z) / 2;
    const targetDepth = 4 + (averageZ * 2); // Camera is at z=5, so 4 units away is roughly z=1.

    const distance = targetDepth / Math.abs(camera.position.z > 0 ? vec.z : -vec.z);
    pos.copy(camera.position).add(vec.multiplyScalar(distance));

    // Update Position (lerp for smoothness)
    groupRef.current.position.lerp(pos, 0.2);

    // 3. Calculate Scale
    const dx = leftShoulder.x - rightShoulder.x;
    const dy = leftShoulder.y - rightShoulder.y;
    // Normalized shoulder width
    const shoulderWidth = Math.sqrt(dx * dx + dy * dy);

    // Base scale factor adjusted for camera distance
    const scaleFactor = shoulderWidth * 6;
    groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.2);

    // 4. Calculate Rotation
    // Roll (tilt side to side)
    const roll = Math.atan2(dy, dx);

    // Pitch (leaning forward/backward) - simplified estimation using Z diff between shoulders and hips
    const averageHipZ = (leftHip.z + rightHip.z) / 2;
    const pitch = (averageHipZ - averageZ) * 2;

    // Yaw (turning left/right)
    const yaw = (leftShoulder.z - rightShoulder.z) * 2;

    const targetRotation = new THREE.Euler(pitch, yaw, roll);

    // Smooth rotation using quaternions
    const currentQuat = new THREE.Quaternion().setFromEuler(groupRef.current.rotation);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRotation);
    currentQuat.slerp(targetQuat, 0.2);
    groupRef.current.rotation.setFromQuaternion(currentQuat);
  });

  return (
    <group ref={groupRef}>
       <ProgrammaticShirt color={shirtColor} />
    </group>
  );
};

const ThreeClothingOverlay = ({ poseLandmarks, activeItem, videoWidth }) => {
  // Extract color based on the active item ID or name
  let shirtColor = "#ffffff";
  if (activeItem) {
     if (activeItem.id === 'shirt-2') shirtColor = "#1e3a8a"; // Denim blue
     if (activeItem.id === 'shirt-3') shirtColor = "#ef4444"; // Red
  }

  return (
    <div className="absolute inset-0 z-15" style={{ pointerEvents: 'none' }}>
      <Canvas
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Environment preset="city" />

        {activeItem && poseLandmarks && videoWidth > 0 && (
           <TrackingController
              poseLandmarks={poseLandmarks}
              shirtColor={shirtColor}

           />
        )}
      </Canvas>
    </div>
  );
};

export default ThreeClothingOverlay;
