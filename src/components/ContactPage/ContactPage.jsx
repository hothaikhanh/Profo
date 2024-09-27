import React, { useContext, useState } from "react";
import "./ContactPage.scss";
import { HoverButton } from "../Buttons/Buttons";
import { LanguageContext } from "../Contexts/LanguageContext";
import data from "/src/resources.json";

export default function ContactPage() {
    const lang = useContext(LanguageContext);
    return (
        <div className="contact-page">
            <div className="header">
                <span>{data.contact.header[lang]}</span>
            </div>

            <div className="content">
                <div className="mail">{data.contact.email}</div>
                <div className="message">{data.contact.message[lang]}</div>
            </div>

            <div className="action-button">
                <HoverButton>
                    <span>{data.contact.actionBtn[lang]}</span>
                </HoverButton>
            </div>
        </div>
    );
}
