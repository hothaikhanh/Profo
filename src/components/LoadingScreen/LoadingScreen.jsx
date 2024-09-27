import React, { useContext } from "react";
export default function LoadingScreen({ canvasLoaded }) {
    return (
        <div className={"loading-screen" + " " + (canvasLoaded ? "fade" : "")}>
            <span>Loading... </span>
        </div>
    );
}
