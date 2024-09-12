import React, { useState } from "react";
import "./HistoryPage.scss";
import { RadioButton } from "../Buttons/Buttons";

export default function HistoryPage() {
    const workHistory = [
        {
            companyName: "Digital Education Solution",
            id: "DES",
            startYear: 2018,
            endYear: 2021,
            role: "Instructional Designer",
            duties: [
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. ",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
            ],
            achievement: [],
            contact: {
                name: "John Doe",
                role: "Direct Manager",
                mail: "somemail@mail.com",
            },
        },
        {
            companyName: "Viettel Software Services",
            id: "VSS",
            startYear: 2021,
            endYear: 2023,
            role: "Instructional Designer",
            duties: [
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. ",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. ",
            ],
            achievement: [
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
                "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
            ],
            contact: {
                name: "Peter",
                role: "Direct Manager",
                mail: "somemailagain@mail.com",
            },
        },
    ];
    const [toggleItem, setToggleItem] = useState(workHistory[0].id);

    return (
        <div className="history-page">
            <div className="left-content">
                {workHistory.map((entry) => {
                    return (
                        <RadioButton
                            key={entry.id}
                            btnName={entry.id}
                            btnGroup="workHistory"
                            setToggleBtn={setToggleItem}
                            checked={toggleItem == entry.id}
                        >
                            <WorkEntry
                                company={entry.companyName}
                                startYear={entry.startYear}
                                endYear={entry.endYear}
                                role={entry.role}
                            />
                        </RadioButton>
                    );
                })}
            </div>
            <div className="right-content">
                <div className="content-container">
                    {workHistory
                        .filter((entry) => {
                            return entry.id == toggleItem;
                        })
                        .map((entry, index) => {
                            return (
                                <div key={index}>
                                    <h1>{entry.companyName}</h1>
                                    <h3>
                                        {entry.startYear} - {entry.endYear}
                                    </h3>
                                    <p>{entry.role}</p>
                                    <hr />
                                    <p>Responsibilities</p>
                                    {entry.duties.map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}

                                    {entry.achievement.length > 0 ? <p>Achievements</p> : null}
                                    {entry.achievement.map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}

                                    <br />
                                    <p>Contact</p>
                                    <li>
                                        {entry.contact.role}: {entry.contact.name} - {entry.contact.mail}
                                    </li>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

function WorkEntry({ company, startYear, endYear, role }) {
    return (
        <div className="work-entry">
            <span className="company-name">{company}</span>
            <span className="time">
                {startYear} - {endYear}
            </span>
            <span className="role">{role}</span>
        </div>
    );
}
