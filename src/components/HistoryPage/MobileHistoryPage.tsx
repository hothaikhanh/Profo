import { ReactNode } from "react";
import "./HistoryPage.scss";
import { useLocale } from "@/contexts/Locale";

export default function MobileHistoryPage({ data }: any) {
    const { locale } = useLocale();

    return (
        <div className="history-page">
            <div className="title">{data.title[locale]}</div>
            <div className="content-container">
                {data.list.map((entry: any, index: number) => {
                    return <WorkEntry entry={entry} index={index} lang={locale} key={index}></WorkEntry>;
                })}
            </div>
        </div>
    );
}

function WorkEntry({ entry, lang }: any) {
    return (
        <div>
            <h3>
                {entry.startYear} - {entry.endYear}
            </h3>
            <h1>{entry.companyName}</h1>
            <p>{entry.jobTitle}</p>
            <hr />
            <p>{entry.duties.title[lang]}</p>
            {entry.duties.content[lang].map((line: ReactNode, index: number) => {
                return <li key={index}>{line}</li>;
            })}

            {entry.achievement && entry.achievement.content[lang].length > 0 ? (
                <p>{entry.achievement.title[lang]}</p>
            ) : null}
            {entry.achievement &&
                entry.achievement.content[lang].map((line: ReactNode, index: number) => {
                    return <li key={index}>{line}</li>;
                })}

            <br />
            {/* <p>{entry.contact.title[lang]}</p>
                                    <li>
                                        {entry.contact.jobTitle[lang]}: {entry.contact.name[lang]} -{" "}
                                        {entry.contact.mail}
                                    </li> */}
        </div>
    );
}
