import React, { useContext, useState } from "react";
import "./ContactPage.scss";
import { HoverButton } from "../Buttons/Buttons";
import { LanguageContext } from "../Contexts/LanguageContext";

export default function ContactPage({ data }) {
    const lang = useContext(LanguageContext);
    return (
        <div className="contact-page">
            <div className="header">
                <span>{data.header[lang]}</span>
            </div>

            <div className="content">
                <div className="mail">{data.email}</div>
                <div className="message">{data.message[lang]}</div>
            </div>

            <div className="action-button">
                <HoverButton>
                    <span>{data.actionBtn[lang]}</span>
                </HoverButton>
            </div>
        </div>
    );
}
