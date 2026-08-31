import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeHorrorAtmosphereProps {
  scrollProgress?: number; // 0 to 1
}

export const ThreeHorrorAtmosphere: React.FC<ThreeHorrorAtmosphereProps> = ({
  scrollProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.035);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
    camera.position.set(0, 1.8, 12);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x080914, 2.5);
    scene.add(ambientLight);

    // Pale Moonlight
    const moonLight = new THREE.DirectionalLight(0x4a6288, 3.2);
    moonLight.position.set(10, 20, 15);
    scene.add(moonLight);

    // Occult Crimson Glow Light
    const occultLight = new THREE.PointLight(0x8b0e1a, 6, 25);
    occultLight.position.set(0, 1.5, 2);
    scene.add(occultLight);

    // 5. Procedural Dark Terrain with Occult Fissures
    const groundGeo = new THREE.PlaneGeometry(80, 80, 64, 64);
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist = Math.sqrt(vx * vx + vy * vy);
      const zWave =
        Math.sin(vx * 0.3) * 0.4 +
        Math.cos(vy * 0.25) * 0.45 +
        Math.sin(dist * 0.2) * 0.3;
      pos.setZ(i, zWave);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x05060a,
      roughness: 0.85,
      metalness: 0.2,
      wireframe: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    scene.add(ground);

    // 6. Gnarled Twisted Gothic Trees / Roots
    const treeGroup = new THREE.Group();
    const treeMat = new THREE.MeshStandardMaterial({
      color: 0x07080f,
      roughness: 0.9,
      metalness: 0.1,
    });

    const createBranch = (
      length: number,
      radius: number,
      depth: number,
      maxDepth: number
    ): THREE.Group => {
      const group = new THREE.Group();
      const cylinderGeo = new THREE.CylinderGeometry(
        radius * 0.65,
        radius,
        length,
        6
      );
      cylinderGeo.translate(0, length / 2, 0);
      const mesh = new THREE.Mesh(cylinderGeo, treeMat);
      group.add(mesh);

      if (depth < maxDepth) {
        const numBranches = depth === 0 ? 3 : 2;
        for (let b = 0; b < numBranches; b++) {
          const subBranch = createBranch(
            length * 0.72,
            radius * 0.65,
            depth + 1,
            maxDepth
          );
          subBranch.position.y = length * 0.85;
          subBranch.rotation.z = (Math.random() - 0.5) * 0.85 + (b === 0 ? 0.35 : -0.35);
          subBranch.rotation.y = (Math.random() - 0.5) * 1.2 + b * 1.8;
          subBranch.rotation.x = (Math.random() - 0.5) * 0.6;
          group.add(subBranch);
        }
      }
      return group;
    };

    // Plant 14 Gnarled Trees along the corridor
    const treePositions = [
      [-6, -1.2, 5],
      [6, -1.2, 4],
      [-8, -1.2, 0],
      [7.5, -1.2, -1],
      [-5.5, -1.2, -6],
      [6, -1.2, -7],
      [-9, -1.2, -12],
      [8.5, -1.2, -13],
      [-4, -1.2, -18],
      [5, -1.2, -19],
      [-7, -1.2, -25],
      [7, -1.2, -26],
      [-3, -1.2, -32],
      [3.5, -1.2, -33],
    ];

    treePositions.forEach(([tx, ty, tz]) => {
      const tree = createBranch(2.8 + Math.random() * 0.8, 0.28, 0, 3);
      tree.position.set(tx, ty, tz);
      tree.rotation.y = Math.random() * Math.PI * 2;
      treeGroup.add(tree);
    });
    scene.add(treeGroup);

    // 7. Floating Occult Relic Core (Faceted Polyhedron Crystal)
    const relicGroup = new THREE.Group();
    relicGroup.position.set(0, 1.4, 1.5);

    const relicGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const relicMat = new THREE.MeshStandardMaterial({
      color: 0x8b0e1a,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x3d050a,
      emissiveIntensity: 0.8,
      wireframe: false,
    });
    const relicMesh = new THREE.Mesh(relicGeo, relicMat);
    relicGroup.add(relicMesh);

    // Outer Occult Cage Wireframe
    const cageGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x8b0e1a,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    relicGroup.add(cageMesh);

    scene.add(relicGroup);

    // 8. 3,500 Swirling Atmospheric Spores & Fireflies
    const particleCount = 3500;
    const particleGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pCoords[idx] = (Math.random() - 0.5) * 40;
      pCoords[idx + 1] = Math.random() * 12 - 1.0;
      pCoords[idx + 2] = (Math.random() - 0.5) * 60;

      pSpeeds[idx] = (Math.random() - 0.5) * 0.008;
      pSpeeds[idx + 1] = Math.random() * 0.006 + 0.002;
      pSpeeds[idx + 2] = (Math.random() - 0.5) * 0.008;

      // Color variation: 75% pale blue-silver mist, 25% glowing ruby embers
      if (Math.random() > 0.3) {
        pColors[idx] = 0.5 + Math.random() * 0.2;
        pColors[idx + 1] = 0.6 + Math.random() * 0.2;
        pColors[idx + 2] = 0.8 + Math.random() * 0.2;
      } else {
        pColors[idx] = 0.9;
        pColors[idx + 1] = 0.15;
        pColors[idx + 2] = 0.2;
      }
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(pCoords, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    // Particle Material with Soft Glow
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 11. 60FPS Render Loop with Scroll Camera Descent
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Scroll descent: Camera plunges through the dark trees
      const p = scrollRef.current;
      const targetZ = 12 - p * 30; // camera travels 30 units deep into the forest!
      const targetY = 1.8 - p * 1.5;

      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.y += (targetY - camera.position.y) * 0.08;
      camera.position.x = mouseX * 1.5;
      camera.rotation.y = -mouseX * 0.12;
      camera.rotation.x = -mouseY * 0.08;

      // Rotate Occult Relic
      relicMesh.rotation.x = elapsed * 0.4;
      relicMesh.rotation.y = elapsed * 0.6;
      cageMesh.rotation.x = -elapsed * 0.25;
      cageMesh.rotation.y = -elapsed * 0.35;
      relicGroup.position.y = 1.4 + Math.sin(elapsed * 1.5) * 0.18;

      // Occult Light Pulse
      occultLight.intensity = 5 + Math.sin(elapsed * 2.5) * 2.5;
      occultLight.position.y = relicGroup.position.y;

      // Animate Particles / Spores
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += pSpeeds[idx] + Math.sin(elapsed * 0.5 + positions[idx + 1]) * 0.005;
        positions[idx + 1] += pSpeeds[idx + 1];
        positions[idx + 2] += pSpeeds[idx + 2];

        // Loop bounds
        if (positions[idx + 1] > 11) {
          positions[idx + 1] = -1.0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ background: "#020205" }}
      aria-hidden="true"
    />
  );
};

export default ThreeHorrorAtmosphere;
