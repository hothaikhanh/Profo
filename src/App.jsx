import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Page from "./components/Page";

import { Environment, OrbitControls, Html, Backdrop, PerspectiveCamera, CameraControls } from "@react-three/drei";
import { Suspense } from "react";

import "./App.scss";

function App() {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");
    let [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
    let [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 });

    return (
        <div id="canvas-container">
            <Canvas>
                {/* <PerspectiveCamera
                    makeDefault
                    fov={75}
                    position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
                    rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
                /> */}

                {/* PAGE1 */}
                <PerspectiveCamera makeDefault position={[-2.7, 0.6, 1.6]} fov={75} rotation={[0.0, 1.2, 0.0]} />

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

                    <primitive scale={1} position={[0, -3, 0]} object={computers.scene} />

                    {/* <OrbitControls zoom0={true}></OrbitControls> */}
                </Suspense>

                <Html
                    occlude="blending"
                    scale={0.038}
                    transform
                    position={[-3.24, 0.6, 1.36]}
                    rotation={[0.0, 1.22, 0.0]}
                    fov={75}
                >
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
