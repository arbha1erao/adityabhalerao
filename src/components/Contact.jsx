import { useRef, useState } from "react";
import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

export default function ContactSection() {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 1500);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(form.current);
        const data = {
            sender_name: formData.get("sender_name").trim(),
            sender_email: formData.get("sender_email").trim(),
            subject: formData.get("subject").trim(),
            message: formData.get("message").trim()
        };

        if (!data.sender_name || !data.sender_email || !data.subject || !data.message) {
            showMessage("Please fill in all the fields");
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sender_email)) {
            showMessage("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (data.message.length > 1000) {
            showMessage("Message should not exceed 1000 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showMessage("Email sent successfully!");
                form.current.reset();
            } else {
                throw new Error();
            }
        } catch {
            showMessage("Failed to send email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" className="flex min-h-screen min-w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-8 p-14">
                <motion.h1
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.5 }}
                    className="text-center text-5xl md:text-7xl"
                >
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Let's Connect!
                    </span>
                </motion.h1>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    variants={variants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center space-y-6 text-center w-full max-w-5xl"
                    noValidate
                >
                    <div className="flex w-full space-x-4">
                        <input
                            type="text"
                            name="sender_name"
                            placeholder="Your Name *"
                            required
                            className="w-1/2 p-3 text-lg border border-gray-600 bg-[#111132] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            name="sender_email"
                            placeholder="Your Email *"
                            required
                            className="w-1/2 p-3 text-lg border border-gray-600 bg-[#111132] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        required
                        className="w-full p-3 text-lg border border-gray-600 bg-[#111132] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message *"
                        rows="4"
                        required
                        className="w-full p-3 text-lg border border-gray-600 bg-[#111132] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>

                    <div className="h-10 flex items-center justify-center">
                        {message && (
                            <p className={`text-lg font-semibold ${message === "Email sent successfully!" ? "text-green-400" : "text-red-400"}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg border border-indigo-600 bg-[#111132] px-5 py-3 text-lg font-bold text-white shadow-lg shadow-indigo-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-700"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </motion.form>
            </div>
        </div>
    );
}
