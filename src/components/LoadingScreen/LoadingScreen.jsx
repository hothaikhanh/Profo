import React, { useContext } from "react";
import "./LoadingScreen.scss";

export default function LoadingScreen({ text = "Loading...", toFade = false }) {
    return (
        <div className={"loading-screen" + " " + (toFade ? "fade" : "")}>
            <span>{text} </span>
        </div>
    );
}
