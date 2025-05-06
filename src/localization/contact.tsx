import { ContactPage } from "@/types";

export const contact: ContactPage = {
    title: {
        EN: "Contact",
        VN: "Liên lạc",
    },
    header: {
        EN: "my contacts",
        VN: "thông tin liên lạc",
    },
    email: "hothaikhanh@gmail.com",
    message: {
        EN: "Thank you for visiting. Feel free to provide me with any questions or feedback, and please don't hesitate to reach out. I look forward to connecting with you and hope one day I can add great value to your organization.",
        VN: "Cảm ơn bạn đã ghé qua trang web này, xin vui lòng để lại các câu hỏi hoặc nhận xét, nếu có. Ý kiến của bạn rất quan trọng đối với tôi và tôi hi vọng một ngày có thể mang lại nhiều giá trị cho tổ chức của bạn.",
    },
    actionBtn: {
        EN: "leave a message",
        VN: "để lại lời nhắn",
    },
    contactForm: {
        email: {
            EN: "From",
            VN: "Từ",
        },
        subject: {
            EN: "Subject",
            VN: "Tiêu đề",
        },
        body: {
            EN: "Body",
            VN: "Nội dung",
        },
        sendBtn: {
            EN: "Send",
            VN: "Gửi",
        },
        message: {
            success: {
                EN: "Email has been sent!",
                VN: "Email đã được gửi!",
            },
            error: {
                EN: "An error has occur, please try again later",
                VN: "Đã xảy ra lỗi, mời bạn thử lại sau",
            },
        },
        alert: {
            email: {
                EN: "Please enter a valid email",
                VN: "Vui lòng nhập một email hợp lệ",
            },
            subject: {
                EN: "Please enter a subject",
                VN: "vui lòng nhập tiêu đề",
            },
            body: {
                EN: "Please enter a message",
                VN: "Vui lòng nhập lời nhắn",
            },
        },
    },
};
