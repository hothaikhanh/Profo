import { createContext, ReactNode, useContext, useState } from "react";
import { Locale } from "@/types";

// type LocaleActions = { type: "change"; payload: string };
type LocaleContextType = {
    locale: Locale;
    setLocale: (id: Locale) => void;
};
const LocaleContext = createContext<LocaleContextType>({
    locale: "EN",
    setLocale: () => {
        console.log(`this aint it buddy`);
    },
});

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("EN");
    return <LocaleContext.Provider value={{ locale: locale, setLocale: setLocale }}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
    const res = useContext(LocaleContext) as LocaleContextType;
    return res;
};
