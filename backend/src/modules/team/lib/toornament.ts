import axios from "axios";
import { env } from "@/utils/environment";

export async function getToken(): Promise<string> {
    const toornamentUrl = new URL("https://api.toornament.com/oauth/v2/token");
    toornamentUrl.searchParams.set("grant_type", "client_credentials");
    toornamentUrl.searchParams.set("client_id", env.TOORNAMENT_ID as string);
    toornamentUrl.searchParams.set("client_secret", env.TOORNAMENT_SECRET as string);
    toornamentUrl.searchParams.set("scope", "organizer:participant");

    const response = await axios.get(toornamentUrl.toString(), {
        headers: {
            "X-Api-Key": env.TOORNAMENT_API as string
        }
    });

    return response.data.access_token;
}

export async function createParticipant(token: string, participant: {name: string; tournament_id: string}): Promise<void> {
    const toornamentUrl = new URL("https://api.toornament.com/organizer/v2/participants");

    await axios.post(toornamentUrl.toString(), participant, {
        headers: {
            "Authorization": `Bearer ${ token }`,
            "X-Api-Key": env.TOORNAMENT_API as string
        }
    });
}
