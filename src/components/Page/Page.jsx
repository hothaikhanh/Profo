import React from "react";
import "./Page.scss";

export default function Page({ title, children, className, style }) {
    return (
        <div className={"page crt " + className} style={style}>
            {title ? (
                <>
                    <header className="header">
                        <span>{title}</span>
                    </header>

                    <div className="outer-border">
                        <p className="top-border"></p>
                        <p className="right-border"></p>
                        <p className="bottom-border"></p>
                        <p className="left-border"></p>

                        {children}
                    </div>
                </>
            ) : (
                <>{children}</>
            )}
        </div>
    );
}
