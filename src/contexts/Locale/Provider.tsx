import { Locale } from "@/types";
import { ReactNode, useState } from "react";
import { LocaleContext } from "./Context";

type Props = {
    children: ReactNode;
};

export const LocaleProvider = ({ children }: Props) => {
    const [locale, setLocale] = useState<Locale>("EN");
    const handleSetLocale = (id: Locale) => {
        console.log(`it works`);

        setLocale(id);
    };
    return <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>{children}</LocaleContext.Provider>;
};
