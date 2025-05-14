import { useGSAP } from "@gsap/react";
import { Html, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useRef } from "react";

type Props = any;

const ScreenContainer = ({
    screenPosition,
    screenRotation,
    setActiveCameraConfig,
    setSpotLightScreenIndex,
    screenIndex,
    activeCameraConfig,
    scale,
    children,
    title = null,
}: Props) => {
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
                portal={{ current: gl.domElement.parentNode as HTMLElement }}
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
};

export default ScreenContainer;
