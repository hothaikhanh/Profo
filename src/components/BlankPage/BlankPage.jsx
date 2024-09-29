import React, { useContext } from "react";
import "./BlankPage.scss";
import { LanguageContext } from "../Contexts/LanguageContext";

export default function BlankPage({ data }) {
    const lang = useContext(LanguageContext);
    return (
        <div className="blank-page">
            <img src="/src/assets/img/no-signal.png" alt="" />
            <div>{data.message[lang]}</div>
        </div>
    );
}
