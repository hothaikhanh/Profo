import React from "react";
import "./Page.scss";

export default function Page({ title, children }) {
    return (
        <div className="page">
            <header className="header">
                <span>{title}</span>
            </header>

            <div className="outer-border">
                <p className="top"></p>
                <p className="right"></p>
                <p className="bottom"></p>
                <p className="left"></p>

                {children}
            </div>
        </div>
    );
}
