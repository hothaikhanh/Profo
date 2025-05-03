import siteData from "@/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CSSProperties, ReactEventHandler, useEffect, useRef, useState } from "react";
import "./App.scss";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import MobileHistoryPage from "./components/HistoryPage/MobileHistoryPage";
import Page from "./components/Page/Page";
import ProjectListPage from "./components/ProjectListPage/ProjectListPage";
import SettingPage from "./components/SettingPage/SettingPage";
import { LocaleProvider, useLocale } from "./contexts/Locale/LocaleContext";
import { Locale } from "./types";

type TransitionType = "in" | "out" | null;

const MobileApp = () => {
    const { locale } = useLocale();
    const [topFrameHeight, setTopFrameHeight] = useState<number>(0);
    const [navBarHeight, setNavBarHeight] = useState<number>(0);
    const [bottomFrameHeight, setBottomFrameHeight] = useState<number>(0);
    const [titleFrameHeight, setTitleFrameHeight] = useState<number>(0);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [transitionType, setTransitionType] = useState<TransitionType>(null);
    const [selectedApp, setSelectedApp] = useState<number>(0);
    const [time, setTime] = useState<Date>(new Date());
    const [goBack, setGoBack] = useState<boolean>(false);
    const blockerRef = useRef<HTMLDivElement>(null);
    const blockerIconRef = useRef<HTMLDivElement>(null);
    const appContentRef = useRef<HTMLDivElement>(null);

    const sideFrameWidth = "7vw";
    const transitionDuration = 0.6;

    //set up interval for clock update
    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);
    //list up pages

    //transition animation
    useGSAP(() => {
        if (blockerRef.current && blockerIconRef.current) {
            if (transitionType == "in") {
                let transit = gsap.timeline();
                transit
                    .to(blockerRef.current, {
                        height: "100%",
                        ease: "power1.out",
                        duration: transitionDuration * 0.3,
                        onComplete: () => {
                            setCurrentPageIndex(selectedApp);
                        },
                    })
                    .fromTo(
                        blockerIconRef.current,
                        {
                            scale: 0,
                        },
                        {
                            scale: 1,
                            opacity: "1",
                            ease: "power1.out",
                            delay: 0.1,
                            duration: transitionDuration * 0.3,
                        },
                        "<"
                    )
                    .to(blockerRef.current, {
                        opacity: "0",
                        ease: "power1.out",
                        duration: transitionDuration * 0.3,
                        delay: transitionDuration * 0.4,
                    })
                    .to(
                        blockerIconRef.current,
                        {
                            opacity: "0",
                            ease: "power1.out",
                            duration: transitionDuration * 0.3,
                        },
                        "<"
                    )
                    .set(blockerRef.current, {
                        height: "0%",
                        opacity: "1",
                    })
                    .set(blockerIconRef.current, {
                        opacity: "0",
                        onComplete: () => {
                            setTransitionType(null);
                        },
                    });
            } else if (transitionType == "out") {
                let transit = gsap.timeline();
                transit
                    .fromTo(
                        blockerRef.current,
                        {
                            height: "100%",
                            opacity: "0",
                        },
                        {
                            opacity: "1",
                            duration: transitionDuration * 0.3,
                            ease: "power1.out",
                        }
                    )
                    .fromTo(
                        blockerIconRef.current,
                        {
                            opacity: "0",
                        },
                        {
                            opacity: "1",
                            duration: transitionDuration * 0.3,
                            ease: "power1.out",
                        },
                        "<"
                    )
                    .to(blockerIconRef.current, {
                        scale: 0,
                        opacity: "0",
                        duration: transitionDuration * 0.2,
                        delay: transitionDuration * 0.3,
                        ease: "power1.out",
                        onComplete: () => {
                            setCurrentPageIndex(0);
                        },
                    })
                    .to(
                        blockerRef.current,
                        {
                            height: "0%",
                            duration: transitionDuration * 0.3,
                            ease: "power1.out",
                        },
                        "<0.2"
                    )

                    .set(blockerRef.current, {
                        opacity: "1",
                    })
                    .set(blockerIconRef.current, {
                        scale: 0,
                        opacity: "1",

                        onComplete: () => {
                            setTransitionType(null);
                        },
                    });
            }
        }
    }, [transitionType]);

    const handleOpenApp = (index: number) => {
        setSelectedApp(index);
        setTransitionType("in");
    };

    const handleCloseApp = () => {
        if (currentPageIndex !== 0) setTransitionType("out");
    };

    const handleGoBack = () => {
        if (currentPageIndex == 2) {
            setGoBack(!goBack);
        } else {
            handleCloseApp();
        }
    };

    const pages = [
        {
            index: 0,
            displayName: () => siteData.home.title[locale],
            content: null,
        },
        {
            index: 1,
            displayName: () => siteData.aboutMe.title[locale],
            content: (
                <>
                    <AboutPage data={siteData.aboutMe} skills={siteData.skills} />
                    <MobileHistoryPage data={siteData.workHistory} />
                </>
            ),
            icon: (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M0,0V24H24V0ZM12,4.5A3.75,3.75,0,1,1,8.26,8.24,3.72,3.72,0,0,1,12,4.5Zm5.55,15H6.46a.88.88,0,0,1-1-1,5.17,5.17,0,0,1,5.26-5,28.51,28.51,0,0,1,3.46.1,5.08,5.08,0,0,1,4.38,5.06A.87.87,0,0,1,17.58,19.5Z" />
                            </g>
                        </g>
                    </svg>
                </>
            ),
        },
        {
            index: 2,
            displayName: () => {
                return locale == "EN" ? "Projects" : "Dự án";
            },

            content: (
                <ProjectListPage
                    data={siteData.projectPages}
                    skills={siteData.skills}
                    bottomFrameHeight={bottomFrameHeight}
                    sideFrameWidth={sideFrameWidth}
                    goBack={goBack}
                    handleCloseApp={handleCloseApp}
                />
            ),
            icon: (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M0,0V24H24V0ZM8.34,14a.73.73,0,0,1-.26,1.28,1,1,0,0,1-.74-.19c-.89-.84-1.75-1.72-2.61-2.59a.74.74,0,0,1,0-1.08c.86-.87,1.73-1.74,2.6-2.6a.73.73,0,0,1,1.07,0,.77.77,0,0,1,0,1.08c-.58.59-1.17,1.17-1.76,1.74a3,3,0,0,1-.34.26Zm5.56-6c-.88,3.07-1.75,6.13-2.63,9.19a1.09,1.09,0,0,1,0,.17.76.76,0,0,1-.9.55.72.72,0,0,1-.53-.9c.12-.55.29-1.08.45-1.62q1.24-4.38,2.5-8.75a1.11,1.11,0,0,1,.2-.44.68.68,0,0,1,.81-.22c.33.11.48.37.48.81S14,7.64,13.9,8.07Zm5.38,4.45c-.86.89-1.74,1.76-2.62,2.63a.74.74,0,0,1-1.05,0,.76.76,0,0,1,0-1.08c.58-.6,1.18-1.18,1.78-1.77a2.07,2.07,0,0,1,.35-.22L15.65,10a.75.75,0,0,1,.24-1.28.71.71,0,0,1,.76.17l2.63,2.63A.74.74,0,0,1,19.28,12.52Z" />
                            </g>
                        </g>
                    </svg>
                </>
            ),
        },
        {
            index: 3,
            displayName: () => siteData.contact.title[locale],
            content: <ContactPage data={siteData.contact} />,
            icon: (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M0,0V24H24V0ZM17.34,17.63H6.58A1.9,1.9,0,0,1,4.5,15.56V10.21c0-.14,0-.27,0-.5l6.25,4.67a1.8,1.8,0,0,0,2.41,0l.19-.14,5.45-4.08.62-.45c0,.22,0,.37,0,.52V15.5A1.92,1.92,0,0,1,17.34,17.63ZM18.77,9l-5.89,4.44c-.75.56-1,.57-1.74,0L5.22,9a1.43,1.43,0,0,1-.65-1.66,1.44,1.44,0,0,1,1.5-1H17.9A1.41,1.41,0,0,1,18.77,9Z" />
                            </g>
                        </g>
                    </svg>
                </>
            ),
        },
        {
            index: 4,
            displayName: () => siteData.setting.title[locale],
            content: <SettingPage data={siteData.setting} />,
            icon: (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M12,9.61A2.39,2.39,0,1,0,14.39,12,2.42,2.42,0,0,0,12,9.61Z" />
                                <path d="M0,0V24H24V0ZM19.06,14.75c-.36.65-.73,1.29-1.11,1.93A.74.74,0,0,1,17,17l-.27-.08c-1.3-.42-1.3-.42-2.42.29a.56.56,0,0,0-.2.33c-.11.43-.19.86-.28,1.3a.7.7,0,0,1-.7.65c-.75,0-1.5,0-2.26,0a.71.71,0,0,1-.7-.66l0-.18a1.94,1.94,0,0,0-1.39-2,.94.94,0,0,0-.52-.06c-.42.1-.81.25-1.22.38a.75.75,0,0,1-1-.3q-.57-.95-1.11-1.92a.69.69,0,0,1,.2-.9l.22-.18c1-.9,1-.9,1-2.22a.68.68,0,0,0-.19-.4c-.31-.31-.64-.61-1-.9A.72.72,0,0,1,5,9.2c.35-.63.7-1.27,1.1-1.88A2.24,2.24,0,0,1,6.6,6.9c.55.17,1,.3,1.48.47a1,1,0,0,0,.79-.09,2,2,0,0,0,1.27-1.93A.81.81,0,0,1,11,4.5c.71,0,1.41,0,2.12,0a.69.69,0,0,1,.68.62c0,.12,0,.25.07.37.28,1.27.28,1.27,1.43,1.87a.66.66,0,0,0,.44,0c.41-.11.81-.25,1.21-.38a.74.74,0,0,1,1,.28,21.06,21.06,0,0,1,1.12,2,1,1,0,0,1-.13.73c-.08.16-.27.26-.41.39-.95.86-1,.86-.86,2.14a.67.67,0,0,0,.22.39c.31.31.64.6,1,.89A.67.67,0,0,1,19.06,14.75Z" />
                            </g>
                        </g>
                    </svg>
                </>
            ),
        },
    ];
    return (
        <LocaleProvider>
            <div id="mobile-container">
                <img src="/src/assets/img/side.png" alt="" className="frame-left" />
                <img src="/src/assets/img/side.png" alt="" className="frame-right" />
                <img
                    src="/src/assets/img/top.png"
                    alt=""
                    className="frame-top"
                    onLoad={(e: any) => setTopFrameHeight(e.target.clientHeight * 0.2)}
                />
                <img
                    src="/src/assets/img/bottom.png"
                    alt=""
                    className="frame-bottom"
                    onLoad={(e: any) => {
                        setBottomFrameHeight(e.target.clientHeight * 0.2);
                        setNavBarHeight(e.target.clientHeight * 0.19);
                        setTitleFrameHeight(e.target.clientHeight * 0.14);
                    }}
                />
                <Page
                    className="mobile"
                    style={{
                        height: "calc(100vh - " + navBarHeight + "px)",
                    }}
                >
                    <TopBar
                        time={time}
                        style={{
                            paddingTop: topFrameHeight + "px",
                            paddingLeft: sideFrameWidth,
                            paddingRight: sideFrameWidth,
                        }}
                    ></TopBar>

                    {currentPageIndex == 0 ? (
                        <div
                            className="home-page"
                            style={{
                                paddingLeft: sideFrameWidth,
                                paddingRight: sideFrameWidth,
                                paddingBottom: bottomFrameHeight,
                            }}
                        >
                            <TimeDisplay time={time} locale={locale} />

                            <div className={"app-list"}>
                                {pages.map((page, index) => {
                                    return <AppItem data={page} key={index} handleOpenApp={handleOpenApp}></AppItem>;
                                })}
                            </div>
                        </div>
                    ) : (
                        <div
                            className="app-content"
                            ref={appContentRef}
                            style={{
                                paddingLeft: sideFrameWidth,
                                paddingRight: sideFrameWidth,
                                paddingBottom: bottomFrameHeight,
                            }}
                        >
                            {pages.filter((page) => page.index == currentPageIndex)[0].content}
                        </div>
                    )}

                    <div className="blocker" ref={blockerRef}></div>
                    <div className="blocker-icon" ref={blockerIconRef}>
                        <AppItem data={pages[currentPageIndex]}></AppItem>
                    </div>
                </Page>

                <div
                    className="title-display"
                    style={{ marginBottom: navBarHeight + "px", height: titleFrameHeight + "px" }}
                >
                    <span> {pages[currentPageIndex].displayName()}</span>
                </div>

                <div className="mobile-nav-bar" style={{ height: navBarHeight + "px", padding: "0 10vw" }}>
                    <NavBtn onClick={handleGoBack} imageUrl={"/src/assets/img/btn-back.png"} textDisplay="Back" />
                    <NavBtn onClick={handleCloseApp} imageUrl={"/src/assets/img/btn-home.png"} textDisplay="Home" />
                    <NavBtn onClick={handleCloseApp} imageUrl={"/src/assets/img/btn-menu.png"} textDisplay="Recent" />
                </div>
            </div>
        </LocaleProvider>
    );
};

