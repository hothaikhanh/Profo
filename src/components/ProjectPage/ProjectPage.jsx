import React, { useState } from "react";
import "./ProjectPage.scss";
import { HoverButton } from "../Buttons/Buttons";

export default function ProjectPage() {
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
    ];

    return (
        <div className="project-page">
            <div className="side-bar">
                <div className="project-info">
                    <h2 className="project-title">Lorem, ipsum dolor.</h2>
                    <p className="project-desc">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, voluptatibus! Lorem ipsum dolor
                        sit amet consectetur adipisicing elit. Animi placeat sunt dolore dolorum vitae officiis.
                        Distinctio ad mollitia expedita eveniet?
                    </p>
                </div>

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
            </div>
            <div className="main-content">
                <nav className="nav-btns">
                    <div className="btn-row">
                        <HoverButton>
                            <span>live view</span>
                        </HoverButton>
                        <HoverButton>
                            <span>github</span>
                        </HoverButton>
                    </div>

                    <div className="btn-row">
                        <HoverButton>
                            <span>Prev</span>
                        </HoverButton>
                        <HoverButton>
                            <span>Next</span>
                        </HoverButton>
                    </div>
                </nav>

                <div className="preview">
                    <img src="/src/assets/img/placeholder.jpg" alt="" />
                    <div className="filter"></div>
                </div>
            </div>
        </div>
    );
}
