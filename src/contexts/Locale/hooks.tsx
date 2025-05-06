import { useContext } from "react";
import { LocaleContext } from "./Context";

export const useLocale = () => {
    const res = useContext(LocaleContext);
    return res;
};
