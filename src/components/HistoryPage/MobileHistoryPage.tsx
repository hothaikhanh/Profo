import React, { useState, useContext } from "react";
import "./HistoryPage.scss";
import { RadioButton } from "../Buttons/Buttons";

import LanguageContext from "../../contexts/Locale/LocaleContext";

export default function MobileHistoryPage({ data }) {
    const lang = useContext(LanguageContext);

    return (
        <div className="history-page">
            <div className="title">{data.title[lang]}</div>
            <div className="content-container">
                {data.list.map((entry, index) => {
                    return <WorkEntry entry={entry} index={index} lang={lang} key={index}></WorkEntry>;
                })}
            </div>
        </div>
    );
}

function WorkEntry({ entry, lang }) {
    return (
        <div>
            <h3>
                {entry.startYear} - {entry.endYear}
            </h3>
            <h1>{entry.companyName}</h1>
            <p>{entry.jobTitle}</p>
            <hr />
            <p>{entry.duties.title[lang]}</p>
            {entry.duties.content[lang].map((line, index) => {
                return <li key={index}>{line}</li>;
            })}

            {entry.achievement.content[lang].length > 0 ? <p>{entry.achievement.title[lang]}</p> : null}
            {entry.achievement.content[lang].map((line, index) => {
                return <li key={index}>{line}</li>;
            })}

            <br />
            {/* <p>{entry.contact.title[lang]}</p>
                                    <li>
                                        {entry.contact.jobTitle[lang]}: {entry.contact.name[lang]} -{" "}
                                        {entry.contact.mail}
                                    </li> */}
        </div>
    );
}
