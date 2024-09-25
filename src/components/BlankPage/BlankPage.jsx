import React from "react";
import "./BlankPage.scss";

export default function BlankPage() {
    return (
        <div className="blank-page">
            <img src="/src/assets/img/no-signal.png" alt="" />
            <div>No signal</div>
        </div>
    );
}
