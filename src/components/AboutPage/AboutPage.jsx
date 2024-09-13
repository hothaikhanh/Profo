import React, { useRef, useState } from "react";
import "./AboutPage.scss";
import { HoverButton, RadioButton } from "../Buttons/Buttons";

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

    const relatedSkills = [
        {
            name: "English",
            content: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, non!",
                "English English  English",
            ],
        },

        {
            name: "Graphic Design",
            content: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, non!",
                "Graphic Design Graphic Design Graphic Design",
            ],
        },
        {
            name: "Video Editing",
            content: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, non!",
                "Video Editing Video Editing Video Editing",
            ],
        },
    ];
    const [toggleSkill, setToggleSkill] = useState(relatedSkills[0].name);

    return (
        <div className="about-page">
            <div className="top-content ">
                <div className="pfp">
                    <img src="/src/assets/img/pfp-4.png" alt="" />
                    <div className="filter"></div>
                </div>
                <div className="side-content">
                    {/*  */}
                    <div className="desc">
                        <div className="row">
                            <div className="title">about me</div>
                            <div className="current-status">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                </svg>
                                <span>looking for work</span>
                            </div>
                        </div>
                        <div className="row">
                            <span className="introduction">hi. i'm</span>
                            <span className="my-name">ho thai khanh</span>
                        </div>
                        <div className="box">
                            <div className="job-title">frontend developer</div>
                            <div className="details">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                                hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
                                ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.{" "}
                            </div>
                        </div>
                    </div>

                    <HoverButton>
                        <div className="download-cv">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px">
                                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                            </svg>
                            <span>download cv</span>
                        </div>
                    </HoverButton>
                </div>
            </div>
            <div className="bottom-content">
                <div className="tech">
                    <div className="title">technologies</div>
                    <div className="tech-list">
                        {technologies.map((tech, index) => {
                            return (
                                <div className="tech-item" key={index}>
                                    <img src={`${techIconURL}${tech.icon}`} alt="" />
                                    <span>{tech.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="related-tech">
                    <div className="title">related skills</div>
                    <div className="content-container">
                        <div className="toggle-btns">
                            {relatedSkills.map((skill, index) => {
                                return (
                                    <RadioButton
                                        key={index}
                                        btnName={skill.name}
                                        btnGroup="relatedSkill"
                                        setToggleBtn={setToggleSkill}
                                        checked={toggleSkill == skill.name}
                                    >
                                        <span>{skill.name}</span>
                                    </RadioButton>
                                );
                            })}
                        </div>
                        <ul className="display-content">
                            {relatedSkills
                                .filter((skill) => {
                                    return skill.name == toggleSkill;
                                })[0]
                                .content.map((line, index) => {
                                    return <li key={index}>{line}</li>;
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
