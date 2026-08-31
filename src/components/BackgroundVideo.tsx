import React, { useRef, useEffect } from "react";

interface BackgroundVideoProps {
  videoSrc?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoSrc = "/videos/feature-2.mp4",
  className = "",
  style = {},
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("click", handleInteraction);
          window.removeEventListener("scroll", handleInteraction);
          window.removeEventListener("touchstart", handleInteraction);
        };
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("scroll", handleInteraction, { once: true });
        window.addEventListener("touchstart", handleInteraction, { once: true });
      });
    }
  }, [videoSrc]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        backgroundColor: "#030306",
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* 
        Native Hosted Local Video Background 
        Guaranteed: Zero YouTube bot checks, Zero watermarks, Zero play buttons, Zero controls
      */}
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
};

export default BackgroundVideo;
