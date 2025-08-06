// src/components/LightingTypes.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SpinningBox() {
  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={boxRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function LightingScene() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      {/* Ambient Light (soft light everywhere) */}
      <ambientLight intensity={0.3} />

      {/* Directional Light (like the sun) */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="blue" />

      {/* Point Light (light bulb) */}
      <pointLight position={[-5, 5, 0]} intensity={0.7} color="lightblue" />

      {/* Spot Light (focused) */}
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={0.2}
        intensity={1}
        castShadow
        color="orange"
      />

      {/* Hemisphere Light (sky vs ground blend) */}
      <hemisphereLight skyColor={"blue"} groundColor={"green"} intensity={0.3} />

      {/* Object to observe lighting */}
      <SpinningBox />

      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="grey" />
      </mesh>
    </Canvas>
  );
}

export default LightingScene;
