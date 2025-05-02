import { createRoot } from "react-dom/client";
import App from "./App";
import MobileApp from "./MobileApp";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(<Main></Main>);

function Main() {
    const isPC = window.innerWidth >= 720;
    return <>{isPC ? <App /> : <MobileApp />}</>;
}
