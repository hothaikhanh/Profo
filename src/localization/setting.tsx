import { SettingPage } from "@/types";

export const setting: SettingPage = {
    title: {
        EN: "Setting",
        VN: "Cài đặt",
    },
    options: [
        {
            title: {
                EN: "language",
                VN: "ngôn ngữ",
            },
            values: [
                {
                    key: "EN",
                    value: "English",
                },
                {
                    key: "VN",
                    value: "Tiếng Việt",
                },
            ],
        },
    ],
};
