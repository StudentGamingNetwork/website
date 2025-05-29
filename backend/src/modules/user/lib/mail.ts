import { Client } from "node-mailjet";
import { env } from "@/utils/environment";

const mailjet = Client.apiConnect(env.MJ_APIKEY_PUBLIC, env.MJ_APIKEY_PRIVATE);

export async function sendMail(to: string, name: string, subject: string, link: string): Promise<void> {
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
