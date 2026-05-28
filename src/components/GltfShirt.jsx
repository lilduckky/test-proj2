import { useGLTF } from '@react-three/drei';

const GltfShirt = ({ color }) => {
  // Load the GLTF model from the public folder
  const { scene } = useGLTF('/assets/models/shirt.gltf');

  // Clone the scene so we can modify materials without affecting the cached original
  const clone = scene.clone();

  // If we want to dynamically color the shirt based on the catalog selection:
  clone.traverse((child) => {
    if (child.isMesh) {
       // We create a new material instance based on the original, but change its color
       // This ensures we keep textures if they exist, but override the base color.
       // For a pure color override, we could just assign a new MeshStandardMaterial.
       const originalMaterial = child.material;

       // Just override the color of the existing material
       if (originalMaterial) {
          originalMaterial.color.set(color);
       }
    }
  });

  return (
    <primitive
      object={clone}
      position={[0, -1.2, 0]}
      // The scale might need manual tuning depending on how the GLTF was exported
      scale={[2.5, 2.5, 2.5]}
      rotation={[0, 0, 0]}
    />
  );
};

export default GltfShirt;