import React, { useState } from "react";
import "./ContactPage.scss";
import { HoverButton } from "../Buttons/Buttons";

export default function ContactPage() {
    return (
        <div className="contact-page">
            <div className="header">
                <span>Contact me</span>
            </div>

            <div className="content">
                <div className="mail">hothaikhanh@gmail.com</div>
                <div className="message">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, magni ullam! Neque doloribus
                    explicabo quaerat voluptatibus nemo sapiente eveniet aspernatur!
                </div>
            </div>

            <div className="action-button">
                <HoverButton>
                    <span>let's go!</span>
                </HoverButton>
            </div>
        </div>
    );
}
