import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type Props = any;

const ScrollController = ({ activeCameraConfig, setActiveCameraConfig, cameraConfigs }: Props) => {
    const scrollData = useScroll();
    let allowScroll = useRef<boolean>(false);
    let prevScroll = useRef<number | null>(null);
    let currentScroll = useRef<number | null>(null);

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
        if (scrollData.delta !== 0 && allowScroll.current === false) {
            allowScroll.current = true;
            prevScroll.current = scrollData.offset;
            // console.log("START from: " + data.offset);
        } else if (scrollData.delta !== 0 && currentScroll.current == null) {
            currentScroll.current = scrollData.offset;
            if (prevScroll.current && currentScroll.current > prevScroll.current) {
                nextScreen();
                // console.log("GOING DOWN: " + currentScroll.current + " -> " + prevScroll.current);
            } else {
                prevScrren();
                // console.log("GOING UP: " + currentScroll.current + " -> " + prevScroll.current);
            }
        } else if (scrollData.delta == 0 && allowScroll.current === true) {
            allowScroll.current = false;
            // console.log("END at: " + data.offset);
            prevScroll.current = null;
            currentScroll.current = null;
        }
    });

    return null;
};

export default ScrollController;
