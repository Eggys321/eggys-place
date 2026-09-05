import {createTransport} from "nodemailer";
import { resetPasswordEmailTemplate,orderCreatedEmailTemplate } from "./emailTemplate.js";

const createEmailTransporter = () => {
    const port = Number(process.env.EMAIL_PORT) || 587;
    return createTransport({
        host: process.env.EMAIL_SERVICE,
        port,
        secure: port === 465, // implicit TLS only on port 465, STARTTLS otherwise
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

    // await the send so callers can actually catch a failed delivery
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
        // best-effort: an order is already saved and paid for, so a failed
        // confirmation email should never surface as an error to the customer
        console.error("Error sending order email:", error.message);
    }
};
