import React from 'react';

interface CleanVideoBackgroundProps {
  youtubeId: string;
  posterImage?: string;
  title: string;
  isActive?: boolean;
}

export const CleanVideoBackground: React.FC<CleanVideoBackgroundProps> = ({
  youtubeId,
  title,
  isActive = true,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none bg-black">
      {/* Direct Full-Bleed Live Video Clip (No placeholder / fake image) */}
      {isActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&cc_load_policy=0&disablekb=1`}
            title={`${title} Stream`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-[130%] h-[130%] -top-[15%] -left-[15%] absolute pointer-events-none border-0 will-change-transform transform-gpu bg-black"
          />
        </div>
      )}
    </div>
  );
};
