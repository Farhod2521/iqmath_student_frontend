import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import CloseIcon from "../icons/close";

export default function VideoPlayer({
  url,
  title = "Cold Little Heart",
  onClose,
}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Track when user exits fullscreen with ESC or other means
  if (typeof window !== "undefined") {
    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 w-[460px] rounded-xl overflow-hidden shadow-lg z-50 bg-black text-white"
    >
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing
          controls={true}
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
          onProgress={({ played }) => setPlayed(played)}
        />
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button onClick={handleToggleFullscreen}>
            <Image
              src={"/icons/fullscreen.svg"}
              alt="toggle fullscreen"
              width={24}
              height={24}
            />
          </button>
          <button onClick={onClose}>
            <CloseIcon color="white" />
          </button>
        </div>
      </div>
      <div className="bg-black/60 p-2 backdrop-blur text-sm">
        <div className="w-full h-1 bg-gray-500 rounded">
          <div
            className="h-1 bg-white rounded"
            style={{ width: `${played * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
