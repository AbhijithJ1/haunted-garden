import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Play } from 'lucide-react';
import { BentoTilt } from '../BentoTilt';
import { CONJURING_RELICS, UNIVERSES_DATA } from '../../data/universes';
import { RelicArtifact, UniverseInfo } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface ConjuringVaultProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const ConjuringVault: React.FC<ConjuringVaultProps> = ({ onOpenTrailer }) => {
  const universe = UNIVERSES_DATA.find((u) => u.id === 'conjuring')!;
  const [selectedRelic, setSelectedRelic] = useState<RelicArtifact>(CONJURING_RELICS[0]);
  const [uvActive, setUvActive] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // 3D Relic Scene
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.6,
      metalness: 0.3,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.4;
    artifactGroup.add(pedestal);

    let mainMesh: THREE.Group;

    if (selectedRelic.modelType === 'doll_case') {
      const caseGroup = new THREE.Group();
      const frameGeo = new THREE.BoxGeometry(1.3, 2.2, 1.3);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x22110c,
        wireframe: true,
        roughness: 0.8,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      caseGroup.add(frame);

      const glassGeo = new THREE.BoxGeometry(1.28, 2.18, 1.28);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: uvActive ? 0x6b21a8 : 0xdddddd,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        transmission: 0.9,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      caseGroup.add(glass);

      const dollGeo = new THREE.CylinderGeometry(0.28, 0.35, 1.1, 16);
      const dollMat = new THREE.MeshStandardMaterial({
        color: uvActive ? 0x991b1b : 0x9ca3af,
        roughness: 0.9,
      });
      const doll = new THREE.Mesh(dollGeo, dollMat);
      doll.position.y = -0.15;
      caseGroup.add(doll);

      const headGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const head = new THREE.Mesh(headGeo, dollMat);
      head.position.y = 0.6;
      caseGroup.add(head);

      mainMesh = caseGroup;
    } else if (selectedRelic.modelType === 'music_box') {
      const boxGroup = new THREE.Group();
      const boxGeo = new THREE.BoxGeometry(1.5, 0.9, 1.1);
      const boxMat = new THREE.MeshStandardMaterial({
        color: uvActive ? 0x4c1d95 : 0x2a1a12,
        roughness: 0.4,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      boxGroup.add(box);

      const mirrorGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.04, 32);
      const mirrorMat = new THREE.MeshStandardMaterial({
        color: uvActive ? 0xa855f7 : 0xd1d5db,
        metalness: 0.9,
        roughness: 0.1,
      });
      const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
      mirror.rotation.x = Math.PI / 2;
      mirror.position.z = 0.6;
      boxGroup.add(mirror);

      mainMesh = boxGroup;
    } else {
      const crossGroup = new THREE.Group();
      const vGeo = new THREE.BoxGeometry(0.25, 2.0, 0.15);
      const hGeo = new THREE.BoxGeometry(1.2, 0.25, 0.15);
      const crossMat = new THREE.MeshStandardMaterial({
        color: uvActive ? 0x991b1b : 0x451a03,
        roughness: 0.5,
        metalness: 0.5,
      });
      const vBeam = new THREE.Mesh(vGeo, crossMat);
      const hBeam = new THREE.Mesh(hGeo, crossMat);
      hBeam.position.y = 0.35;
      crossGroup.add(vBeam);
      crossGroup.add(hBeam);
      mainMesh = crossGroup;
    }

    artifactGroup.add(mainMesh);

    const ambientLight = new THREE.AmbientLight(uvActive ? 0x1e1035 : 0x151518, 1.8);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(uvActive ? 0x7c3aed : 0xdc2626, uvActive ? 5 : 2.5, 12, Math.PI / 4, 0.6);
    spotLight.position.set(2, 4, 3);
    scene.add(spotLight);

    let animationFrameId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      artifactGroup.rotation.y += deltaX * 0.008;
      artifactGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      if (!isDragging) {
        artifactGroup.rotation.y += 0.004;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedRelic, uvActive]);

  const toggleUV = () => {
    const nextState = !uvActive;
    setUvActive(nextState);
    soundEngine.playUVToggle(nextState);
  };

  return (
    <section
      id="chapter-conjuring"
      className="relative min-h-screen w-full bg-[#040406] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Scary Film Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040406] via-[#040406]/90 to-[#040406]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — IMMERSIVE INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-3">
              CHAPTER 01 // THE WARREN OCCULT ARCHIVE
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              THE CONJURING
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              THE HOUSE REMEMBERS.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3.5 px-6 bg-white text-[#040406] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — SCENE REVEAL & ARTIFACT VAULT (Bento Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Left: 3D Relic Stage with BentoTilt */}
          <div className="lg:col-span-7 flex flex-col">
            <BentoTilt tiltFactor={6}>
              <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl bg-[#08080c] border border-white/15 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                <div ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

                {/* Viewport Meta */}
                <div className="relative z-10 flex items-center justify-between pointer-events-none font-mono text-[10px] text-white/40 uppercase tracking-editorial">
                  <span>CONSECRATED RELIC // ORBITAL 3D INSPECTION</span>
                  <span>STATUS: {selectedRelic.containmentStatus}</span>
                </div>

                {/* Viewport Actions */}
                <div className="relative z-10 flex items-center justify-between mt-auto pt-4 pointer-events-auto">
                  <button
                    onClick={toggleUV}
                    className={`flex items-center gap-2 px-4 py-2 font-mono text-[10px] tracking-editorial uppercase transition-all rounded-sm cursor-pointer border ${
                      uvActive
                        ? 'bg-purple-950/80 border-purple-500/80 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                        : 'bg-black/70 border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {uvActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{uvActive ? 'UV FLUORESCENCE ACTIVE' : 'EXPOSE LATENT SIGILS'}</span>
                  </button>

                  <span className="font-mono text-[9px] text-white/30 hidden sm:inline uppercase">
                    DRAG TO ROTATE ARTIFACT
                  </span>
                </div>
              </div>
            </BentoTilt>

            {/* Relic Selector Tabs */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {CONJURING_RELICS.map((relic) => {
                const isCurrent = selectedRelic.id === relic.id;
                return (
                  <button
                    key={relic.id}
                    onClick={() => {
                      setSelectedRelic(relic);
                      soundEngine.playCardDraw();
                    }}
                    className={`p-3.5 text-left border rounded-sm transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white/[0.08] border-white/40 text-white shadow-lg'
                        : 'bg-black/40 border-white/[0.06] text-white/40 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-white/30 block">CASE #{relic.caseYear}</span>
                    <span className="font-cinzel font-bold text-xs truncate block mt-0.5">{relic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Relic Forensics Lore */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-editorial block mb-2">
                ORIGIN: {selectedRelic.origin}
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {selectedRelic.name}
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                {selectedRelic.description}
              </p>
            </div>

            <div className="p-6 bg-[#08080c] border border-white/10 rounded-xl">
              <span className="font-mono text-[10px] text-red-400 tracking-editorial uppercase block mb-2">
                CONSECRATED LATIN INSCRIPTION
              </span>
              <p className="font-cinzel italic text-sm text-white/90">
                "{selectedRelic.sigilLatin}"
              </p>
              <p className="font-grotesk text-xs text-white/40 mt-2 font-light">
                {selectedRelic.sigilTranslation}
              </p>

              {uvActive && (
                <div className="mt-4 pt-4 border-t border-purple-500/20 text-purple-300 font-mono text-xs">
                  <span className="text-[10px] text-purple-400/60 block uppercase mb-1">LATENT OCCULT REVELATION:</span>
                  {selectedRelic.uvSecretMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-6">
            WHAT MAKES IT TERRIFYING
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {universe.whatMakesItTerrifying.map((point, idx) => (
              <div key={idx} className="flex flex-col border-t border-white/[0.08] pt-6">
                <span className="font-mono text-xs text-white/30 mb-3">0{idx + 1}</span>
                <p className="font-cinzel text-base sm:text-lg text-white/90 leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
