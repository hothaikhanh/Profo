import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import "./Buttons.scss";

type RadioButtonProps = {
    btnName: string;
    btnGroup: string;
    checked: boolean;
    children: ReactNode;
    setToggleBtn: (btnName: string) => void;
};

type HoverButtonProps = {
    children: ReactNode;
    className?: string[] | string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

type AnchorButtonProps = {
    children: ReactNode;
    href: string;
};

export function RadioButton({ btnName, btnGroup, setToggleBtn, checked, children }: RadioButtonProps) {
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

export function HoverButton({ children, onClick, type = "button", className }: HoverButtonProps) {
    return (
        <button type={type} className={"button-type-hover " + className} onClick={onClick}>
            <div className="button-background"></div>
            <div className="button-content">{children}</div>
            <div className="button-border"></div>
        </button>
    );
}

export function AnchorButton({ children, href }: AnchorButtonProps) {
    return (
        <a type="submit" className="button-type-hover" href={href} target="_blank" rel="noopener noreferrer">
            <div className="button-background"></div>
            <div className="button-content">{children}</div>
            <div className="button-border"></div>
        </a>
    );
}