function AppItem({ data, handleOpenApp = () => {} }: { data: any; handleOpenApp?: (index: number) => void }) {
    if (data.content) {
        return (
            <div className="app-item" onClick={() => handleOpenApp(data.index)}>
                {data.icon}
                <span>{data.displayName()}</span>
            </div>
        );
    } else {
        return null;
    }
}

function TimeDisplay({ time, locale }: { time: Date; locale: Locale }) {
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h12",
    };

    const month = time.getMonth();
    const monthNames = {
        EN: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        VN: [
            "Tháng một",
            "Tháng hai",
            "Tháng ba",
            "Tháng tư",
            "Tháng năm",
            "Tháng sáu",
            "Tháng bảy",
            "Tháng tám",
            "Tháng chín",
            "Tháng mười",
            "Tháng mười một",
            "Tháng mười hai",
        ],
    };

    const weekday = time.getDay();
    const weekdayNames = {
        EN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        VN: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
    };

    const monthDate = time.getDate();
    const year = time.getFullYear();

    return (
        <div className="time-display">
            <div className="date">
                {weekdayNames[locale][weekday]}, {monthDate} {monthNames[locale][month]} {year}
            </div>
            <div className="time">{time.toLocaleTimeString("en-US", timeOptions)}</div>
        </div>
    );
}

