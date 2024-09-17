import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    Environment,
    OrbitControls,
    Html,
    PerspectiveCamera,
    CameraControls,
    ScrollControls,
    Scroll,
    useScroll,
    Text3D,
    Center,
    Text,
} from "@react-three/drei";

import { useState, useRef, Suspense, useEffect } from "react";
import Page from "./components/Page/Page";
import AboutPage from "./components/AboutPage/AboutPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import ContactPage from "./components/ContactPage/ContactPage";
import "./App.scss";
import { TextGeometry } from "three/examples/jsm/Addons.js";

function App() {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");
    const camera_positions = [
        { positionX: 0.0, positionY: 0.8, positionZ: 5.0, targetX: 0.0, targetY: 0.0, targetZ: 0.0 },
        { positionX: -2.7, positionY: 0.61, positionZ: 1.54, targetX: -8.3, targetY: 0.6, targetZ: -0.4 },
        {
            positionX: -2.0,
            positionY: -1.75,
            positionZ: -0.15,
            targetX: -2.57,
            targetY: -1.75,
            targetZ: -0.44,
        },
        { positionX: -0.72, positionY: 0.11, positionZ: -1.35, targetX: -1.27, targetY: 0.11, targetZ: -1.7 },
        { positionX: 0.26, positionY: -0.84, positionZ: -1.81, targetX: 0.26, targetY: -0.84, targetZ: -2.42 },
        { positionX: 1.56, positionY: -1.99, positionZ: -1.02, targetX: 1.76, targetY: -1.99, targetZ: -1.55 },
        { positionX: 2.64, positionY: -0.35, positionZ: 0.28, targetX: 3.46, targetY: -0.35, targetZ: -0.53 },
    ];
    const screen_positions = [
        { position: [-3.24, 0.61, 1.36], rotation: [0.0, 1.22, 0.0] },
        { position: [-2.56, -1.76, -0.44], rotation: [0.0, 1.09, 0.0] },
        { position: [-1.27, 0.11, -1.7], rotation: [0.0, 1.0, 0] },
        { position: [0.26, -0.86, -2.42], rotation: [0.0, 0.0, 0.0] },
        { position: [1.78, -2.0, -1.59], rotation: [0.0, -0.36, 0.0] },
        { position: [2.98, -0.35, -0.09], rotation: [0.0, -0.8, 0.0] },
        { position: [-3.8, 1.91, -2.48], rotation: [0.0, 0.54, 0.0] },
        { position: [0.97, 1.9, -4.02], rotation: [0.0, -0.1, 0.0] },
        { position: [4.52, 1.9, -1.46], rotation: [0.0, -1.05, 0.0] },
    ];
    const [activeCameraPositon, setActiveCameraPositon] = useState(0);
    const cameraControlRef = useRef();

    useEffect(() => {
        cameraControlRef.current?.setLookAt(
            camera_positions[activeCameraPositon].positionX,
            camera_positions[activeCameraPositon].positionY,
            camera_positions[activeCameraPositon].positionZ,
            camera_positions[activeCameraPositon].targetX,
            camera_positions[activeCameraPositon].targetY,
            camera_positions[activeCameraPositon].targetZ,
            true
        );
    }, [activeCameraPositon]);

    const [scrollActive, setScrollActive] = useState(false);

    const [y, setY] = useState(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", (e) => console.log(e));
    }, [y]);
    //DEV TOOLS
    const devMode = false;
    const allowMouse = true;
    const [devCameraSettings, setDevCameraSettings] = useState(camera_positions[0]);
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
    function handleScroll(event) {}

    useEffect(() => {
        // let scroll = document.querySelector(`[data-camera-controls-version]`);
        // if (scroll) {
        //
        //     scroll.addEventListener("scroll", (e) => {
        //         console.log(e.target);
        //     });
        // }
    }, [scrollActive]);

    return (
        <div id="canvas-container">
            <Canvas>
                <ScrollControls
                    pages={1}
                    distance={50}
                    damping={0}
                    infinite={true}
                    prepend={true}
                    style={{
                        // zIndex: 999999999,
                        scrollbarWidth: "none",
                    }}
                >
                    <Scroll>
                        <Screens screen_positions={screen_positions} />
                        <ScrollObject
                            setScrollActive={setScrollActive}
                            setActiveCameraPositon={setActiveCameraPositon}
                            activeCameraPositon={activeCameraPositon}
                            camera_positions={camera_positions}
                        />
                    </Scroll>
                </ScrollControls>

                <MainCamera cameraControlRef={cameraControlRef} allowMouse={allowMouse} />

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
            </Canvas>

            {/* NAV BAR */}
            <div className="bottom-nav">
                <button className="nav-btn" onClick={() => setActiveCameraPositon(0)}>
                    Home
                </button>
                <button className="nav-btn" onClick={() => setActiveCameraPositon(1)}>
                    About me
                </button>
                <button className="nav-btn" onClick={() => setActiveCameraPositon(2)}>
                    Work Experience
                </button>
                <button className="nav-btn" onClick={() => setActiveCameraPositon(3)}>
                    Projects
                </button>
                <button className="nav-btn" onClick={() => setActiveCameraPositon(6)}>
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

function MainCamera({ cameraControlRef, allowMouse }) {
    return (
        <CameraControls
            enabled={true}
            makeDefault
            ref={cameraControlRef}
            mouseButtons={{
                left: allowMouse ? 1 : 0,
                right: allowMouse ? 2 : 0,
                wheel: allowMouse ? 8 : 0,
                // wheel: 8,

                middle: allowMouse ? 8 : 0,
            }}
        />
    );
}

function ScrollObject({ setScrollActive, setActiveCameraPositon, activeCameraPositon, camera_positions }) {
    const data = useScroll();
    setScrollActive(true);
    let allowScroll = useRef(false),
        prevScroll = useRef(null),
        currentScroll = useRef(null);

    let nextScreen = () => {
        if (activeCameraPositon == camera_positions.length - 1) {
            setActiveCameraPositon(0);
            return;
        }
        setActiveCameraPositon(activeCameraPositon + 1);
    };
    let prevScrren = () => {
        if (activeCameraPositon == 0) {
            setActiveCameraPositon(camera_positions.length - 1);
            return;
        }
        setActiveCameraPositon(activeCameraPositon - 1);
    };

    useFrame(() => {
        if (data.delta !== 0 && allowScroll.current === false) {
            allowScroll.current = true;

            prevScroll.current = data.offset;
            console.log("START from: " + data.offset);
        } else if (data.delta !== 0 && currentScroll.current == null) {
            currentScroll.current = data.offset;
            if (currentScroll.current > prevScroll.current) {
                nextScreen();
                console.log("GOING DOWN: " + currentScroll.current + " -> " + prevScroll.current);
            } else {
                prevScrren();
                console.log("GOING UP: " + currentScroll.current + " -> " + prevScroll.current);
            }
        } else if (data.delta == 0 && allowScroll.current === true) {
            allowScroll.current = false;
            console.log("END at: " + data.offset);
            prevScroll.current = null;
            currentScroll.current = null;
        }
    });
    return null;
}

function Screens({ screen_positions }) {
    const { gl } = useThree();
    return (
        <group>
            <ScreenContainer screen_positions={screen_positions[0]} gl={gl} scale={0.038} title={"About Me"}>
                <Page title={"About me"}>
                    <AboutPage></AboutPage>
                </Page>
            </ScreenContainer>

            <ScreenContainer screen_positions={screen_positions[1]} gl={gl} scale={0.041} title={"Work History"}>
                <Page title={"work history"}>
                    <HistoryPage></HistoryPage>
                </Page>
            </ScreenContainer>

            <ScreenContainer screen_positions={screen_positions[2]} gl={gl} scale={0.041} title={"Project #1"}>
                <Page title={"my projects"}>
                    <ProjectPage></ProjectPage>
                </Page>
            </ScreenContainer>

            <ScreenContainer screen_positions={screen_positions[3]} gl={gl} scale={0.041} title={"Project #2"}>
                <Page title={"my projects"}>
                    <ProjectPage></ProjectPage>
                </Page>
            </ScreenContainer>

            <ScreenContainer screen_positions={screen_positions[4]} gl={gl} scale={0.041} title={"Project #3"}>
                <Page title={"my projects"}>
                    <ProjectPage></ProjectPage>
                </Page>
            </ScreenContainer>

            <ScreenContainer screen_positions={screen_positions[5]} gl={gl} scale={0.041} title={"Contacts"}>
                <Page hasFrame={false}>
                    <ContactPage></ContactPage>
                </Page>
            </ScreenContainer>

            {/* EMPTY SCREENS */}
            <ScreenContainer screen_positions={screen_positions[6]} gl={gl} scale={0.041} title={null}>
                <Page hasFrame={false}></Page>
            </ScreenContainer>
            <ScreenContainer screen_positions={screen_positions[7]} gl={gl} scale={0.041} title={null}>
                <Page hasFrame={false}></Page>
            </ScreenContainer>
            <ScreenContainer screen_positions={screen_positions[8]} gl={gl} scale={0.041} title={null}>
                <Page hasFrame={false}></Page>
            </ScreenContainer>
        </group>
    );
}

function ScreenContainer({ screen_positions, gl, scale, children, title }) {
    let floatDistance = 1;
    let textOpacity = 1;
    let fontSize = 1;
    return (
        <group>
            {title ? (
                <mesh>
                    <Text
                        font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                        position={[
                            screen_positions.position[0],
                            screen_positions.position[1] + 1.2 * floatDistance,
                            screen_positions.position[2],
                        ]}
                        rotation={screen_positions.rotation}
                        fontSize={fontSize * 0.3}
                        fillOpacity={textOpacity}
                    >
                        {title}
                    </Text>
                    <Text
                        font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                        characters="v"
                        position={[
                            screen_positions.position[0],
                            screen_positions.position[1] + 0.8 * floatDistance,
                            screen_positions.position[2],
                        ]}
                        rotation={screen_positions.rotation}
                        fontSize={fontSize * 0.3}
                        fillOpacity={textOpacity}
                    >
                        v
                    </Text>
                </mesh>
            ) : null}
            <Html
                position={screen_positions.position}
                rotation={screen_positions.rotation}
                occlude="blending"
                scale={scale}
                transform
                fov={75}
                portal={{ current: gl.domElement.parentNode }}
            >
                <div onClick={() => alert("clicked")}>{children}</div>
            </Html>
        </group>
    );
}
