import { useState, useEffect, useRef } from 'react';
const { Pose } = window;
const { Camera } = window;

export const usePoseDetection = (webcamRef) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [poseLandmarks, setPoseLandmarks] = useState(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Initialize MediaPipe Pose
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (results.poseLandmarks) {
        setPoseLandmarks(results.poseLandmarks);
      }
    });

    poseRef.current = pose;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      pose.close();
    };
  }, []);

  const startDetection = () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      poseRef.current
    ) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current && webcamRef.current.video) {
            await poseRef.current.send({ image: webcamRef.current.video });
          }
        },
        width: 1280,
        height: 720,
      });

      camera.start();
      cameraRef.current = camera;
    }
  };

  return { isLoaded, poseLandmarks, startDetection };
};
