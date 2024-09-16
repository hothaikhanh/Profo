import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls, Html, PerspectiveCamera, CameraControls } from "@react-three/drei";

import { useState, useRef, Suspense, useEffect } from "react";
import Page from "./components/Page/Page";
import AboutPage from "./components/AboutPage/AboutPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import ContactPage from "./components/ContactPage/ContactPage";
import "./App.scss";

function App() {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");
    const camera_positions = {
        default: { positionX: 0.0, positionY: 0.8, positionZ: 5.0, targetX: 0.0, targetY: 0.0, targetZ: 0.0 },
        page_1: { positionX: -2.7, positionY: 0.61, positionZ: 1.54, targetX: -8.3, targetY: 0.6, targetZ: -0.4 },
        page_2: {
            positionX: -2.0,
            positionY: -1.75,
            positionZ: -0.15,
            targetX: -2.57,
            targetY: -1.75,
            targetZ: -0.44,
        },
        page_3: { positionX: -0.72, positionY: 0.11, positionZ: -1.35, targetX: -1.27, targetY: 0.11, targetZ: -1.7 },
        page_4: { positionX: 0.26, positionY: -0.84, positionZ: -1.81, targetX: 0.26, targetY: -0.84, targetZ: -2.42 },
        page_5: { positionX: 1.56, positionY: -1.99, positionZ: -1.02, targetX: 1.76, targetY: -1.99, targetZ: -1.55 },
        page_6: { positionX: 2.64, positionY: -0.35, positionZ: 0.28, targetX: 3.46, targetY: -0.35, targetZ: -0.53 },
    };
    const screen_positions = {
        screen_1: { position: [-3.24, 0.61, 1.36], rotation: [0.0, 1.22, 0.0] },
        screen_2: { position: [-2.56, -1.76, -0.44], rotation: [0.0, 1.09, 0.0] },
        screen_3: { position: [-1.27, 0.11, -1.7], rotation: [0.0, 1.0, 0] },
        screen_4: { position: [0.26, -0.86, -2.42], rotation: [0.0, 0.0, 0.0] },
        screen_5: { position: [1.78, -2.0, -1.59], rotation: [0.0, -0.36, 0.0] },
        screen_6: { position: [2.98, -0.35, -0.09], rotation: [0.0, -0.8, 0.0] },
        screen_7: { position: [-3.8, 1.91, -2.48], rotation: [0.0, 0.54, 0.0] },
        screen_8: { position: [0.97, 1.9, -4.02], rotation: [0.0, -0.1, 0.0] },
        screen_9: { position: [4.52, 1.9, -1.46], rotation: [0.0, -1.05, 0.0] },
    };
    const [currentCameraSettings, setCurrentCameraSettings] = useState(camera_positions.default);
    const cameraControlRef = useRef();

    //DEV TOOLS
    const devMode = false;
    const allowMouse = true;
    const [devCameraSettings, setDevCameraSettings] = useState(currentCameraSettings);
    const [objectSettings, setObjectSettings] = useState({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
    });
    const devObjectPosition = [objectSettings.positionX, objectSettings.positionY, objectSettings.positionZ];
    const devObjectRotation = [objectSettings.targetX, objectSettings.targetY, objectSettings.targetZ];
    //DEV TOOLS

    function updateCamera(newSettings) {
        cameraControlRef.current.setLookAt(
            newSettings.positionX,
            newSettings.positionY,
            newSettings.positionZ,
            newSettings.targetX,
            newSettings.targetY,
            newSettings.targetZ,
            true
        );
    }

    return (
        <div id="canvas-container">
            <Canvas>
                <CameraControls
                    enabled={true}
                    makeDefault
                    ref={cameraControlRef}
                    mouseButtons={{
                        left: allowMouse ? 1 : null,
                        right: allowMouse ? 2 : null,
                        wheel: allowMouse ? 8 : null,
                        middle: allowMouse ? 8 : null,
                    }}
                />

                <ambientLight color="grey" intensity={Math.PI} />
                <spotLight
                    color="green"
                    position={[0, 5, 0]}
                    angle={1}
                    penumbra={0.4}
                    decay={0.1}
                    intensity={Math.PI * 2}
                />
                <Suspense fallback={null}>
                    <primitive scale={1} position={[0, -3, 0]} object={computers.scene} />
                </Suspense>

                {/* ABOUT ME PAGE */}
                <Html
                    occlude="blending"
                    scale={0.038}
                    transform
                    position={screen_positions.screen_1.position}
                    rotation={screen_positions.screen_1.rotation}
                    fov={75}
                >
                    <Page title={"About me"}>
                        <AboutPage></AboutPage>
                    </Page>
                </Html>
                {/* WORK HISTORY PAGE */}
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_2.position}
                    rotation={screen_positions.screen_2.rotation}
                    fov={75}
                >
                    <Page title={"work history"}>
                        <HistoryPage></HistoryPage>
                    </Page>
                </Html>
                {/* PROJECTS 1 PAGE */}
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_3.position}
                    rotation={screen_positions.screen_3.rotation}
                    fov={75}
                >
                    <Page title={"my projects"}>
                        <ProjectPage></ProjectPage>
                    </Page>
                </Html>
                {/* PROJECTS 2 PAGE */}
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_4.position}
                    rotation={screen_positions.screen_4.rotation}
                    fov={75}
                >
                    <Page title={"my projects"}>
                        <ProjectPage></ProjectPage>
                    </Page>
                </Html>
                {/* PROJECTS 3 PAGE */}
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_5.position}
                    rotation={screen_positions.screen_5.rotation}
                    fov={75}
                >
                    <Page title={"my projects"}>
                        <ProjectPage></ProjectPage>
                    </Page>
                </Html>
                {/* CONTACT PAGE */}
                <Html
                    occlude="blending"
                    scale={0.038}
                    transform
                    position={screen_positions.screen_6.position}
                    rotation={screen_positions.screen_6.rotation}
                    fov={75}
                >
                    <Page hasFrame={false}>
                        <ContactPage></ContactPage>
                    </Page>
                </Html>
                {/* EMPTY SCREENS */}
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_7.position}
                    rotation={screen_positions.screen_7.rotation}
                    fov={75}
                >
                    <Page hasFrame={false}></Page>
                </Html>
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_8.position}
                    rotation={screen_positions.screen_8.rotation}
                    fov={75}
                >
                    <Page hasFrame={false}></Page>
                </Html>
                <Html
                    occlude="blending"
                    scale={0.041}
                    transform
                    position={screen_positions.screen_9.position}
                    rotation={screen_positions.screen_9.rotation}
                    fov={75}
                >
                    <Page hasFrame={false}></Page>
                </Html>
            </Canvas>

            {/* NAV BAR */}
            <div className="bottom-nav">
                <button className="nav-btn" onClick={() => updateCamera(camera_positions.default)}>
                    Home
                </button>
                <button className="nav-btn" onClick={() => updateCamera(camera_positions.page_1)}>
                    About me
                </button>
                <button className="nav-btn" onClick={() => updateCamera(camera_positions.page_2)}>
                    Work Experience
                </button>
                <button className="nav-btn" onClick={() => updateCamera(camera_positions.page_3)}>
                    Projects
                </button>
                <button className="nav-btn" onClick={() => updateCamera(camera_positions.page_6)}>
                    Contact
                </button>
            </div>

            {/* DEV MODE CONTROLLERS*/}
            {devMode ? (
                <>
                    <ControlBoard
                        name="Camera controller"
                        property={devCameraSettings}
                        setProperty={setDevCameraSettings}
                    />
                    <ControlBoard
                        name="Secondary Control Board"
                        property={objectSettings}
                        setProperty={setObjectSettings}
                    />
                </>
            ) : null}
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
