import AboutPage from "@components/AboutPage/AboutPage";
import BlankPage from "@components/BlankPage/BlankPage";
import CameraController from "@components/CameraController/CameraController";
import ContactPage from "@components/ContactPage/ContactPage";
import LanguageContext from "@components/Contexts/LanguageContext";
import HistoryPage from "@components/HistoryPage/HistoryPage";
import Loader from "@components/Loader/Loader";
import LoadingScreen from "@components/LoadingScreen/LoadingScreen";
import NavButton from "@components/NavButton/NavButton";
import ProjectPage from "@components/ProjectPage/ProjectPage";
import Scene from "@components/Scene/Scene";
import ScrollController from "@components/ScrollController/ScrollController";
import { CameraControls, Scroll, ScrollControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import "./App.scss";
import siteData from "./resources.json";
import type { BGTextConfig, CameraConfigs, Locale, ScreenConfigs, SiteData } from "./types";

const App = () => {
    //DEV TOOLS
    const devMode = false;
    const allowMouse = false;
    //DEV TOOLS

    const [canvasLoaded, setCanvasLoaded] = useState<boolean>(false);
    const [pageReady, setPageReady] = useState<boolean>(false);
    const [locale, setLocale] = useState<Locale>("EN");
    const [data] = useState<SiteData>(siteData);

    const screenConfigs: ScreenConfigs = [
        {
            screenTitle: data.aboutMe.title[locale],
            pageTitle: data.aboutMe.title[locale],
            content: <AboutPage data={data.aboutMe} skills={data.skills}></AboutPage>,
            scale: 0.038,
            position: [-3.24, 0.61, 1.36],
            rotation: [0.0, 1.22, 0.0],
        },
        {
            screenTitle: data.workHistory.title[locale],
            pageTitle: data.workHistory.title[locale],
            content: <HistoryPage data={data.workHistory}></HistoryPage>,
            scale: 0.041,
            position: [-2.56, -1.76, -0.44],
            rotation: [0.0, 1.09, 0.0],
        },
        {
            screenTitle: data.projectPages.projects[0].title[locale],
            pageTitle: data.projectPages.title[locale],
            content: <ProjectPage data={data.projectPages.projects[0]} skills={data.skills}></ProjectPage>,
            scale: 0.041,
            position: [-1.27, 0.11, -1.7],
            rotation: [0.0, 1.0, 0],
        },
        {
            screenTitle: data.projectPages.projects[1].title[locale],
            pageTitle: data.projectPages.title[locale],
            content: <ProjectPage data={data.projectPages.projects[1]} skills={data.skills}></ProjectPage>,
            scale: 0.041,
            position: [0.26, -0.86, -2.42],
            rotation: [0.0, 0.0, 0.0],
        },
        {
            screenTitle: data.projectPages.projects[2].title[locale],
            pageTitle: data.projectPages.title[locale],
            content: <ProjectPage data={data.projectPages.projects[2]} skills={data.skills}></ProjectPage>,
            scale: 0.041,
            position: [1.78, -2.0, -1.59],
            rotation: [0.0, -0.36, 0.0],
        },
        {
            screenTitle: data.contact.title[locale],
            pageTitle: null,
            content: <ContactPage data={data.contact}></ContactPage>,
            scale: 0.041,
            position: [2.98, -0.35, -0.09],
            rotation: [0.0, -0.8, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: <BlankPage data={data.blank} />,
            scale: 0.041,
            position: [-3.8, 1.91, -2.48],
            rotation: [0.0, 0.54, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: <BlankPage data={data.blank} />,
            scale: 0.041,
            position: [0.97, 1.9, -4.02],
            rotation: [0.0, -0.1, 0.0],
        },
        {
            screenTitle: null,
            pageTitle: null,
            content: <BlankPage data={data.blank} />,
            scale: 0.041,
            position: [4.52, 1.9, -1.46],
            rotation: [0.0, -1.05, 0.0],
        },
    ];
    const [spotLightScreenIndex, setSpotLightScreenIndex] = useState<number | null>(null);

    const cameraConfigs: CameraConfigs = [
        { name: "show default", position: [0.0, 0.8, 5.0], target: [0.0, 0.0, 0.0] },
        { name: "show about me", position: [-2.7, 0.61, 1.54], target: screenConfigs[0].position },
        { name: "show works", position: [-2.0, -1.75, -0.15], target: screenConfigs[1].position },
        { name: "show project 1", position: [-0.72, 0.11, -1.35], target: screenConfigs[2].position },
        { name: "show project 2", position: [0.26, -0.86, -1.81], target: screenConfigs[3].position },
        { name: "show project 3", position: [1.56, -2, -1.02], target: screenConfigs[4].position },
        { name: "show contactme", position: [2.64, -0.35, 0.28], target: screenConfigs[5].position },
    ];
    const [activeCameraConfig, setActiveCameraConfig] = useState<number | null>(null);
    const cameraControlRef = useRef<CameraControls>(null);

    const bgTextConfig: BGTextConfig = {
        position: [0, 4.8, -6.6],
        scale: [0.9, 1.3, 1.0],
        rotation: [0, 0, 0],
        cameraPosition: [0, 4.8, 5],
    };
    const bgTextRef = useRef<HTMLElement>(null);

    //Update camera when viewing a screen
    useEffect(() => {
        if (activeCameraConfig) {
            cameraControlRef.current?.setLookAt(
                cameraConfigs[activeCameraConfig].position[0],
                cameraConfigs[activeCameraConfig].position[1],
                cameraConfigs[activeCameraConfig].position[2],
                cameraConfigs[activeCameraConfig].target[0],
                cameraConfigs[activeCameraConfig].target[1],
                cameraConfigs[activeCameraConfig].target[2],
                true
            );
        }
    }, [activeCameraConfig]);

    return (
        <div id="canvas-container">
            <LanguageContext.Provider value={locale}>
                {!pageReady && <LoadingScreen isLoaded={canvasLoaded} />}
                <Canvas frameloop="demand">
                    <CameraController
                        bgTextConfig={bgTextConfig}
                        cameraControlRef={cameraControlRef}
                        allowMouse={allowMouse}
                        setCanvasLoaded={setCanvasLoaded}
                        setActiveCameraConfig={setActiveCameraConfig}
                        canvasLoaded={canvasLoaded}
                        setPageReady={setPageReady}
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
                        rotation={bgTextConfig.rotation}
                        scale={bgTextConfig.scale}
                        fontSize={4}
                        fillOpacity={1}
                        color={"#173527"}
                        ref={bgTextRef}
                    >
                        HOTHAIKHANH.DEV
                    </Text>

                    <Suspense fallback={<Loader />}>
                        <Scene
                            screenConfigs={screenConfigs}
                            activeCameraConfig={activeCameraConfig}
                            spotLightScreenIndex={spotLightScreenIndex}
                            setActiveCameraConfig={setActiveCameraConfig}
                            setSpotLightScreenIndex={setSpotLightScreenIndex}
                        ></Scene>
                    </Suspense>
                    <ambientLight color={devMode ? "white" : "#419873"} intensity={devMode ? 5 : 1.8} />
                </Canvas>

                {/* NAV BAR */}
                {pageReady && (
                    <div className="nav-bar">
                        <NavButton isActive={activeCameraConfig == 0} onClick={() => setActiveCameraConfig(0)}>
                            {data.home.title[locale]}
                        </NavButton>

                        <NavButton
                            isActive={activeCameraConfig == 1}
                            onClick={() => setActiveCameraConfig(1)}
                            onMouseEnter={() => setSpotLightScreenIndex(0)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.aboutMe.title[locale]}
                        </NavButton>

                        <NavButton
                            isActive={activeCameraConfig == 2}
                            onClick={() => setActiveCameraConfig(2)}
                            onMouseEnter={() => setSpotLightScreenIndex(1)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.workHistory.title[locale]}
                        </NavButton>
                        <NavButton
                            isActive={activeCameraConfig == 3}
                            onClick={() => setActiveCameraConfig(3)}
                            onMouseEnter={() => setSpotLightScreenIndex(2)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.projectPages.projects[0].title[locale]}
                        </NavButton>
                        <NavButton
                            isActive={activeCameraConfig == 4}
                            onClick={() => setActiveCameraConfig(4)}
                            onMouseEnter={() => setSpotLightScreenIndex(3)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.projectPages.projects[1].title[locale]}
                        </NavButton>
                        <NavButton
                            isActive={activeCameraConfig == 5}
                            onClick={() => setActiveCameraConfig(5)}
                            onMouseEnter={() => setSpotLightScreenIndex(4)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.projectPages.projects[2].title[locale]}
                        </NavButton>
                        <NavButton
                            isActive={activeCameraConfig == 6}
                            onClick={() => setActiveCameraConfig(6)}
                            onMouseEnter={() => setSpotLightScreenIndex(5)}
                            onMouseLeave={() => setSpotLightScreenIndex(null)}
                        >
                            {data.contact.title[locale]}
                        </NavButton>
                        <button
                            className={"lang-btn"}
                            onClick={() => {
                                setLocale(locale == "EN" ? "VN" : "EN");
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z" />
                            </svg>
                            <span>{locale}</span>
                        </button>
                    </div>
                )}
            </LanguageContext.Provider>
        </div>
    );
};

export default App;
