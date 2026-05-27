import { useEffect, useState } from 'react';

const ClothingOverlay = ({ poseLandmarks, activeItem, videoWidth, videoHeight }) => {
  const [style, setStyle] = useState({ display: 'none' });

  useEffect(() => {
    if (!poseLandmarks || !activeItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStyle({ display: 'none' });
      return;
    }

    // MediaPipe Pose landmarks for shoulders and hips
    const leftShoulder = poseLandmarks[11];
    const rightShoulder = poseLandmarks[12];
    const leftHip = poseLandmarks[23];
    const rightHip = poseLandmarks[24];

    // Check visibility score before rendering
    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || leftShoulder.visibility < 0.5 || rightShoulder.visibility < 0.5) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStyle({ display: 'none' });
      return;
    }

    // Calculate center point between shoulders to anchor the shirt collar
    const centerX = (leftShoulder.x + rightShoulder.x) / 2;
    const centerY = (leftShoulder.y + rightShoulder.y) / 2;

    // Calculate shoulder width for scaling
    const dx = leftShoulder.x - rightShoulder.x;
    const dy = leftShoulder.y - rightShoulder.y;
    const shoulderWidth = Math.sqrt(dx * dx + dy * dy);

    // Calculate torso length
    const torsoLength = ((leftHip.y + rightHip.y) / 2) - centerY;

    // Convert normalized coordinates (0-1) to pixel coordinates based on video size
    const pixelX = centerX * videoWidth;
    const pixelY = centerY * videoHeight;
    const pixelWidth = shoulderWidth * videoWidth * 1.8; // Scale factor for the clothing
    const pixelHeight = torsoLength * videoHeight * 1.5;

    // Calculate rotation angle if the person is leaning
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 180; // normalize

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStyle({
      position: 'absolute',
      left: `${pixelX}px`,
      top: `${pixelY}px`,
      width: `${pixelWidth}px`,
      height: `${pixelHeight}px`,
      transform: `translate(-50%, -10%) rotate(${angle}deg)`, // -10% top align the collar
      transformOrigin: '50% 10%',
      transition: 'all 0.1s ease-out', // Smooth out jitter
      pointerEvents: 'none', // Let clicks pass through
      display: 'block',
      opacity: 0.9,
      zIndex: 10
    });

  }, [poseLandmarks, activeItem, videoWidth, videoHeight]);

  if (!activeItem) return null;

  return (
    <div style={style}>
      <img
        src={activeItem.imageUrl}
        alt={activeItem.name}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default ClothingOverlay;
