import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Page from "./components/Page";

import { Environment, OrbitControls, Html, Backdrop } from "@react-three/drei";
import { Suspense } from "react";

import "./App.scss";

function App() {
    // const computer = useLoader(GLTFLoader, "./src/assets/computer_model/scene.gltf");
    // const desk = useLoader(GLTFLoader, "./src/assets/metal_desk/scene.gltf");
    // const lamp = useLoader(GLTFLoader, "./src/assets/table_lamp/scene.gltf");
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");

    const vertices = new Float32Array([
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
    ]);
    return (
        <div id="canvas-container">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight color="grey" intensity={Math.PI} />
                    <spotLight
                        color="white"
                        position={[0, 5, 0]}
                        angle={1}
                        penumbra={0.4}
                        decay={0.1}
                        intensity={Math.PI * 2}
                    />
                    {/* <pointLight color="white" position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
                    <primitive scale={1} position={[0, -3, 0]} object={computers.scene} />
                    {/* <primitive scale={80} position={[0, -65, -10]} object={desk.scene} />
                    <primitive
                        scale={4}
                        position={[-35, -27, 5]}
                        rotation={[Math.PI / 1, -5, 3.14]}
                        object={lamp.scene}
                    /> */}

                    <OrbitControls zoom0={true}></OrbitControls>
                </Suspense>

                <Html occlude="blending" scale={0.3} transform position={[-3.21, 0.6, 1.28]} rotation={[0, 1.2, 0]}>
                    <Page></Page>
                </Html>
            </Canvas>
        </div>
    );
}

export default App;
