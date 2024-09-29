import React, { useState, useContext } from "react";
import "./HistoryPage.scss";
import { RadioButton } from "../Buttons/Buttons";

import { LanguageContext } from "../Contexts/LanguageContext";

export default function HistoryPage({ data }) {
    const [toggleItem, setToggleItem] = useState(data.list[0].id);
    const lang = useContext(LanguageContext);

    return (
        <div className="history-page">
            <div className="left-content">
                {data.list.map((entry) => {
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
                                role={entry.jobTitle}
                            />
                        </RadioButton>
                    );
                })}
            </div>
            <div className="right-content">
                <div className="content-container">
                    {data.list
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
                                    <p>{entry.jobTitle}</p>
                                    <hr />
                                    <p>{entry.duties.title[lang]}</p>
                                    {entry.duties.content[lang].map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}

                                    {entry.achievement.content[lang].length > 0 ? (
                                        <p>{entry.achievement.title[lang]}</p>
                                    ) : null}
                                    {entry.achievement.content[lang].map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}

                                    <br />
                                    <p>{entry.contact.title[lang]}</p>
                                    <li>
                                        {entry.contact.jobTitle[lang]}: {entry.contact.name[lang]} -{" "}
                                        {entry.contact.mail}
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
