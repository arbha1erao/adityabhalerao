import emailjs from "@emailjs/nodejs";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { user_name, user_email, message } = req.body;

    if (!user_name || !user_email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const response = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            { user_name, user_email, message },
            { publicKey: process.env.EMAILJS_PUBLIC_KEY }
        );

        return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to send message", details: error });
    }
}
