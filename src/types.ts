export type Locale = "EN" | "VN"

export type Coordinate = [x: number, y: number, z: number]

type Content = {
    EN: string | string[],
    VN: string | string[]
}

type Title = {
    EN: string,
    VN: string
}

type HomePage = {
    title: Title
}

type AboutMe = {
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
            content: Content
        }[]
    }
}

type WorkHistory = {
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
            content: Content
        },
        achievement: {
            title: Title
            content: Content,
        },
        contact: {
            title: Title
            name: Content,
            jobTitle: Content,
            mail: string
        } | {} | null

    }[],
}

type Project = {
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
}

type ProjectPages = {
    title: Content
    projects: Project[],
}

type ContactPage = {
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

type SettingPage = {
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

type BlankPage = {
    message: Title,
}

type Skills = {
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