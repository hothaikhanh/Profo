import ComputerModels from "@components/ComputerModels/ComputerModels";
import Floor from "@components/Floor/Floor";
import Page from "@components/Page/Page";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";
import DynamicSpotLight from "@components/DynamicSpotLight/DynamicSpotLight";
import { ScreenConfigs } from "@/types";
import { useLocale } from "@/contexts/Locale";
import { LocaleContext } from "@/contexts/Locale/Context";

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
    const { locale } = useLocale();

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
                        <LocaleContext.Provider value={{ locale }}>
                            <Page title={screen.pageTitle}>{screen.content}</Page>
                        </LocaleContext.Provider>
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
