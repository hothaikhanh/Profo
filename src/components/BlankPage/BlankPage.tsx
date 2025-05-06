import { useLocale } from "@/contexts/Locale";
import "./BlankPage.scss";

type Props = any;

export default function BlankPage({ data }: Props) {
    const { locale } = useLocale();
    return (
        <div className="blank-page">
            <img src="/src/assets/img/no-signal.png" alt="" />
            <div>{data.message[locale]}</div>
        </div>
    );
}
