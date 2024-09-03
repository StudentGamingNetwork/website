import * as NodeMailer from "nodemailer";

const transporter = NodeMailer.createTransport({
    auth: {
        pass: process.env.MJ_APIKEY_PRIVATE,
        user: process.env.MJ_APIKEY_PUBLIC
    },
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false
});


export async function sendMail(from: string, to: string, subject: string, body: string): Promise<void> {
    await transporter.sendMail({
        from: `"no-reply" ${ from }`,
        html: body,
        subject,
        to
    });
}
