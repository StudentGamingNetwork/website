import * as NodeMailer from "nodemailer";
import { env } from "@/utils/environment";

let mailConfig;

if (env.NODE_ENV === "development") {
    mailConfig = {
        auth: {
            pass: env.ETHEREAL_PASS,
            user: env.ETHEREAL_USER
        },
        host: "smtp.ethereal.email",
        port: 587
    };
}
else {
    mailConfig = {
        auth: {
            pass: env.MJ_APIKEY_PRIVATE,
            user: env.MJ_APIKEY_PUBLIC
        },
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false
    };
}


const transporter = NodeMailer.createTransport(mailConfig);


export async function sendMail(to: string, subject: string, body: string): Promise<void> {
    await transporter.sendMail({
        from: env.NO_REPLY_EMAIL,
        html: body,
        subject,
        to
    });
}
