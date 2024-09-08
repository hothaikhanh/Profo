import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls, Html, PerspectiveCamera, CameraControls } from "@react-three/drei";

import { useState, useRef, Suspense } from "react";
import Page from "./components/Page/Page";
import AboutPage from "./components/AboutPage/AboutPage";

import "./App.scss";

function App() {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");

    const default_position = {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
    };
    const page_1 = {
        positionX: -2.7,
        positionY: 0.61,
        positionZ: 1.54,
        targetX: -8.3,
        targetY: 0.6,
        targetZ: -0.4,

        // positionX: -2.34,
        // positionY: 0.49,
        // positionZ: 1.66,
        // targetX: -7.42,
        // targetY: 1.06,
        // targetZ: -0.08,
    };
    // const page_2_position = {
    //     position: [-2.7, 0.61, 1.54],
    //     target: [-8.3, 0.6, -0.4],
    // };
    // const page_3_position = {
    //     position: [-2.7, 0.61, 1.54],
    //     target: [-8.3, 0.6, -0.4],
    // };

    let [cameraSettings, setCameraSettings] = useState({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
    });

    let [objectSettings, setObjectSettings] = useState({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
    });

    const [currentCameraSettings, setCurrentCameraSettings] = useState(page_1);

    let [clicked, setClicked] = useState(false);
    let cameraControlRef = useRef(null);
    //Insert this into the element to active control board
    // position={[objectPosition.x, objectPosition.y, objectPosition.z]}
    // rotation={[objectRotation.x, objectRotation.y, objectRotation.z]}

    //DEV MODE
    // useEffect(() => {
    //     cameraControlRef.current?.setLookAt(
    //         cameraSettings.positionX,
    //         cameraSettings.positionY,
    //         cameraSettings.positionZ,
    //         cameraSettings.targetX,
    //         cameraSettings.targetY,
    //         cameraSettings.targetZ,
    //         true
    //     );
    //     console.log(cameraControlRef.current);
    // }, [cameraSettings]);

    const DEG45 = Math.PI / 4;

    return (
        <div id="canvas-container">
            <Canvas>
                {/* <CameraControls enabled={true} makeDefault ref={cameraControlRef} /> */}
                <ScrollCamera cameraSettings={currentCameraSettings} />
                {/* <PerspectiveCamera position={[0, 0, 0]} /> */}

                <OrbitControls makeDefault></OrbitControls>

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
                </Suspense>

                <Html
                    occlude="blending"
                    scale={0.038}
                    transform
                    position={[-3.24, 0.61, 1.36]}
                    rotation={[0.0, 1.22, 0.0]}
                    fov={75}
                >
                    <Page title={"Info"}>
                        <AboutPage></AboutPage>
                    </Page>
                </Html>
            </Canvas>

            {/* <ControlBoard name="Camera controller" property={cameraSettings} setProperty={setCameraSettings} />
            <ControlBoard name="Secondary Control Board" property={objectSettings} setProperty={setObjectSettings} /> */}
        </div>
    );
}

export default App;

function ControlBoard({ name, property, setProperty }) {
    return (
        <div className="controller">
            <div>{name}</div>
            <p>Position</p>
            <PropController property={property} name={name} setProp={setProperty} modifyKey="positionX" />
            <PropController property={property} name={name} setProp={setProperty} modifyKey="positionY" />
            <PropController property={property} name={name} setProp={setProperty} modifyKey="positionZ" />

            <p>Target</p>
            <PropController property={property} name={name} setProp={setProperty} modifyKey="targetX" />
            <PropController property={property} name={name} setProp={setProperty} modifyKey="targetY" />
            <PropController property={property} name={name} setProp={setProperty} modifyKey="targetZ" />
            <button
                onClick={() => {
                    let res = "";

                    for (const [key, value] of Object.entries(property)) {
                        res += `${key}: ${value.toFixed(2)},`;
                    }
                    navigator.clipboard.writeText(res);
                }}
            >
                Copy
            </button>
        </div>
    );
}

function PropController({ property, modifyKey, setProp, name }) {
    let [currentAmount, setCurrentAmount] = useState(0.1);

    let changeProp = (actionType) => {
        if (actionType == "add") {
            setProp({
                ...property,
                [modifyKey]: property[modifyKey] + currentAmount,
            });
        } else if (actionType == "sub") {
            setProp({
                ...property,
                [modifyKey]: property[modifyKey] - currentAmount,
            });
        }
    };

    return (
        <>
            <div className="section">
                <div className="value">
                    <label>{modifyKey}</label>
                    <span>{property[modifyKey].toFixed(2)}</span>
                </div>
                <button onClick={() => changeProp("add")}>+</button>
                <button onClick={() => changeProp("sub")}>-</button>

                <label>0.01</label>
                <input type="radio" name={`${name}_${modifyKey}`} onChange={() => setCurrentAmount(0.01)} />

                <label>0.1</label>
                <input
                    type="radio"
                    name={`${name}_${modifyKey}`}
                    defaultChecked
                    onChange={() => setCurrentAmount(0.1)}
                />

                <label> 1</label>
                <input type="radio" name={`${name}_${modifyKey}`} onChange={() => setCurrentAmount(1)} />
            </div>
        </>
    );
}

function ScrollCamera({ cameraSettings }) {
    const vec = new THREE.Vector3();
    useFrame((state) => {
        state.camera.lookAt(cameraSettings.targetX, cameraSettings.targetY, cameraSettings.targetZ);
        state.camera.position.lerp(
            vec.set(cameraSettings.positionX, cameraSettings.positionY, cameraSettings.positionZ),
            0.02
        );
        state.camera.updateProjectionMatrix();
    });

    return null;
}
