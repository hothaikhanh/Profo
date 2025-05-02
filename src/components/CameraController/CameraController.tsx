import { BGTextConfig } from "@/types";
import { ReactRef } from "@gsap/react";
import { CameraControls } from "@react-three/drei";
import { useEffect, useState } from "react";

type Props = {
    allowMouse: boolean;
    bgTextConfig: BGTextConfig;
    canvasLoaded: boolean;
    cameraControlRef: ReactRef;
    setPageReady: (state: boolean) => void;
    setCanvasLoaded: (state: boolean) => void;
    setActiveCameraConfig: (id: number | null) => void;
};
const CameraController = ({
    allowMouse,
    bgTextConfig,
    canvasLoaded,
    cameraControlRef,
    setPageReady,
    setCanvasLoaded,
    setActiveCameraConfig,
}: Props) => {
    let [smoothTime, setSmoothTime] = useState<number>(1);
    useEffect(() => {
        cameraControlRef.current?.setLookAt(
            bgTextConfig.cameraPosition[0],
            bgTextConfig.cameraPosition[1],
            bgTextConfig.cameraPosition[2],
            bgTextConfig.position[0],
            bgTextConfig.position[1],
            bgTextConfig.position[2],
            false
        );
        setCanvasLoaded(true);
    }, []);

    useEffect(() => {
        if (canvasLoaded) {
            setTimeout(() => {
                setActiveCameraConfig(0);
            }, 1000);

            setTimeout(() => {
                setSmoothTime(0.25);
                setPageReady(true);
            }, 4000);
        }
    }, [canvasLoaded]);

    return (
        <CameraControls
            enabled={true}
            ref={cameraControlRef}
            smoothTime={smoothTime}
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
};

export default CameraController;
