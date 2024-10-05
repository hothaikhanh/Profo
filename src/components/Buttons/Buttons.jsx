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

export function HoverButton({ children, onClick = null }) {
    return (
        <button className="button-type-hover" onClick={onClick}>
            <div className="button-background"></div>
            <div className="button-content">{children}</div>
            <div className="button-border"></div>
        </button>
    );
}

export function AnchorButton({ children, href }) {
    return (
        <a type="submit" className="button-type-hover" href={href} target="_blank" rel="noopener noreferrer">
            <div className="button-background"></div>
            <div className="button-content">{children}</div>
            <div className="button-border"></div>
        </a>
    );
}
