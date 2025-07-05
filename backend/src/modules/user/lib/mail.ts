import Mailjet from "node-mailjet";
import nodemailer from "nodemailer";
import httpErrors from "http-errors";
import { env } from "@/utils/environment";
import { forgottenPassword } from "@/assets/mail";

const { Client } = Mailjet;
let mailjet: ReturnType<typeof Client.apiConnect> | null = null;

if (env.NODE_ENV === "production") {
    mailjet = Client.apiConnect(env.MJ_APIKEY_PUBLIC, env.MJ_APIKEY_PRIVATE);
}

export async function sendMail(to: string, name: string, subject: string, link: string): Promise<void> {
    if (env.NODE_ENV === "production") {
        return sendMailProduction(to, name, subject, link);
    }
    else {
        return sendMailDevelopment(to, name, subject, link);
    }
}

async function sendMailProduction(to: string, name: string, subject: string, link: string): Promise<void> {
    if (!mailjet) {
        throw new httpErrors.InternalServerError("Le client de mailing n'est pas initialisé.");
    }
    await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: env.NO_REPLY_EMAIL,
                    Name: env.NO_REPLY_NAME
                },
                subject: subject,
                TemplateID: 7022731,
                TemplateLanguage: true,
                To: [
                    {
                        Email: to,
                        Name: to
                    }
                ],
                Variables: {
                    Link: link,
                    Name: name
                }
            }
        ]
    });
}

async function sendMailDevelopment(to: string, name: string, subject: string, link: string): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        auth: {
            pass: testAccount.pass,
            user: testAccount.user
        },
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure
    });

    const info = await transporter.sendMail({
        from: `"${ env.NO_REPLY_NAME } "<${ env.NO_REPLY_EMAIL }>`,
        html: (await forgottenPassword).replaceAll("[[data:name:\"\"]]",name).replaceAll("[[WORKFLOW_EXIT_LINK_FR]]", link),
        subject: subject,
        text: `Clique sur ce bouton afin de réinitialiser ton mot de passe : ${ link }`,
        to: to
    });
    console.info("Aperçu disponible sur: %s", nodemailer.getTestMessageUrl(info));
}
