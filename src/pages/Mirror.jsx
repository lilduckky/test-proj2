import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { usePoseDetection } from '../hooks/usePoseDetection';
import ClothingOverlay from '../components/ClothingOverlay';
import { ChevronLeft, ChevronRight, Maximize2, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Mirror = () => {
  const webcamRef = useRef(null);
  const containerRef = useRef(null);
  const { isLoaded, poseLandmarks, startDetection } = usePoseDetection(webcamRef);

  const [catalog, setCatalog] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });


  useEffect(() => {
    // Fetch mock catalog from our backend (or use mock data directly if backend isn't running)
    const mockData = [
      { id: 'shirt-1', name: 'Classic White Tee', imageUrl: '/assets/clothes/white-tee.png', price: 29.99 },
      { id: 'shirt-2', name: 'Blue Denim Jacket', imageUrl: '/assets/clothes/denim-jacket.png', price: 89.99 },
      { id: 'shirt-3', name: 'Red Sweater', imageUrl: '/assets/clothes/red-sweater.png', price: 59.99 }
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCatalog(mockData);
  }, []);

  const handleVideoLoad = () => {
    if (webcamRef.current && webcamRef.current.video) {
      setVideoDimensions({
        width: webcamRef.current.video.videoWidth,
        height: webcamRef.current.video.videoHeight
      });
      startDetection();
    }
  };

  const nextItem = () => setActiveIndex((prev) => (prev + 1) % catalog.length);
  const prevItem = () => setActiveIndex((prev) => (prev - 1 + catalog.length) % catalog.length);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      console.log(true);
    } else {
      document.exitFullscreen();
      console.log(false);
    }
  };

  const activeItem = catalog[activeIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-800 border-b border-gray-700 z-50">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          AuraMirror Live
        </h1>
        <button onClick={toggleFullscreen} className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Mirror Area */}
      <div
        ref={containerRef}
        className="flex-grow relative bg-black overflow-hidden flex items-center justify-center"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-xl font-medium text-gray-300">Initializing AI Models...</p>
          </div>
        )}

        {/* Video Feed */}
        <Webcam
          ref={webcamRef}
          onUserMedia={handleVideoLoad}
          className="w-full h-full object-cover mirror-flip"
          style={{ transform: 'scaleX(-1)' }} // Mirror effect
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "user"
          }}
        />

        {/* Dynamic Clothing Overlay */}
        {isLoaded && poseLandmarks && activeItem && (
          <ClothingOverlay
            poseLandmarks={poseLandmarks}
            activeItem={activeItem}
            videoWidth={videoDimensions.width}
            videoHeight={videoDimensions.height}
          />
        )}

        {/* UI Overlay - Catalog Controls */}
        <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center">

          {activeItem && (
             <div className="mb-6 text-center">
               <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{activeItem.name}</h2>
               <p className="text-xl text-blue-400 font-medium drop-shadow-md">${activeItem.price}</p>
             </div>
          )}

          <div className="flex items-center gap-6">
            <button
              onClick={prevItem}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition group"
            >
              <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Catalog Carousel */}
            <div className="flex gap-4 overflow-x-auto p-4 snap-x hide-scrollbar max-w-2xl">
              {catalog.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl p-2 cursor-pointer transition-all snap-center ${
                    index === activeIndex
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/50 scale-110 border-2 border-white'
                      : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ))}
            </div>

            <button
              onClick={nextItem}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition group"
            >
              <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Mirror;
