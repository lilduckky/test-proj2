import { useState, useEffect, useRef } from 'react';
const { Pose } = window;
const { Camera } = window;


export const usePoseDetection = (webcamRef, canvasRef) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [poseLandmarks, setPoseLandmarks] = useState(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
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

          // Draw the skeleton on the canvas for debugging/visual feedback
          if (canvasRef.current && webcamRef.current && webcamRef.current.video) {
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const canvasCtx = canvasRef.current.getContext('2d');
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // Mirror the canvas ctx so it aligns with mirrored video
            canvasCtx.translate(canvasRef.current.width, 0);
            canvasCtx.scale(-1, 1);

            if (window.drawConnectors && window.drawLandmarks && window.POSE_CONNECTIONS) {
                window.drawConnectors(canvasCtx, results.poseLandmarks, window.POSE_CONNECTIONS,
                             {color: '#00FF00', lineWidth: 4});
                window.drawLandmarks(canvasCtx, results.poseLandmarks,
                            {color: '#FF0000', lineWidth: 2});
            }
            canvasCtx.restore();
          }
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
    } catch (err) {
      console.error("Failed to initialize Pose detection:", err);

      setError(err.message);
    }
  }, [webcamRef, canvasRef]);

  const startDetection = () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      poseRef.current
    ) {
      // Need a recursive check to make sure readyState is 4 (HAVE_ENOUGH_DATA)
      const checkVideoReady = () => {
        if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
          console.log("Video is ready. Starting MediaPipe Camera...");
          try {
            const camera = new Camera(webcamRef.current.video, {
              onFrame: async () => {
                if (webcamRef.current && webcamRef.current.video && poseRef.current) {
                  try {
                     await poseRef.current.send({ image: webcamRef.current.video });
                  } catch (e) {
                     console.error("Pose detection send error:", e);
                  }
                }
              },
              width: 1280,
              height: 720,
            });

            camera.start();
            cameraRef.current = camera;
          } catch(e) {
             console.error("Failed to start camera:", e);
          }
        } else {
          // If not ready, wait and try again
          setTimeout(checkVideoReady, 100);
        }
      };

      checkVideoReady();
    }
  };

  return { isLoaded, poseLandmarks, startDetection, error };
};
