const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async (contact) => {
    await resend.emails.send({
        from: "HD Platform <onboarding@resend.dev>",
        to: process.env.EMAIL_USER,
        subject: `🚀 New Inquiry from ${contact.fullName}`,
        html: `
            <h2>New Portfolio Inquiry</h2>
            <hr>

            <p><strong>Name:</strong> ${contact.fullName}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Company:</strong> ${contact.company || "N/A"}</p>
            <p><strong>Service:</strong> ${contact.service}</p>
            <p><strong>Budget:</strong> ${contact.budget || "N/A"}</p>

            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>

            <hr>
            <small>HD Platform</small>
        `
    });
};

module.exports = {
    sendContactEmail
};