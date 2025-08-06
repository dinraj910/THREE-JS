import React,{Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function WoodenGate(){
    const gltf = useGLTF("/models/wooden_chair.glb");
    return <primitive object={gltf.scene} scale={0.5}/>
}

function ModelLoaderScene(){
    return(
        <Canvas camera={{ position: [3,2,5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2,5,2]} intensity={1} />
            <Suspense fallback={null}>
                <WoodenGate />
            </Suspense>
            <OrbitControls />
        </Canvas>
    )
}

export default ModelLoaderScene;
