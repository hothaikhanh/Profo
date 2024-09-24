import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    Html,
    PerspectiveCamera,
    CameraControls,
    ScrollControls,
    Scroll,
    useScroll,
    Text,
    useHelper,
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
import BlankPage from "./components/BlankPage/BlankPage";
import ComputerModels from "./components/ComputerModels/ComputerModels";
import Floor from "./components/Floor/Floor";
import Loader from "./components/Loader/Loader";

function App() {
    //DEV TOOLS
    const devMode = false;
    const allowMouse = true;

    const [canvasLoaded, setCanvasLoaded] = useState(false);

    const screenConfigs = [
        {
            screenTitle: "About Me",
            pageTitle: "About Me",
            content: <AboutPage></AboutPage>,
            scale: 0.038,
            position: [-3.24, 0.61, 1.36],
            rotation: [0.0, 1.22, 0.0],
        },
        {
            screenTitle: "Work History",
            pageTitle: "Work History",
            content: <HistoryPage></HistoryPage>,
            scale: 0.041,
            position: [-2.56, -1.76, -0.44],
            rotation: [0.0, 1.09, 0.0],
        },
        {
            screenTitle: "Project #1",
            pageTitle: "My Projects",
            content: <ProjectPage></ProjectPage>,
            scale: 0.041,
            position: [-1.27, 0.11, -1.7],
            rotation: [0.0, 1.0, 0],
        },
        {
            screenTitle: "Project #2",
            pageTitle: "My Projects",
            content: <ProjectPage></ProjectPage>,
            scale: 0.041,
            position: [0.26, -0.86, -2.42],
            rotation: [0.0, 0.0, 0.0],
        },
        {
            screenTitle: "Project #3",
            pageTitle: "My Projects",
            content: <ProjectPage></ProjectPage>,
            scale: 0.041,
            position: [1.78, -2.0, -1.59],
            rotation: [0.0, -0.36, 0.0],
        },
        {
            screenTitle: "Contacts",
            pageTitle: null,
            content: <ContactPage></ContactPage>,
            scale: 0.041,
            position: [2.98, -0.35, -0.09],
            rotation: [0.0, -0.8, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: null,
            scale: 0.041,
            position: [-3.8, 1.91, -2.48],
            rotation: [0.0, 0.54, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: null,
            scale: 0.041,
            position: [0.97, 1.9, -4.02],
            rotation: [0.0, -0.1, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: null,
            scale: 0.041,
            position: [4.52, 1.9, -1.46],
            rotation: [0.0, -1.05, 0.0],
        },
    ];
    const [spotLightScreenIndex, setSpotLightScreenIndex] = useState(null);

    const cameraConfigs = [
        { name: "show default", position: [0.0, 0.8, 5.0], target: [0.0, 0.0, 0.0] },
        { name: "show about me", position: [-2.7, 0.61, 1.54], target: screenConfigs[0].position },
        { name: "show works", position: [-2.0, -1.75, -0.15], target: screenConfigs[1].position },
        { name: "show project 1", position: [-0.72, 0.11, -1.35], target: screenConfigs[2].position },
        { name: "show project 2", position: [0.26, -0.86, -1.81], target: screenConfigs[3].position },
        { name: "show project 3", position: [1.56, -2, -1.02], target: screenConfigs[4].position },
        { name: "show contactme", position: [2.64, -0.35, 0.28], target: screenConfigs[5].position },
    ];
    const [activeCameraConfig, setActiveCameraConfig] = useState(0);
    const cameraControlRef = useRef(null);

    const bgTextConfig = {
        position: [0, 4.8, -6.6],
        scale: [0.9, 1.3, 1.0],
        rotation: [0, 0, 0],
        cameraPosition: [0, 4.8, 5],
    };
    const bgTextRef = useRef(null);

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

    return (
        <div id="canvas-container">
            <Canvas>
                <CameraController
                    bgTextConfig={bgTextConfig}
                    cameraControlRef={cameraControlRef}
                    allowMouse={allowMouse}
                    setCanvasLoaded={setCanvasLoaded}
                ></CameraController>
                <ScrollControls
                    pages={1}
                    distance={50}
                    damping={0}
                    infinite={true}
                    prepend={true}
                    style={{ scrollbarWidth: "none" }}
                >
                    <Scroll>
                        <ScrollController
                            activeCameraConfig={activeCameraConfig}
                            setActiveCameraConfig={setActiveCameraConfig}
                            cameraConfigs={cameraConfigs}
                        ></ScrollController>
                    </Scroll>
                </ScrollControls>

                <Text
                    font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                    characters="hothaikn.dev"
                    position={bgTextConfig.position}
                    fontSize={4}
                    fillOpacity={1}
                    rotation={bgTextConfig.rotation}
                    scale={bgTextConfig.scale}
                    color={"#173527"}
                    ref={bgTextRef}
                >
                    HOTHAIKHANH.DEV
                </Text>

                <Suspense fallback={<Loader />}>
                    <Scene
                        screenConfigs={screenConfigs}
                        spotLightScreenIndex={spotLightScreenIndex}
                        setSpotLightScreenIndex={setSpotLightScreenIndex}
                        activeCameraConfig={activeCameraConfig}
                        setActiveCameraConfig={setActiveCameraConfig}
                    ></Scene>
                </Suspense>
                <ambientLight color={devMode ? "white" : "#419873"} intensity={devMode ? 5 : 1.8} />
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
        </div>
    );
}

function Scene({
    screenConfigs,
    spotLightScreenIndex,
    setSpotLightScreenIndex,
    activeCameraConfig,
    setActiveCameraConfig,
}) {
    return (
        <>
            {screenConfigs.map((screen, index) => {
                return (
                    <ScreenContainer
                        screenPosition={screen.position}
                        screenRotation={screen.rotation}
                        screenIndex={index}
                        scale={screen.scale}
                        title={screen.screenTitle}
                        setActiveCameraConfig={screen.screenTitle ? setActiveCameraConfig : () => {}}
                        setSpotLightScreenIndex={screen.screenTitle ? setSpotLightScreenIndex : () => {}}
                        activeCameraConfig={activeCameraConfig}
                        key={index}
                    >
                        <Page title={screen.pageTitle}>{screen.content}</Page>
                    </ScreenContainer>
                );
            })}
            <DynamicSpotLight
                screenConfigs={screenConfigs}
                spotLightScreenIndex={spotLightScreenIndex}
                activeCameraConfig={activeCameraConfig}
            />
            <ComputerModels scale={1} position={[0, -3, 0]} />
            <Floor></Floor>
        </>
    );
}

function ScreenContainer({
    screenPosition,
    screenRotation,
    setActiveCameraConfig,
    setSpotLightScreenIndex,
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
        gsap.config({ nullTargetWarn: false });

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
                        position={[screenPosition[0], screenPosition[1] + 1.2, screenPosition[2]]}
                        rotation={screenRotation}
                        fontSize={0}
                        fillOpacity={0}
                        ref={titleText}
                    >
                        {title}
                    </Text>
                    <Text
                        font={"./src/assets/fonts/SVN-Determination Sans.otf"}
                        characters="v"
                        position={[screenPosition[0], screenPosition[1] + 1, screenPosition[2]]}
                        rotation={screenRotation}
                        fontSize={0}
                        fillOpacity={0}
                        ref={titleArrow}
                    >
                        v
                    </Text>
                </mesh>
            ) : null}
            <Html
                position={screenPosition}
                rotation={screenRotation}
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

function ScrollController({ activeCameraConfig, setActiveCameraConfig, cameraConfigs }) {
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

function CameraController({ bgTextConfig, cameraControlRef, allowMouse, setCanvasLoaded }) {
    return (
        <CameraControls
            enabled={true}
            ref={cameraControlRef}
            mouseButtons={{
                left: allowMouse ? 1 : 0,
                right: allowMouse ? 2 : 0,
                wheel: allowMouse ? 8 : 0,
                middle: allowMouse ? 8 : 0,
            }}
            touches={{
                one: 0,
                two: 0,
                three: 0,
            }}
        ></CameraControls>
    );
}

export default App;
