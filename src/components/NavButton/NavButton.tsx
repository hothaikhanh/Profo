import { ReactNode } from "react";

type Props = {
    isActive: boolean;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children: ReactNode;
};

export default function NavButton({ isActive, onClick, onMouseEnter, onMouseLeave, children }: Props) {
    return (
        <button
            className={`nav-btn ${isActive ? "active" : ""}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </button>
    );
}
