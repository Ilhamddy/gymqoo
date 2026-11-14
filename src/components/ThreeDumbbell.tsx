"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Rotate3d } from "lucide-react";

export default function ThreeDumbbell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Materials
    // Ergonomic knurled chrome handle
    const chromeHandleMat = new THREE.MeshStandardMaterial({
      color: 0xdedede,
      metalness: 0.96,
      roughness: 0.14,
    });

    const knurledBandMat = new THREE.MeshStandardMaterial({
      color: 0x999999,
      metalness: 0.9,
      roughness: 0.35,
    });

    // Matte vulcanized rubber hex heads
    const rubberHexMat = new THREE.MeshStandardMaterial({
      color: 0x1e2026,
      metalness: 0.2,
      roughness: 0.42,
    });

    // Beveled hex rims & core
    const beveledRimMat = new THREE.MeshStandardMaterial({
      color: 0x15161b,
      metalness: 0.35,
      roughness: 0.3,
    });

    // Athletic Neon Accent
    const neonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      emissive: 0xccff00,
      emissiveIntensity: 0.7,
      metalness: 0.1,
      roughness: 0.2,
    });

    // Inner iron ring
    const innerSteelMat = new THREE.MeshStandardMaterial({
      color: 0x555866,
      metalness: 0.85,
      roughness: 0.25,
    });

    // 4. Constructing the Realistic Hex Dumbbell
    const dumbbellGroup = new THREE.Group();

    // A. Contoured Ergonomic Center Grip
    // Center barrel (slightly thicker at center)
    const handleCenterGeo = new THREE.CylinderGeometry(0.1, 0.088, 0.65, 32);
    handleCenterGeo.rotateZ(Math.PI / 2);
    const handleCenter = new THREE.Mesh(handleCenterGeo, chromeHandleMat);
    handleCenter.castShadow = true;
    dumbbellGroup.add(handleCenter);

    // Knurling pattern bands on grip
    [-0.18, 0.18].forEach((xPos) => {
      const bandGeo = new THREE.CylinderGeometry(0.096, 0.096, 0.22, 32);
      bandGeo.rotateZ(Math.PI / 2);
      const band = new THREE.Mesh(bandGeo, knurledBandMat);
      band.position.x = xPos;
      dumbbellGroup.add(band);
    });

    // Flange collars (stops where handle enters weight heads)
    [-0.52, 0.52].forEach((xPos) => {
      const flangeGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32);
      flangeGeo.rotateZ(Math.PI / 2);
      const flange = new THREE.Mesh(flangeGeo, innerSteelMat);
      flange.position.x = xPos;
      dumbbellGroup.add(flange);
    });

    // B. Hexagonal Weight Heads on Both Ends
    const sides = [-1, 1]; // Left and Right

    sides.forEach((side) => {
      const headCenterDistance = side * 0.95;

      // Main Hexagonal Head (6 radial segments)
      const hexGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.68, 6);
      hexGeo.rotateZ(Math.PI / 2);
      const hexMesh = new THREE.Mesh(hexGeo, rubberHexMat);
      hexMesh.position.x = headCenterDistance;
      hexMesh.castShadow = true;
      hexMesh.receiveShadow = true;
      dumbbellGroup.add(hexMesh);

      // Outer Beveled Face
      const outerBevelGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.12, 6);
      outerBevelGeo.rotateZ(Math.PI / 2);
      const outerBevel = new THREE.Mesh(outerBevelGeo, beveledRimMat);
      outerBevel.position.x = side * (0.95 + 0.38);
      dumbbellGroup.add(outerBevel);

      // Inner Beveled Face (towards handle)
      const innerBevelGeo = new THREE.CylinderGeometry(0.62, 0.55, 0.12, 6);
      innerBevelGeo.rotateZ(Math.PI / 2);
      const innerBevel = new THREE.Mesh(innerBevelGeo, beveledRimMat);
      innerBevel.position.x = side * (0.95 - 0.38);
      dumbbellGroup.add(innerBevel);

      // Outer Accent Ring (Gymqoo Neon Line)
      const accentRingGeo = new THREE.TorusGeometry(0.48, 0.02, 16, 6);
      accentRingGeo.rotateY(Math.PI / 2);
      const accentRing = new THREE.Mesh(accentRingGeo, neonAccentMat);
      accentRing.position.x = side * (0.95 + 0.44);
      dumbbellGroup.add(accentRing);

      // Embossed Center Cap with Weight Bolt
      const capGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24);
      capGeo.rotateZ(Math.PI / 2);
      const capMesh = new THREE.Mesh(capGeo, innerSteelMat);
      capMesh.position.x = side * (0.95 + 0.45);
      dumbbellGroup.add(capMesh);

      // Center Hex Bolt
      const boltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 6);
      boltGeo.rotateZ(Math.PI / 2);
      const boltMesh = new THREE.Mesh(boltGeo, chromeHandleMat);
      boltMesh.position.x = side * (0.95 + 0.47);
      dumbbellGroup.add(boltMesh);
    });

    // Set initial natural athletic angle
    dumbbellGroup.rotation.x = 0.35;
    dumbbellGroup.rotation.y = -0.45;
    dumbbellGroup.rotation.z = 0.2;
    scene.add(dumbbellGroup);

    // 5. Studio Lighting Setup
    // Generous ambient light for crisp visibility in both Light and Dark modes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light from top-front
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light from bottom-left
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    // Athletic Neon Rim Light (Lime Volt)
    const neonRimLight = new THREE.PointLight(0xccff00, 4.5, 8);
    neonRimLight.position.set(-2.5, 1.5, 2);
    scene.add(neonRimLight);

    // Cool Cyan Rim Light (for specular edge contrast)
    const cyanRimLight = new THREE.PointLight(0x00f0ff, 3.2, 7);
    cyanRimLight.position.set(3, -2, 2.5);
    scene.add(cyanRimLight);

    // 6. Interactive Drag & Momentum Control
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let rotationX = 0.35;
    let rotationY = -0.45;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = clientX;
      prevMouseY = clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      velocityX = deltaX * 0.007;
      velocityY = deltaY * 0.007;

      rotationY += velocityX;
      rotationX += velocityY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    // Mouse Listeners on Container
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    // Touch Listeners for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onPointerUp();

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        // Friction decay for velocity
        velocityX *= 0.94;
        velocityY *= 0.94;

        rotationY += velocityX;
        rotationX += velocityY;

        // Continuous smooth auto-rotation
        rotationY += 0.004;

        // Gentle floating bob
        dumbbellGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.08;
        dumbbellGroup.rotation.z = 0.2 + Math.sin(elapsedTime * 1.1) * 0.05;
      }

      dumbbellGroup.rotation.y = rotationY;
      dumbbellGroup.rotation.x = rotationX;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Resize Observer
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth || 300;
      const newHeight = containerRef.current.clientHeight || 350;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      handleCenterGeo.dispose();
      chromeHandleMat.dispose();
      knurledBandMat.dispose();
      rubberHexMat.dispose();
      beveledRimMat.dispose();
      neonAccentMat.dispose();
      innerSteelMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center select-none">
      {/* Radial backlight glow for both Light & Dark mode */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-lime-500/15 dark:bg-brand-neon/15 blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-cyan-500/10 dark:bg-brand-cyan/10 blur-2xl pointer-events-none -translate-x-12 translate-y-12" />

      {/* Canvas container with active drag cursor */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-none"
      />

      {/* Floating Specification Pills */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/80 dark:bg-surface/80 border border-slate-200 dark:border-borderDark text-slate-800 dark:text-zinc-200 shadow-sm backdrop-blur-sm">
          HEX 20 KG • PRO RUBBER
        </span>
      </div>

      {/* Bottom Interactive Hint */}
      <div className="absolute bottom-3 text-xs font-mono tracking-wider text-slate-500 dark:text-zinc-400 pointer-events-none flex items-center gap-2 bg-white/80 dark:bg-surface/70 px-3 py-1.5 rounded-full border border-slate-200 dark:border-borderDark/60 backdrop-blur-sm shadow-sm">
        <Rotate3d className={`w-3.5 h-3.5 text-lime-600 dark:text-brand-neon ${isInteracting ? "animate-spin" : ""}`} />
        <span>Geser / Drag untuk memutar 3D</span>
      </div>
    </div>
  );
}
