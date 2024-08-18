import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import "./App.scss";

function App() {
    const gltf = useLoader(GLTFLoader, "./src/assets/computer-model/scene.gltf");

    return (
        <div id="canvas-container">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight color="green" intensity={Math.PI} />
                    <spotLight
                        color="green"
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        decay={0}
                        intensity={Math.PI}
                    />
                    <pointLight color="green" position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                    <primitive scale={0.1} position={[0, -28, -25]} object={gltf.scene} />
                    <OrbitControls zoom0={true}></OrbitControls>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
