import React, { useContext, useState, useRef, FormEvent, ChangeEvent } from "react";
import "./ContactPage.scss";
import { HoverButton } from "../Buttons/Buttons";
import { useLocale } from "@/contexts/Locale/LocaleContext";
import emailjs from "@emailjs/browser";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

type Props = any;

export default function ContactPage({ data }: Props) {
    const { locale } = useLocale();
    const [showContactFrom, setContactForm] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    let handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        setLoading(true);
        emailjs
            .sendForm("service_x4ysd1g", "template_i37apn4", formRef.current, {
                publicKey: "3MG2_VhOYmKhSYsG7",
            })
            .then((res) => {
                // console.log(res);
                alert(data.contactForm.message.success[locale]);
            })
            .catch((error) => {
                // console.log("FAILED...", error.text);
                alert(data.contactForm.message.error[locale]);
            })
            .finally(() => {
                setLoading(false);
                setContactForm(false);
            });
    };

    let handleChange = (e: ChangeEvent) => {
        e.target.classList.remove("unchanged");
    };
    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            {!showContactFrom ? (
                <div className="contact-page">
                    <div className="header">
                        <span>{data.header[locale]}</span>
                    </div>

                    <div className="content">
                        <div className="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                            </svg>
                            <span>{data.email}</span>
                        </div>
                        <div className="contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                            </svg>
                            <span>0773329426</span>
                        </div>

                        <div className="message">{data.message[locale]}</div>
                    </div>

                    <div className="action-button">
                        <HoverButton
                            onClick={() => {
                                setContactForm(true);
                            }}
                        >
                            <span>{data.actionBtn[locale]}</span>
                        </HoverButton>
                    </div>
                </div>
            ) : (
                <form className="contact-form" ref={formRef} onSubmit={handleSend}>
                    <div className="address">To: hothaikhanh@gmail.com</div>
                    <input
                        className="unchanged"
                        type="email"
                        name="from_name"
                        placeholder={data.contactForm.email[locale]}
                        required
                        onChange={handleChange}
                    />
                    <p className="input-warn">{data.contactForm.alert.email[locale]}</p>
                    <input
                        type="text"
                        className="unchanged"
                        name="subject"
                        placeholder={data.contactForm.subject[locale]}
                        required
                        onChange={handleChange}
                    />
                    <p className="input-warn">{data.contactForm.alert.subject[locale]}</p>
                    <textarea
                        className="unchanged"
                        name="message"
                        placeholder={data.contactForm.body[locale]}
                        required
                        onChange={handleChange}
                    />
                    <p className="input-warn">{data.contactForm.alert.body[locale]}</p>
                    <HoverButton onClick={handleSend} type="submit">
                        <span>{data.contactForm.sendBtn[locale]}</span>
                    </HoverButton>
                    <div
                        className="close-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setContactForm(false);
                        }}
                    >
                        <HoverButton>
                            <span>X</span>
                        </HoverButton>
                    </div>
                </form>
            )}
            {isLoading && <LoadingScreen text="Sending..." />}
        </div>
    );
}
