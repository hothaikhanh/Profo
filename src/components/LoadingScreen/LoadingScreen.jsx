import React, { useContext } from "react";
import "./LoadingScreen.scss";

export default function LoadingScreen({ canvasLoaded }) {
    return (
        <div className={"loading-screen" + " " + (canvasLoaded ? "fade" : "")}>
            <span>Loading... </span>
        </div>
    );
}
