import { TCompleteUser } from "@/modules/user";

export type TTeamMember = {
    user: TCompleteUser;
    username: string;
    acceptedRules: boolean;
    phasmophobia?: {
        rank: string;
        level: number;
        duo?: string;
    }
};

export type TTeam = {
    _id: string;
    members: Array<TTeamMember>;
    owner: string;
    settings: {
        name: string;
        coachInvitationCode: string;
        invitationCode: string;
        logo: string;
        managerInvitationCode: string;
        tag: string;
    };
    staff:{
        coach?:{
            user: TCompleteUser;
            username: string;
        };
        manager?: {
            user: TCompleteUser;
            username: string;
        };
    };
    state: {
        ready: boolean;
        validated: boolean;
    };
    tournament: string;
}
