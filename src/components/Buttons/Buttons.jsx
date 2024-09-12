import React from "react";
import "./Buttons.scss";

export function RadioButton({ btnName, btnGroup, setToggleBtn, checked, children }) {
    let uniqueId = `${btnGroup}_${btnName}`;

    return (
        <>
            <input
                className="button-type-radio"
                type="radio"
                id={uniqueId}
                value={btnName}
                name={btnGroup}
                checked={checked}
                onChange={() => setToggleBtn(btnName)}
            />
            <label htmlFor={uniqueId}>
                <div className="button-background"></div>
                <div className="button-content">{children}</div>
                <div className="button-border"></div>
            </label>
        </>
    );
}

export function HoverButton({ children }) {
    return (
        <button className="button-type-hover">
            <div className="button-background"></div>
            <div className="button-content">{children}</div>
            <div className="button-border"></div>
        </button>
    );
}
