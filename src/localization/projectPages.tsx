import { ProjectPages } from "@/types";

export const projectPages: ProjectPages = {
    title: {
        EN: "My Projects",
        VN: "Dự án của tôi",
    },
    projects: [
        {
            title: {
                EN: "Project #1",
                VN: "Dự án #1",
            },
            projectName: "Youtracker",
            desc: {
                EN: "An app for browsing and managing your and other people's YouTube playlists. Created using React, Tailwind, and Express, Youtracker uses OAuth 2.0 to request access to the user's account and YouTube public API to access the user's playlist data. The core functionalities are:\n\n- Browsing YouTube channel using URL, handle name or channel ID\n- Login to your channel with Google's Authorization\n- Create, View, Update, Delete playlists on your channel\n- Create, View, Update, Delete videos in your playlist\n - Save a record of your current playlist or download the video to your local PC  ",
                VN: "Ứng dụng dành cho việc theo dõi các playlist trên Youtube và tự quản lý playlist của cá nhân. Được phát triển với React, Tailwind và Express, Youtracker sử dụng OAuth 2.0 để yêu cầu quyền truy vào tài khoản YouTube sau đó sử dụng API của Youtube để thực hiện các thao tác quản lý dữ liệu playlist cá nhân. Các chức năng chính bao gồm:\n\n- Tra cứu các kênh YouTube với URL, tên handle hoặc Id của kênh\n- Cấp quyền truy cập vào dữ liệu qua dịch vụ Authorization của Google\n - Tạo, xem, thay đổi, xóa dữ liệu playlist của kênh YouTube cá nhân\n- Tạo, xem, thay đổi, xóa dữ liệu video của playlist cá nhân\n - Lưu dữ liệu hiện tại của playlist và tải xuống trực tiếp video",
            },
            techStack: {
                title: {
                    EN: "tech stack",
                    VN: "tech stack",
                },
                list: ["ReactJs", "Tailwind", "Vite", "Express", "Figma", "Git"],
            },
            imageUrl: "./src/assets/img/youtracker-screenshot.jpg",
            icon: "/src/assets/icons/app_icons/youtracker.svg",
            liveViewUrl: "https://server-blue-wildflower-4967.fly.dev",
            gitHubUrl: "https://github.com/hothaikhanh/you-tracker",
        },
        {
            title: {
                EN: "Project #2",
                VN: "Dự án #2",
            },
            projectName: "Tic Tac Toe",
            desc: {
                EN: "A simple Tic Tac Toe game built with vanilla Javascript, HTML, and CSS. The game comes with functionalities such as:\n\n - Multiplayer mode:\n play against a friend and see who can win in a best of 5 format\n\n - Singlerplayer mode:\n play against a bot that is programmed to prevent the player from winning\n\n - Player customizations:\n Players can select their name and icon when they play\n\n",
                VN: "Game X/O đơn giản được phát triển với JS, HTML, CSS cơ bản. Các chức năng chính bao gồm:\n\n- Chế độ chơi 2 người:\nChơi cùng một người bạn dưới hình thức BO5\n\n- Chế độ chơi với máy:\nChơi với máy đã được lập trình để ngăn người chơi dành chiến thắng\n\n - Điều chỉnh giao diện:\nNgười chơi có thể thay đổi tên hiển thị và icon hiển thị",
            },
            techStack: {
                title: {
                    EN: "tech stack",
                    VN: "tech stack",
                },
                list: ["Html", "CSS", "Javascript", "SASS"],
            },
            imageUrl: "./src/assets/img/tictactoe-screenshot.jpg",
            icon: "/src/assets/icons/app_icons/tictactoe.svg",
            liveViewUrl: "https://hothaikhanh-tic-tac-toe-app.fly.dev",
            gitHubUrl: "https://github.com/hothaikhanh/tic-tac-toe",
        },
        {
            title: {
                EN: "Project #3",
                VN: "Dự án #3",
            },
            projectName: "Portfolio",
            desc: {
                EN: "A 3D portfolio page used for displaying my personal information and projects. Built using React, Sass, and ThreeJS (React Three Fiber), the core functionalities include:\n\n - Full 3D environment with camera movements and flexible spotlights \n - Navigation features like navigation bar, scroll, click\n - Option to download a PDF file of my resume\n - Functional language switcher\n - Direct links to my projects\n ",
                VN: "Trang portfolio 3D dành cho việc hiển thị thông tin cá nhân và các dự án đã làm. Được phát triển bằng React, Sass và ThreeJs (React Three Fiber), các chức năng nổi bật gồm:\n\n - Môi trường 3D với nhiều chuyển động camera và ánh đèn linh hoạt\n - Các chức năng điều hướng như: thanh navbar, cuộn chuột, click vào màn hình\n - Download bản PDF của Resume về máy\n - Lựa chọn thay đổi ngôn ngữ\n - Đường link truy cập đến trang dự án cá nhân",
            },
            techStack: {
                title: {
                    EN: "tech stack",
                    VN: "tech stack",
                },
                list: ["ReactJs", "SASS", "Vite", "Express", "Git", "ThreeJs"],
            },
            imageUrl: "./src/assets/img/profo-screenshot.png",
            icon: "/src/assets/icons/app_icons/profo.svg",
            liveViewUrl: null,
            gitHubUrl: "https://github.com/hothaikhanh/Profo",
        },
    ],
};
