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
    let [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
    let [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 });

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

            <ControlBoard
                name="Camera Control"
                objectPosition={cameraPosition}
                setObjectPosition={setCameraPosition}
                objectRotation={cameraRotation}
                setObjectRotation={setCameraRotation}
            />
        </div>
    );
}

export default App;

function ControlBoard({ name, objectPosition, setObjectPosition, objectRotation, setObjectRotation }) {
    return (
        <div className="controller">
            <div>{name}</div>
            <p>Position</p>
            <PropController property={objectPosition} type="position" setProp={setObjectPosition} axis="x" />
            <PropController property={objectPosition} type="position" setProp={setObjectPosition} axis="y" />
            <PropController property={objectPosition} type="position" setProp={setObjectPosition} axis="z" />
            <button
                onClick={() => {
                    navigator.clipboard.writeText([
                        objectPosition.x.toFixed(2),
                        objectPosition.y.toFixed(2),
                        objectPosition.z.toFixed(2),
                    ]);
                }}
            >
                Copy
            </button>

            <p>Rotation</p>
            <PropController property={objectRotation} type="rotation" setProp={setObjectRotation} axis="x" />
            <PropController property={objectRotation} type="rotation" setProp={setObjectRotation} axis="y" />
            <PropController property={objectRotation} type="rotation" setProp={setObjectRotation} axis="z" />
            <button
                onClick={() => {
                    navigator.clipboard.writeText([
                        objectRotation.x.toFixed(2),
                        objectRotation.y.toFixed(2),
                        objectRotation.z.toFixed(2),
                    ]);
                }}
            >
                Copy
            </button>
        </div>
    );
}

function PropController({ property, axis, setProp, type }) {
    let [currentAmount, setCurrentAmount] = useState(0.1);

    let changeProp = (type, newValue = 0) => {
        if (type == "add") {
            setProp({
                ...property,
                [axis]: property[axis] + currentAmount,
            });
        } else if (type == "sub") {
            setProp({
                ...property,
                [axis]: property[axis] - currentAmount,
            });
        } else if (type == "change") {
            setProp({
                ...property,
                [axis]: parseInt(newValue),
            });
        }
    };

    return (
        <>
            <div className="section">
                <div className="value">
                    <label>{axis}</label>
                    <input type="text" value={property[axis].toFixed(2)} />
                </div>
                <button onClick={() => changeProp("add")}>+</button>
                <button onClick={() => changeProp("sub")}>-</button>

                <label>0.01</label>
                <input type="radio" name={`${type}_${axis}`} onChange={() => setCurrentAmount(0.01)} />

                <label>0.1</label>
                <input type="radio" name={`${type}_${axis}`} defaultChecked onChange={() => setCurrentAmount(0.1)} />

                <label> 1</label>
                <input type="radio" name={`${type}_${axis}`} onChange={() => setCurrentAmount(1)} />
            </div>
        </>
    );
}
