import { Locale } from "@/types";

export type LocaleContextType = {
    locale: Locale;
    setLocale?: (id: Locale) => void;
};