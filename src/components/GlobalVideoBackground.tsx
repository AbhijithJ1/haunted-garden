import React, { useRef, useEffect } from "react";

interface GlobalVideoBackgroundProps {
  videoSrc?: string;
}

const DEFAULT_HAUNTED_GARDEN_VIDEO =
  "https://res.cloudinary.com/drql9cjic/video/upload/v1779364541/Fairy_plain_with_fireflies_and_202605201940_yc5vnp.mp4";

export const GlobalVideoBackground: React.FC<GlobalVideoBackgroundProps> = ({
  videoSrc = DEFAULT_HAUNTED_GARDEN_VIDEO,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const onFirstInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener("click", onFirstInteraction);
            window.removeEventListener("scroll", onFirstInteraction);
            window.removeEventListener("touchstart", onFirstInteraction);
          };
          window.addEventListener("click", onFirstInteraction, { once: true });
          window.addEventListener("scroll", onFirstInteraction, { once: true });
          window.addEventListener("touchstart", onFirstInteraction, { once: true });
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }
  }, [videoSrc]);

  // Seamless Loop: jumps 0.3s before end to guarantee zero black frame/ending glitch
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (video.currentTime >= video.duration - 0.35) {
      video.currentTime = 0.05;
      video.play().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none bg-[#030306] z-0">
      {/* 100% Native HTML5 Video — Zero YouTube Chrome, Zero Play Buttons, Zero Controls */}
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
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
};

export default GlobalVideoBackground;
