import { Coordinate } from "@/types";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SpotLight } from "three";

type Props = any;

const DynamicSpotLight = ({ screenConfigs, spotLightScreenIndex, activeCameraConfig }: Props) => {
    const spotlight = useRef<SpotLight>(null);
    const target = useRef<any>(null);
    const lightTarget = useRef<any>(null);
    const idlePosition: Coordinate = [0, 0, 0];
    const lightIntensity = 10;
    const lightDistance = 30;

    useEffect(() => {
        if (spotlight.current) {
            spotlight.current.target = lightTarget.current;
        }
    }, []);

    useEffect(() => {
        if (spotLightScreenIndex !== -1 && spotLightScreenIndex !== null) {
            target.current.position.x = screenConfigs[spotLightScreenIndex].position[0];
            target.current.position.y = screenConfigs[spotLightScreenIndex].position[1];
            target.current.position.z = screenConfigs[spotLightScreenIndex].position[2];
        }
    }, [spotLightScreenIndex]);

    useGSAP(() => {
        if (spotLightScreenIndex !== -1 && spotLightScreenIndex !== null && activeCameraConfig === 0) {
            gsap.to(spotlight.current, { intensity: lightIntensity, distance: lightDistance, duration: 0.3 });
        }
    }, [spotLightScreenIndex]);

    //fade the spotlight when a screen is active
    useGSAP(() => {
        if (activeCameraConfig !== 0) {
            gsap.to(spotlight.current, { intensity: 0, distance: 0, duration: 0.5, delay: 0.5 });
            gsap.to(lightTarget.current.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.3,
            });
        }
    }, [activeCameraConfig]);

    useFrame(() => {
        lightTarget.current.position.lerp(target.current.position, 0.1);
        spotlight.current?.target.updateMatrixWorld();
    });

    // useHelper(spotlight, THREE.SpotLightHelper, "white");
    // useHelper(target, , "white");
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

    return (
        <>
            <mesh ref={target} position={idlePosition}></mesh>
            <mesh ref={lightTarget} position={idlePosition}></mesh>
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
        </>
    );
};

export default DynamicSpotLight;
