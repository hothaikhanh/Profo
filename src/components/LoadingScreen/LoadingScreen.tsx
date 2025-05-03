import "./LoadingScreen.scss";

type Props = {
    text?: string;
    isLoaded?: boolean;
};

export default function LoadingScreen({ text = "Loading...", isLoaded = false }: Props) {
    return (
        <div className={"loading-screen" + " " + (isLoaded ? "fade" : "")}>
            <span>{text} </span>
        </div>
    );
}
