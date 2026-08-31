import React from "react";

interface BackgroundVideoProps {
  youtubeId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  youtubeId = "2kM6u8jF3gQ", // The original Haunted Garden video
  className = "",
  style = {},
}) => {
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
      <iframe
        key={youtubeId}
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&showinfo=0&fs=0&enablejsapi=1`}
        title="The Haunted Garden Atmospheric Background"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "140vw",
          height: "140vh",
          minWidth: "100%",
          minHeight: "100%",
          transform: "translate(-50%, -50%)",
          border: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
