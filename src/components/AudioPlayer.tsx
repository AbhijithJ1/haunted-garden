import React, { useEffect, useRef } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const YOUTUBE_AUDIO_ID = "IJU9JNnfUJE"; // User-requested voice audio

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    try {
      const muteCommand = isPlaying
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}';
      iframe.contentWindow.postMessage(muteCommand, "*");

      const playCommand = isPlaying
        ? '{"event":"command","func":"playVideo","args":""}'
        : '{"event":"command","func":"pauseVideo","args":""}';
      iframe.contentWindow.postMessage(playCommand, "*");
    } catch {
      // Ignored
    }
  }, [isPlaying]);

  return (
    <div
      className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_AUDIO_ID}?enablejsapi=1&autoplay=1&mute=${isPlaying ? "0" : "1"}&loop=1&playlist=${YOUTUBE_AUDIO_ID}&playsinline=1&controls=0`}
        title="The Haunted Garden Voice Audio"
        allow="autoplay; encrypted-media"
        className="w-1 h-1"
      />
    </div>
  );
};

export default AudioPlayer;
