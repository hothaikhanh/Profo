import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import App from "./App";
import MobileApp from "./MobileApp";
import "./index.css";

createRoot(document.getElementById("root")).render(<Main></Main>);

function Main() {
    let w = window.innerWidth;
    return <>{w >= 720 ? <App></App> : <MobileApp></MobileApp>}</>;
}
