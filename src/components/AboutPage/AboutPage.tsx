import React, { useContext, useState } from "react";
import "./AboutPage.scss";
import { HoverButton, RadioButton } from "../Buttons/Buttons";

import { useLocale } from "../../contexts/Locale/LocaleContext";
import { AboutMe, Skills } from "@/types";

type Props = {
    data: AboutMe;
    skills: Skills;
};

export default function AboutPage({ data, skills }: Props) {
    const [toggleSkill, setToggleSkill] = useState(data.relatedSkills.list[0].name);

    const { locale } = useLocale();

    let handleDownload = () => {
        let url = "/src/assets/pdf/resume.pdf";
        let fileName = "hothaikhanh-resume.pdf";

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
    };

    return (
        <div className="about-page">
            <div className="top-content ">
                <div className="pfp full-size">
                    <img src="/src/assets/img/pfp.png" alt="" />
                    <div className="filter"></div>
                </div>
                <div className="side-content">
                    <div className="desc">
                        <div className="row">
                            <div className="title">{data.desc.title[locale]}</div>
                            <div className="current-status">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                </svg>
                                <span>{data.desc.status[locale]}</span>
                            </div>
                        </div>

                        <div className="row">
                            <span className="introduction">{data.desc.greeting[locale]}</span>
                            <span className="my-name">{data.desc.myName[locale]}</span>
                        </div>
                        <div className="pfp mini-size">
                            <img src="/src/assets/img/pfp.png" alt="" />
                            <div className="filter"></div>
                        </div>
                        <div className="box">
                            <div className="job-title">
                                <span>{data.desc.jobTitle[0]}</span>
                                <span>{data.desc.jobTitle[1]}</span>
                            </div>
                            <div className="details">{data.desc.content[locale]}</div>
                        </div>
                    </div>

                    <HoverButton onClick={handleDownload} className="full-size">
                        <div className="download-cv ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px">
                                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                            </svg>
                            <span>{data.downloadBtn[locale]}</span>
                        </div>
                    </HoverButton>
                </div>
            </div>
            <div className="bottom-content">
                <div className="tech">
                    <div className="title">{data.skills.title[locale]}</div>
                    <div className="tech-list">
                        {skills.list.map((skill, index) => {
                            return (
                                <div className="tech-item" key={index}>
                                    <img src={`${skills.path}${skill.icon}`} alt="" />
                                    <span>{skill.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="related-tech">
                    <div className="title">{data.relatedSkills.title[locale]}</div>
                    <div className="content-container">
                        <div className="toggle-btns">
                            {data.relatedSkills.list.map((skill, index) => {
                                return (
                                    <RadioButton
                                        key={index}
                                        btnName={skill.name}
                                        btnGroup="relatedSkill"
                                        setToggleBtn={setToggleSkill}
                                        checked={toggleSkill == skill.name}
                                    >
                                        <span>{skill.title[locale]}</span>
                                    </RadioButton>
                                );
                            })}
                        </div>
                        <ul className="display-content">
                            {data.relatedSkills.list
                                .filter((skill) => {
                                    return skill.name == toggleSkill;
                                })[0]
                                .content[locale].map((line, index) => {
                                    return <li key={index}>{line}</li>;
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
