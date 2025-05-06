import { SiteData } from "@/types";
import { aboutMe } from "./aboutMe";
import { blank } from "./blank";
import { contact } from "./contact";
import { home } from "./home";
import { projectPages } from "./projectPages";
import { setting } from "./setting";
import { skills } from "./skills";
import { workHistory } from "./workHistory";

const siteData: SiteData = {
    home,
    aboutMe,
    workHistory,
    projectPages,
    contact,
    setting,
    blank,
    skills,
};

export default siteData;
