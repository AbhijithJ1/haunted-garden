import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Activity, Compass, Flame } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { soundEngine } from '../audio/soundEngine';
import { UniverseInfo } from '../types';

interface HUDOverlayProps {
  currentUniverse: UniverseInfo;
  isMuted: boolean;
  onToggleSound: () => void;
  heartRate: number;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  currentUniverse,
  isMuted,
  onToggleSound,
  heartRate,
}) => {
  const [resonance, setResonance] = useState(84.2);
  const [coords, setCoords] = useState({ lat: '41.7483° N', lng: '71.5831° W' }); // Rhode Island occult coordinates

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle fluctuations in supernatural resonance
      setResonance(prev => +(prev + (Math.random() * 1.6 - 0.8)).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Left Telemetry Tag */}
      <div className="fixed top-20 left-6 z-40 hidden lg:flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="font-bold">18.98 Hz INFRASOUND</span>
          <span className="text-white/30">|</span>
          <span className="text-red-500 font-bold">RESONANCE ACTIVE</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-0.5 text-[9px] font-mono text-white/40 tracking-wider">
          <span>LOC: {coords.lat} {coords.lng}</span>
          <span>•</span>
          <span>OCCULT: {resonance}%</span>
        </div>
      </div>

      {/* Bottom Right Floating Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Heartbeat Biometrics */}
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-sm bg-black/85 backdrop-blur-md border border-white/15 shadow-xl">
          <Activity className={`w-4 h-4 ${heartRate > 100 ? 'text-red-500 animate-pulse' : 'text-red-400'}`} />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase text-white/40 leading-none tracking-wider">BIOMETRIC</span>
            <span className="text-xs font-mono font-bold text-white leading-tight">
              {heartRate} <span className="text-[9px] font-normal text-white/50">BPM</span>
            </span>
          </div>
        </div>

        {/* Global Sound Switch & Spectrum Analyzer */}
        <button
          id="global-audio-toggle-btn"
          onClick={onToggleSound}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-sm border transition-all shadow-xl cursor-pointer ${
            isMuted
              ? 'bg-black/90 border-white/20 text-white/70 hover:text-white hover:border-white/40'
              : 'bg-white text-black border-white hover:bg-red-600 hover:text-white hover:border-red-600'
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-500" />
          ) : (
            <Volume2 className="w-4 h-4 animate-pulse" />
          )}

          <div className="flex flex-col text-left">
            <span className={`text-[9px] font-mono leading-none tracking-wider uppercase ${isMuted ? 'text-white/40' : 'text-current opacity-70'}`}>
              {isMuted ? 'AUDIO MUTED' : 'SPATIAL AUDIO'}
            </span>
            <span className="text-[11px] font-syne font-black leading-tight tracking-wider uppercase">
              {isMuted ? 'CLICK TO UNMUTE' : '18.98Hz INFRASOUND'}
            </span>
          </div>

          <AudioVisualizer isMuted={isMuted} color={isMuted ? '#ffffff' : '#dc2626'} />
        </button>
      </div>
    </>
  );
};
