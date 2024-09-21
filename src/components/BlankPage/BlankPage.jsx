import React from "react";

export default function BlankPage() {
    return (
        <video
            style={{ opacity: 0.2 }}
            src="/src/assets/videos/tv-static.mp4"
            autoPlay
            loop
            muted
            preload="auto"
        ></video>
    );
}
