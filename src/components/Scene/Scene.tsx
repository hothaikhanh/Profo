import ComputerModels from "@components/ComputerModels/ComputerModels";
import Floor from "@components/Floor/Floor";
import Page from "@components/Page/Page";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";
import DynamicSpotLight from "@components/DynamicSpotLight/DynamicSpotLight";
import { ScreenConfigs } from "@/types";

type Props = {
    screenConfigs: ScreenConfigs;
    activeCameraConfig: number | null;
    spotLightScreenIndex: number | null;
    setActiveCameraConfig: (id: number | null) => void;
    setSpotLightScreenIndex: (id: number | null) => void;
};

const Scene = ({
    screenConfigs,
    activeCameraConfig,
    spotLightScreenIndex,
    setActiveCameraConfig,
    setSpotLightScreenIndex,
}: Props) => {
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
            {/* <DynamicSpotLight
                screenConfigs={screenConfigs}
                spotLightScreenIndex={spotLightScreenIndex}
                activeCameraConfig={activeCameraConfig}
            /> */}
            <ComputerModels scale={1} position={[0, -3, 0]} />
            <Floor></Floor>
        </>
    );
};

export default Scene;
