import "./SettingPage.scss";
import { useLocale } from "@/contexts/Locale";
import type { Locale, SettingPage } from "@/types";

type Props = {
    data: SettingPage;
};

export default function SettingPage({ data }: Props) {
    const { locale, setLocale } = useLocale();

    return (
        <div className="mobile setting-page">
            <div className="header">{data.title[locale]}</div>
            <div className="options-list">
                {data.options.map((option, index) => {
                    return <OptionItem optionData={option} key={index} locale={locale} setLocale={setLocale!} />;
                })}
            </div>
        </div>
    );
}

function OptionItem({
    optionData,
    locale,
    setLocale,
}: {
    optionData: SettingPage["options"][0];
    locale: Locale;
    setLocale: (id: Locale) => void;
}) {
    let changeLang = () => {
        setLocale(locale == "EN" ? "VN" : "EN");
    };

    return (
        <div className="option-item">
            <span className="option-name">{optionData.title[locale]}</span>
            <div className="option-container">
                <div className="option-control option-control-left" onClick={changeLang}>
                    &lt;
                </div>
                <span className="option-value">{optionData.values.filter((item) => item.key == locale)[0].value}</span>
                <div className="option-control option-control-right" onClick={changeLang}>
                    &gt;
                </div>
            </div>
        </div>
    );
}
