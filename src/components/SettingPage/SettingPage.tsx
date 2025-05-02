import React from "react";
import { useContext } from "react";
import "./SettingPage.scss";

import LanguageContext from "../Contexts/LanguageContext";

export default function SettingPage({ data, setLang }) {
    const lang = useContext(LanguageContext);

    return (
        <div className="mobile setting-page">
            <div className="header">{data.title[lang]}</div>
            <div className="options-list">
                {data.options.map((option, index) => {
                    return <OptionItem data={option} key={index} lang={lang} setLang={setLang} />;
                })}
            </div>
        </div>
    );
}

function OptionItem({ data, lang, setLang }) {
    let changeLang = () => {
        setLang(lang == "EN" ? "VN" : "EN");
    };

    return (
        <div className="option-item">
            <span className="option-name">{data.title[lang]}</span>
            <div className="option-container">
                <div className="option-control option-control-left" onClick={changeLang}>
                    &lt;
                </div>
                <span className="option-value">{data.values.filter((item) => item.key == lang)[0].value}</span>
                <div className="option-control option-control-right" onClick={changeLang}>
                    &gt;
                </div>
            </div>
        </div>
    );
}
