import { createTransport } from "nodemailer";
import { resetPasswordEmailTemplate, orderCreatedEmailTemplate } from "./emailTemplate.js";

const createEmailTransporter = () => {
    const port = Number(process.env.EMAIL_PORT) || 587;
    return createTransport({
        host: process.env.EMAIL_SERVICE,
        port,
        secure: port === 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

export const sendForgotPasswordMail = async (options) => {
    const transporter = createEmailTransporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: "Reset Password",
        html: resetPasswordEmailTemplate(options.firstName, options.resetUrl),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
};

export const sendOrder = async (order) => {
    const transporter = createEmailTransporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: order.recipientInfo.email,
        subject: "Order Confirmation - Eggys-place",
        html: orderCreatedEmailTemplate(order),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Order confirmation email sent:", info.response);
    } catch (error) {
        console.error("Error sending order email:", error.message);
    }
};
