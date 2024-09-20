import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {} from "@react-three/fiber";
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
    Text,
    useHelper,
    Plane,
    useTexture,
} from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useControls } from "leva";

import { useState, useRef, Suspense, useEffect } from "react";
import Page from "./components/Page/Page";
import AboutPage from "./components/AboutPage/AboutPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import ContactPage from "./components/ContactPage/ContactPage";
import "./App.scss";

function App() {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");
    const screenConfigs = [
        { position: [-3.24, 0.61, 1.36], rotation: [0.0, 1.22, 0.0] }, //about me
        { position: [-2.56, -1.76, -0.44], rotation: [0.0, 1.09, 0.0] }, //works
        { position: [-1.27, 0.11, -1.7], rotation: [0.0, 1.0, 0] }, //project 1
        { position: [0.26, -0.86, -2.42], rotation: [0.0, 0.0, 0.0] }, //project 2
        { position: [1.78, -2.0, -1.59], rotation: [0.0, -0.36, 0.0] }, //project 3
        { position: [2.98, -0.35, -0.09], rotation: [0.0, -0.8, 0.0] }, //contactme
        { position: [-3.8, 1.91, -2.48], rotation: [0.0, 0.54, 0.0] }, //blank1
        { position: [0.97, 1.9, -4.02], rotation: [0.0, -0.1, 0.0] }, //blank2
        { position: [4.52, 1.9, -1.46], rotation: [0.0, -1.05, 0.0] }, //blank3
    ];
    const [spotLightScreenIndex, setSpotLightScreenIndex] = useState(null);

    const cameraConfigs = [
        { position: [0.0, 0.8, 5.0], target: [0.0, 0.0, 0.0] }, //show default
        { position: [-2.7, 0.61, 1.54], target: screenConfigs[0].position }, //show about me
        { position: [-2.0, -1.75, -0.15], target: screenConfigs[1].position }, //show works
        { position: [-0.72, 0.11, -1.35], target: screenConfigs[2].position }, //show project 1
        { position: [0.26, -0.86, -1.81], target: screenConfigs[3].position }, //show project 2
        { position: [1.56, -2, -1.02], target: screenConfigs[4].position }, //show project 3
        { position: [2.64, -0.35, 0.28], target: screenConfigs[5].position }, //show contactme
    ];
    const [activeCameraConfig, setActiveCameraConfig] = useState(0);

    const cameraControlRef = useRef();

    //Update camera when viewing a screen
    useEffect(() => {
        cameraControlRef.current?.setLookAt(
            cameraConfigs[activeCameraConfig].position[0],
            cameraConfigs[activeCameraConfig].position[1],
            cameraConfigs[activeCameraConfig].position[2],
            cameraConfigs[activeCameraConfig].target[0],
            cameraConfigs[activeCameraConfig].target[1],
            cameraConfigs[activeCameraConfig].target[2],
            true
        );
    }, [activeCameraConfig]);

    //DEV TOOLS
    const devMode = false;
    const allowMouse = true;
    const [devCameraSettings, setDevCameraSettings] = useState(cameraConfigs[0]);
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

    const { posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, scalez, color } = useControls({
        posX: { value: 0, min: -20, max: 20 },
        posY: { value: 0, min: -20, max: 20 },
        posZ: { value: 0, min: -20, max: 20 },
        rotX: { value: 0, min: -20, max: 20 },
        rotY: { value: 0, min: -20, max: 20 },
        rotZ: { value: 0, min: -20, max: 20 },
        scaleX: { value: 1, min: -20, max: 20 },
        scaleY: { value: 1, min: -20, max: 20 },
        scalez: { value: 1, min: -20, max: 20 },
        color: { r: 200, b: 125, g: 106, a: 0.4 },
    });

    return (
        <div id="canvas-container">
            <Canvas>
                <Text
                    font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                    characters="hothaikn.dev"
                    position={[0, 4.4, -6.6]}
                    rotation={[0, 0, 0]}
                    fontSize={4}
                    fillOpacity={1}
                    scale={[0.9, 1.3, 1.0]}
                    color={"#173527"}
                >
                    HOTHAIKHANH.DEV
                </Text>
                <ScrollControls
                    pages={1}
                    distance={50}
                    damping={0}
                    infinite={true}
                    prepend={true}
                    style={{ scrollbarWidth: "none" }}
                >
                    <Scroll>
                        <ScrollObject
                            setActiveCameraConfig={setActiveCameraConfig}
                            activeCameraConfig={activeCameraConfig}
                            cameraConfigs={cameraConfigs}
                        />
                    </Scroll>
                </ScrollControls>

                <CameraControls
                    enabled={true}
                    makeDefault
                    ref={cameraControlRef}
                    mouseButtons={{
                        left: allowMouse ? 1 : 0,
                        right: allowMouse ? 2 : 0,
                        wheel: allowMouse ? 8 : 0,
                        middle: allowMouse ? 8 : 0,
                    }}
                />

                <group>
                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={0}
                        scale={0.038}
                        title={"About Me"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page title={"About me"}>
                            <AboutPage></AboutPage>
                        </Page>
                    </ScreenContainer>

                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={1}
                        scale={0.041}
                        title={"Work History"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page title={"work history"}>
                            <HistoryPage></HistoryPage>
                        </Page>
                    </ScreenContainer>

                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={2}
                        scale={0.041}
                        title={"Project #1"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page title={"my projects"}>
                            <ProjectPage></ProjectPage>
                        </Page>
                    </ScreenContainer>

                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={3}
                        scale={0.041}
                        title={"Project #2"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page title={"my projects"}>
                            <ProjectPage></ProjectPage>
                        </Page>
                    </ScreenContainer>

                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={4}
                        scale={0.041}
                        title={"Project #3"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page title={"my projects"}>
                            <ProjectPage></ProjectPage>
                        </Page>
                    </ScreenContainer>

                    <ScreenContainer
                        screenConfigs={screenConfigs}
                        screenIndex={5}
                        scale={0.041}
                        title={"Contacts"}
                        setActiveCameraConfig={setActiveCameraConfig}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                    >
                        <Page>
                            <ContactPage></ContactPage>
                        </Page>
                    </ScreenContainer>

                    {/* EMPTY SCREENS */}
                    <ScreenContainer screenConfigs={screenConfigs} screenIndex={6} scale={0.041}>
                        <Page />
                    </ScreenContainer>
                    <ScreenContainer screenConfigs={screenConfigs} screenIndex={7} scale={0.041}>
                        <Page />
                    </ScreenContainer>
                    <ScreenContainer screenConfigs={screenConfigs} screenIndex={8} scale={0.041}>
                        <Page />
                    </ScreenContainer>
                </group>

                <DynamicSpotLight
                    screenConfigs={screenConfigs}
                    spotLightScreenIndex={spotLightScreenIndex}
                    activeCameraConfig={activeCameraConfig}
                />
                <ambientLight color="#419873" intensity={1.8} />
                {/* <ambientLight color="white" intensity={5} /> */}

                <Suspense fallback={null}>
                    <primitive scale={1} position={[0, -3, 0]} object={computers.scene} />
                </Suspense>
                <Floor></Floor>
            </Canvas>

            {/* NAV BAR */}
            <div className="bottom-nav">
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 0 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(0)}
                >
                    Home
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 1 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(1)}
                    onMouseEnter={() => setSpotLightScreenIndex(0)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
                    About me
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 2 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(2)}
                    onMouseEnter={() => setSpotLightScreenIndex(1)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
                    Work Experience
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 3 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(3)}
                    onMouseEnter={() => setSpotLightScreenIndex(2)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
                    Projects #1
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 4 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(4)}
                    onMouseEnter={() => setSpotLightScreenIndex(3)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
                    Projects #2
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 5 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(5)}
                    onMouseEnter={() => setSpotLightScreenIndex(4)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
                    Projects #3
                </button>
                <button
                    className={"nav-btn" + " " + (activeCameraConfig == 6 ? "active" : "")}
                    onClick={() => setActiveCameraConfig(6)}
                    onMouseEnter={() => setSpotLightScreenIndex(5)}
                    onMouseLeave={() => setSpotLightScreenIndex(null)}
                >
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

function ScrollObject({ setActiveCameraConfig, activeCameraConfig, cameraConfigs }) {
    const data = useScroll();
    let allowScroll = useRef(false),
        prevScroll = useRef(null),
        currentScroll = useRef(null);

    let nextScreen = () => {
        if (activeCameraConfig == cameraConfigs.length - 1) {
            setActiveCameraConfig(0);
            return;
        }
        setActiveCameraConfig(activeCameraConfig + 1);
    };
    let prevScrren = () => {
        if (activeCameraConfig == 0) {
            setActiveCameraConfig(cameraConfigs.length - 1);
            return;
        }
        setActiveCameraConfig(activeCameraConfig - 1);
    };

    useFrame(() => {
        if (data.delta !== 0 && allowScroll.current === false) {
            allowScroll.current = true;

            prevScroll.current = data.offset;
            // console.log("START from: " + data.offset);
        } else if (data.delta !== 0 && currentScroll.current == null) {
            currentScroll.current = data.offset;
            if (currentScroll.current > prevScroll.current) {
                nextScreen();
                // console.log("GOING DOWN: " + currentScroll.current + " -> " + prevScroll.current);
            } else {
                prevScrren();
                // console.log("GOING UP: " + currentScroll.current + " -> " + prevScroll.current);
            }
        } else if (data.delta == 0 && allowScroll.current === true) {
            allowScroll.current = false;
            // console.log("END at: " + data.offset);
            prevScroll.current = null;
            currentScroll.current = null;
        }
    });
    return null;
}

function ScreenContainer({
    screenConfigs,
    setActiveCameraConfig = () => {},
    setSpotLightScreenIndex = () => {},
    screenIndex,
    activeCameraConfig,
    scale,
    children,
    title = null,
}) {
    const { gl } = useThree();
    const titleText = useRef(null);
    const titleArrow = useRef(null);
    const defaultFontSize = 0.2;
    const defaultFillOpacity = 1;

    useGSAP(() => {
        //show text when is at homepage
        if (activeCameraConfig === 0) {
            gsap.to(titleText.current, {
                fillOpacity: defaultFillOpacity,
                fontSize: defaultFontSize,
                duration: 0.3,
                delay: 0.8,
            });
            gsap.to(titleArrow.current, {
                fillOpacity: defaultFillOpacity,
                fontSize: defaultFontSize,
                duration: 0.3,
                delay: 0.8,
            });
        } else {
            gsap.to(titleText.current, {
                fillOpacity: 0,
                fontSize: 0,
                duration: 0.3,
            });
            gsap.to(titleArrow.current, {
                fillOpacity: 0,
                fontSize: 0,
                duration: 0.3,
            });
        }
    }, [activeCameraConfig]);

    return (
        <group>
            {title ? (
                <mesh>
                    <Text
                        font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                        position={[
                            screenConfigs[screenIndex].position[0],
                            screenConfigs[screenIndex].position[1] + 1.2,
                            screenConfigs[screenIndex].position[2],
                        ]}
                        rotation={screenConfigs[screenIndex].rotation}
                        fontSize={0}
                        fillOpacity={0}
                        ref={titleText}
                    >
                        {title}
                    </Text>
                    <Text
                        font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                        characters="v"
                        position={[
                            screenConfigs[screenIndex].position[0],
                            screenConfigs[screenIndex].position[1] + 1,
                            screenConfigs[screenIndex].position[2],
                        ]}
                        rotation={screenConfigs[screenIndex].rotation}
                        fontSize={0}
                        fillOpacity={0}
                        ref={titleArrow}
                    >
                        v
                    </Text>
                </mesh>
            ) : null}
            <Html
                position={screenConfigs[screenIndex].position}
                rotation={screenConfigs[screenIndex].rotation}
                occlude="blending"
                scale={scale}
                transform
                fov={75}
                portal={{ current: gl.domElement.parentNode }}
            >
                <div
                    onClick={() => setActiveCameraConfig(screenIndex + 1)}
                    onMouseEnter={() => {
                        setSpotLightScreenIndex(screenIndex);
                    }}
                    onMouseLeave={() => {
                        if (activeCameraConfig === 0) setSpotLightScreenIndex(null);
                    }}
                >
                    {children}
                </div>
            </Html>
        </group>
    );
}

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

function DynamicSpotLight({ screenConfigs, spotLightScreenIndex, activeCameraConfig }) {
    const spotlight = useRef();
    const target = useRef();
    let lightIntensity = 10;
    let lightDistance = 30;

    let idlePosition = [0, 0, 0];

    useGSAP(() => {
        if (spotLightScreenIndex !== null && activeCameraConfig === 0) {
            gsap.to(spotlight.current, { intensity: lightIntensity, distance: lightDistance, duration: 0.3 });
            gsap.to(target.current.position, {
                x: screenConfigs[spotLightScreenIndex].position[0],
                y: screenConfigs[spotLightScreenIndex].position[1],
                z: screenConfigs[spotLightScreenIndex].position[2],
                duration: 0.3,
            });
        }
    }, [spotLightScreenIndex]);

    useGSAP(() => {
        if (activeCameraConfig !== 0) {
            gsap.to(spotlight.current, { intensity: 0, distance: 0, duration: 0.5, delay: 0.5 });
            gsap.to(target.current.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.3,
            });
        }
    }, [activeCameraConfig]);

    // useHelper(spotlight, THREE.SpotLightHelper, "white");
    // const { intensity, penumbra, positionX, positionY, positionZ, angle, distance, target_X, target_Y, target_Z } =
    //     useControls({
    //         intensity: { value: 20, min: 0, max: 50 },
    //         penumbra: { value: 0, min: 0, max: 1 },

    //         positionX: { value: 0, min: -20, max: 20 },
    //         positionY: { value: 2, min: -20, max: 20 },
    //         positionZ: { value: 0, min: -20, max: 20 },

    //         target_X: { value: 0, min: -20, max: 20 },
    //         target_Y: { value: 0, min: -20, max: 20 },
    //         target_Z: { value: 0, min: -20, max: 20 },

    //         angle: { value: 0.1, min: 0, max: 1 },
    //         distance: { value: 20, min: 0, max: 50 },
    //     });

    useFrame(() => {
        spotlight.current.target = target.current;
    });

    return (
        <mesh>
            <spotLight
                ref={spotlight}
                color="white"
                position={[0, 20, 5]}
                decay={0}
                angle={0.05}
                penumbra={0}
                intensity={0}
                distance={0}
            />
            <mesh ref={target} position={idlePosition}></mesh>
        </mesh>
    );
}

function Floor() {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
        "/src/assets/textures/Tiles106_2K-JPG_Color.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_Displacement.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_NormalGL.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_Roughness.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_AmbientOcclusion.jpg",
    ]);
    return (
        <mesh scale={1} rotation={[-1.6, 0, 0]} position={[0, -3, -3]}>
            <planeGeometry args={[40, 20, 100, 100]}></planeGeometry>
            <meshStandardMaterial
                displacementScale={0}
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            ></meshStandardMaterial>
        </mesh>
    );
}
