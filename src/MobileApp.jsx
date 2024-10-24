import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useState, useRef, useEffect, useContext, createContext } from "react";
import Page from "./components/Page/Page";
import AboutPage from "./components/AboutPage/AboutPage";
import MobileHistoryPage from "./components/HistoryPage/MobileHistoryPage";
import ContactPage from "./components/ContactPage/ContactPage";
import SettingPage from "./components/SettingPage/SettingPage";

import { LanguageContext } from "./components/Contexts/LanguageContext";

import "./App.scss";

import data from "/src/resources.json";
import ProjectListPage from "./components/ProjectListPage/ProjectListPage";

function MobileApp() {
    const [topFrameHeight, setTopFrameHeight] = useState(0);
    const [bottomFrameHeight, setBottomFrameHeight] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [transitionType, setTransitionType] = useState(null);
    const transitionDuration = 0.6;

    let [selectedApp, setSelectedApp] = useState(0);
    const [lang, setLang] = useState("EN");

    const [time, setTime] = useState(new Date());
    const [goBack, setGoBack] = useState(false);

    //set up interval for clock update
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);
    //list up pages

    //transition animation
    useGSAP(() => {
        if (transitionType == "in") {
            let transit = gsap.timeline();
            transit
                .to(blocker.current, {
                    height: "100%",
                    ease: "power1.out",
                    duration: transitionDuration * 0.3,
                    onComplete: () => {
                        setCurrentPageIndex(selectedApp);
                    },
                })
                .fromTo(
                    blockerIcon.current,
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
                .to(blocker.current, {
                    opacity: "0",
                    ease: "power1.out",
                    duration: transitionDuration * 0.3,
                    delay: transitionDuration * 0.4,
                })
                .to(
                    blockerIcon.current,
                    {
                        opacity: "0",
                        ease: "power1.out",
                        duration: transitionDuration * 0.3,
                    },
                    "<"
                )
                .set(blocker.current, {
                    height: "0%",
                    opacity: "1",
                })
                .set(blockerIcon.current, {
                    opacity: "0",
                    onComplete: () => {
                        setTransitionType(null);
                    },
                });
        } else if (transitionType == "out") {
            let transit = gsap.timeline();
            transit
                .fromTo(
                    blocker.current,
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
                    blockerIcon.current,
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
                .to(blockerIcon.current, {
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
                    blocker.current,
                    {
                        height: "0%",
                        duration: transitionDuration * 0.3,
                        ease: "power1.out",
                    },
                    "<0.2"
                )

                .set(blocker.current, {
                    opacity: "1",
                })
                .set(blockerIcon.current, {
                    scale: 0,
                    opacity: "1",

                    onComplete: () => {
                        setTransitionType(null);
                    },
                });
        }
    }, [transitionType]);

    const handleOpenApp = (index) => {
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

    const blocker = useRef();
    const blockerIcon = useRef();
    const appContent = useRef();
    const pages = [
        {
            index: 0,
            displayName: () => data.home.title[lang],
            content: null,
        },
        {
            index: 1,
            displayName: () => data.aboutMe.title[lang],
            content: (
                <>
                    <AboutPage data={data.aboutMe} skills={data.skills} />
                    <MobileHistoryPage data={data.workHistory} />
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
                return lang == "EN" ? "Projects" : "Dự án";
            },

            content: (
                <ProjectListPage
                    data={data.projectPages}
                    skills={data.skills}
                    bottomFrameHeight={bottomFrameHeight}
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
            displayName: () => data.contact.title[lang],
            content: <ContactPage data={data.contact} />,
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
            displayName: () => data.setting.title[lang],
            content: <SettingPage data={data.setting} setLang={setLang} />,
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
        <LanguageContext.Provider value={lang}>
            <div id="mobile-container">
                <img src="/src/assets/img/side.png" alt="" className="frame-left" />
                <img src="/src/assets/img/side.png" alt="" className="frame-right" />
                <img
                    src="/src/assets/img/top.png"
                    alt=""
                    className="frame-top"
                    onLoad={(e) => setTopFrameHeight(e.target.clientHeight)}
                />
                <img
                    src="/src/assets/img/bottom.png"
                    alt=""
                    className="frame-bottom"
                    onLoad={(e) => setBottomFrameHeight(e.target.clientHeight)}
                />
                <Page
                    className="mobile"
                    style={{
                        height: "calc(100vh - " + bottomFrameHeight * 0.38 + "px)",
                        paddingTop: topFrameHeight / 5 + "px",
                    }}
                >
                    <TopBar time={time}></TopBar>

                    <div className="app-content" ref={appContent}>
                        {pages.filter((page) => page.index == currentPageIndex)[0].content}
                    </div>

                    {currentPageIndex == 0 && (
                        <>
                            <TimeDisplay time={time} setTime={setTime} lang={lang} />

                            <div className={"app-list"} style={{ paddingBottom: topFrameHeight / 5 + "px" }}>
                                {pages.map((page, index) => {
                                    return <AppItem data={page} key={index} handleOpenApp={handleOpenApp}></AppItem>;
                                })}
                            </div>
                        </>
                    )}

                    <div className="blocker" ref={blocker}></div>
                    <div className="blocker-icon" ref={blockerIcon}>
                        <AppItem data={pages[currentPageIndex]}></AppItem>
                    </div>
                </Page>

                <div className="title-display" style={{ paddingBottom: bottomFrameHeight * 0.32 + "px" }}>
                    <span> {pages[currentPageIndex].displayName()}</span>
                </div>

                <div
                    className="mobile-nav-bar"
                    style={{ height: bottomFrameHeight * 0.28 + "px", padding: "1vh 10vw" }}
                >
                    <NavBtn onClick={handleGoBack} imageUrl={"/src/assets/img/btn-back.png"} />
                    <NavBtn onClick={handleCloseApp} imageUrl={"/src/assets/img/btn-home.png"} />
                    <NavBtn onClick={handleCloseApp} imageUrl={"/src/assets/img/btn-menu.png"} />
                </div>
            </div>
        </LanguageContext.Provider>
    );
}

export default MobileApp;

function AppItem({ data, handleOpenApp = () => {} }) {
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

function TimeDisplay({ time, lang }) {
    const timeOptions = {
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
                {weekdayNames[lang][weekday]}, {monthDate} {monthNames[lang][month]} {year}
            </div>
            <div className="time">{time.toLocaleTimeString("en-US", timeOptions)}</div>
        </div>
    );
}

function TopBar({ time }) {
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",

        hourCycle: "h12",
    };
    return (
        <div className="top-bar">
            <div className="time">{time.toLocaleTimeString("en-US", timeOptions)}</div>
            {/* <span className="site-name">hothaikhanh.dev</span> */}
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

function NavBtn({ onClick, imageUrl }) {
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
            <div className="darken"></div>
            <img src={imageUrl} alt="" />
        </div>
    );
}
