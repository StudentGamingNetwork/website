import { TCompleteUser } from "@/modules/user";

export type TTeam = {
    _id: string;
    members: Array<{
        user: TCompleteUser;
        username: string;
    }>;
    owner: string;
    settings: {
        name: string;
        invitationCode: string;
        logo: string;
        tag: string;
    };
    state: {
        ready: boolean;
        validated: boolean;
    };
    tournament: string;
}
