const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const sendContactEmail = async(contact)=>{

    const mailOptions={

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject:`🚀 New Inquiry from ${contact.fullName}`,

        html:`

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

    };

    await transporter.sendMail(mailOptions);

};

module.exports={

    sendContactEmail

};