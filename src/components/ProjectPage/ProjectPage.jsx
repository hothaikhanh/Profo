import React, { useState, useContext } from "react";
import "./ProjectPage.scss";
import { AnchorButton, HoverButton } from "../Buttons/Buttons";
import { LanguageContext } from "../Contexts/LanguageContext";

export default function ProjectPage({ data, skills }) {
    const lang = useContext(LanguageContext);

    return (
        <div className="project-page">
            <div className="side-bar">
                <div className="project-info">
                    <h2 className="project-title">{data.projectName}</h2>
                    <p className="project-desc">{data.desc[lang]}</p>
                </div>

                <div className="tech">
                    <div className="title">{data.techStack.title[lang]}</div>
                    <div className="tech-list">
                        {skills.list
                            .filter((skill) => {
                                return data.techStack.list.includes(skill.name);
                            })
                            .map((tech, index) => {
                                return (
                                    <div className="tech-item" key={index}>
                                        <img src={`${skills.path}${tech.icon}`} alt="" />
                                        <span>{tech.name}</span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="preview">
                    <img src={data.imageUrl} alt="" />
                </div>
                <nav className="nav-btns">
                    <div className="btn-row">
                        <AnchorButton href={data.liveViewUrl}>
                            <span>demo</span>
                        </AnchorButton>
                        <AnchorButton href={data.gitHubUrl}>
                            <span>github</span>
                        </AnchorButton>
                    </div>
                </nav>
            </div>
        </div>
    );
}
