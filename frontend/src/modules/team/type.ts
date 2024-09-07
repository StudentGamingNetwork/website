import { TCompleteUser } from "@/modules/user";

export type TTeam = {
    _id: string;
    members: Array<{
        role: string;
        user: TCompleteUser;
        username: string;
    }>;
    owner: string;
    settings: {
        name: string;
        coachInvitationCode: string;
        invitationCode: string;
        tag: string;
    };
    state: {
        ready: boolean;
        validated: boolean;
    };
    tournament: string;
}
