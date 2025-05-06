import { createContext } from "react";
import { LocaleContextType } from "./types";

export const LocaleContext = createContext<LocaleContextType>({
    locale: "EN",
    setLocale: () => void 0,
});