function TopBar({ time, style }: { time: Date; style: CSSProperties }) {
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h12",
    };
    return (
        <div className="top-bar" style={style}>
            <div className="time">{time.toLocaleTimeString("en-US", timeOptions)}</div>
            <div className="power-display">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M576 0c17.7 0 32 14.3 32 32l0 448c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-448c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352c0-17.7 14.3-32 32-32zM352 224l0 256c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM96 416l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M464 160c8.8 0 16 7.2 16 16l0 160c0 8.8-7.2 16-16 16L80 352c-8.8 0-16-7.2-16-16l0-160c0-8.8 7.2-16 16-16l384 0zM80 96C35.8 96 0 131.8 0 176L0 336c0 44.2 35.8 80 80 80l384 0c44.2 0 80-35.8 80-80l0-16c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-16c0-44.2-35.8-80-80-80L80 96zm368 96L96 192l0 128 352 0 0-128z" />
                </svg>
                <span>100%</span>
            </div>
        </div>
    );
}

function NavBtn({
    onClick,
    imageUrl,
    textDisplay,
}: {
    onClick: ReactEventHandler;
    imageUrl: string;
    textDisplay: string;
}) {
    const [isClicking, setClicking] = useState(false);

    const handleMouseDown = () => {
        setClicking(true);
    };
    useEffect(() => {
        setTimeout(() => {
            setClicking(false);
        }, 200);
    }, [isClicking]);

    return (
        <div
            className={"mobile-nav-btn " + (isClicking ? "clicked" : "")}
            onClick={onClick}
            onMouseDown={handleMouseDown}
        >
            <span>{textDisplay}</span>
            <div className="button-container">
                <div className="darken"></div>
                <img src={imageUrl} alt="" />
            </div>
        </div>
    );
}

export default MobileApp;
