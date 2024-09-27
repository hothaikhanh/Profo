import React, { useContext, useState } from "react";
import "./AboutPage.scss";
import { HoverButton, RadioButton } from "../Buttons/Buttons";
import data from "/src/resources.json";

import { LanguageContext } from "../Contexts/LanguageContext";

export default function AboutPage() {
    const techIconURL = "/src/assets/icons/tech_logos/";
    const technologies = [
        {
            name: "Javascript",
            icon: "js.svg",
        },
        {
            name: "ReactJs",
            icon: "reactjs.svg",
        },
        {
            name: "NodeJs",
            icon: "nodejs.svg",
        },
        {
            name: "Vite",
            icon: "vite.svg",
        },
        {
            name: "Express",
            icon: "express.svg",
        },

        {
            name: "AngularJs",
            icon: "angular.svg",
        },
        {
            name: "Tailwind",
            icon: "tailwind.svg",
        },
        {
            name: "Git",
            icon: "git.svg",
        },
        {
            name: "ThreeJs",
            icon: "threejs.svg",
        },
        {
            name: "Html",
            icon: "html.svg",
        },
        {
            name: "CSS",
            icon: "css.svg",
        },
        {
            name: "SASS",
            icon: "sass.svg",
        },
        {
            name: "Figma",
            icon: "figma.svg",
        },
    ];

    const [toggleSkill, setToggleSkill] = useState(data.aboutMe.relatedSkills.list[0].name);

    const lang = useContext(LanguageContext);

    return (
        <div className="about-page">
            <div className="top-content ">
                <div className="pfp">
                    <img src="/src/assets/img/pfp.png" alt="" />
                    <div className="filter"></div>
                </div>
                <div className="side-content">
                    <div className="desc">
                        <div className="row">
                            {/* <div className="title">{data.aboutMe.desc.title[lang]}</div> */}
                            <div className="current-status">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                </svg>
                                <span>{data.aboutMe.desc.status.looking[lang]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <span className="introduction">{data.aboutMe.desc.greeting[lang]}</span>
                            <span className="my-name">{data.aboutMe.desc.myName[lang]}</span>
                        </div>
                        <div className="box">
                            <div className="job-title">{data.aboutMe.desc.jobTitle[lang]}</div>
                            <div className="details">{data.aboutMe.desc.content[lang]}</div>
                        </div>
                    </div>

                    <HoverButton>
                        <div className="download-cv">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px">
                                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                            </svg>
                            <span>{data.aboutMe.downloadBtn[lang]}</span>
                        </div>
                    </HoverButton>
                </div>
            </div>
            <div className="bottom-content">
                <div className="tech">
                    <div className="title">{data.aboutMe.techs.title[lang]}</div>
                    <div className="tech-list">
                        {data.aboutMe.techs.list.map((tech, index) => {
                            return (
                                <div className="tech-item" key={index}>
                                    <img src={`${data.aboutMe.techs.techIconURL}${tech.icon}`} alt="" />
                                    <span>{tech.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="related-tech">
                    <div className="title">{data.aboutMe.relatedSkills.title[lang]}</div>
                    <div className="content-container">
                        <div className="toggle-btns">
                            {data.aboutMe.relatedSkills.list.map((skill, index) => {
                                return (
                                    <RadioButton
                                        key={index}
                                        btnName={skill.name}
                                        btnGroup="relatedSkill"
                                        setToggleBtn={setToggleSkill}
                                        checked={toggleSkill == skill.name}
                                    >
                                        <span>{skill.title[lang]}</span>
                                    </RadioButton>
                                );
                            })}
                        </div>
                        <ul className="display-content">
                            {data.aboutMe.relatedSkills.list
                                .filter((skill) => {
                                    return skill.name == toggleSkill;
                                })[0]
                                .content[lang].map((line, index) => {
                                    return <li key={index}>{line}</li>;
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
