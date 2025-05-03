export type Locale = "EN" | "VN"

export type Coordinate = [x: number, y: number, z: number]

export type Content = {
    EN: string | string[],
    VN: string | string[]
}

export type ContentList = {
    EN: string[],
    VN: string[]
}

export type Title = {
    EN: string,
    VN: string
}

export type HomePage = {
    title: Title
}

export type AboutMe = {
    title: Title
    desc: {
        title: Title
        status: Content,
        greeting: Content,
        myName: Content,
        jobTitle: string[],
        content: Content,
    },
    downloadBtn: Content,
    skills: {
        title: Title
    },
    relatedSkills: {
        title: Title
        list: {
            name: string,
            title: Title
            content: ContentList
        }[]
    }
}

export type WorkHistory = {
    title: Title
    list:
    {
        id: string,
        companyName: string,
        startYear: string | number,
        endYear: string | number,
        jobTitle: string,
        duties: {
            title: Title
            content: ContentList
        },
        achievement: {
            title: Title
            content: ContentList,
        },
        contact: {
            title: Title
            name: Content,
            jobTitle: Content,
            mail: string
        } | null

    }[],
}

export type Project = {
    title: Title
    projectName: string,
    desc: Content,
    techStack: {
        title: Title
        list: string[]
    },
    imageUrl: string,
    icon: string,
    liveViewUrl: string | null
    gitHubUrl: string
}

export type ProjectPages = {
    title: Content
    projects: Project[],
}

export type ContactPage = {
    title: Title,
    header: Title,
    email: string,
    message: Content,
    actionBtn: Content,
    contactForm: {
        email: Title,
        subject: Title,
        body: Title,
        sendBtn: Title,
        message: {
            success: Title,
            error: Title
        },
        alert: {
            email: Title,
            subject: Title,
            body: Title
        }
    }
}

export type SettingPage = {
    title: Title,
    options:
    {
        title: Title,
        values:
        {
            key: string,
            value: string,
        }[]
    }[]

}

export type BlankPage = {
    message: Title,
}

export type Skills = {
    path: string,
    list:
    {
        name: string,
        icon: string
    }[],

}

export type SiteData = {
    home: HomePage,
    aboutMe: AboutMe,
    workHistory: WorkHistory,
    projectPages: ProjectPages,
    contact: ContactPage,
    setting: SettingPage
    blank: BlankPage
    skills: Skills
}

export type BGTextConfig = {
    position: Coordinate;
    scale: Coordinate;
    rotation: Coordinate;
    cameraPosition: Coordinate;
};

export type CameraConfigs = {
    name: string;
    position: Coordinate;
    target: Coordinate;
}[];

export type ScreenConfigs = {
    screenTitle: string | null;
    pageTitle: string | string[] | null;
    content: React.ReactNode;
    scale: number;
    position: Coordinate;
    rotation: Coordinate;
}[];