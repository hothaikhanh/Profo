import React, { useState, useContext } from "react";
import "./HistoryPage.scss";
import { RadioButton } from "../Buttons/Buttons";

import { useLocale } from "@/contexts/Locale";
import { WorkHistory } from "@/types";

type Props = {
    data: WorkHistory;
};

export default function HistoryPage({ data }: Props) {
    const [toggleItem, setToggleItem] = useState(data.list[0].id);
    const { locale } = useLocale();

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
                                    <p>{entry.duties.title[locale]}</p>
                                    {entry.duties.content[locale].map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}

                                    {entry.achievement.content[locale].length > 0 ? (
                                        <p>{entry.achievement.title[locale]}</p>
                                    ) : null}
                                    {entry.achievement.content[locale].map((line, index) => {
                                        return <li key={index}>{line}</li>;
                                    })}
                                    {entry.contact && (
                                        <>
                                            <p>{entry.contact.title[locale]}</p>
                                            <li>
                                                {entry.contact.jobTitle[locale]}: {entry.contact.name[locale]} -{" "}
                                                {entry.contact.mail}
                                            </li>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

type WorkEntryProps = {
    company: WorkHistory["list"][0]["companyName"];
    startYear: WorkHistory["list"][0]["startYear"];
    endYear: WorkHistory["list"][0]["endYear"];
    role: WorkHistory["list"][0]["jobTitle"];
};

function WorkEntry({ company, startYear, endYear, role }: WorkEntryProps) {
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
