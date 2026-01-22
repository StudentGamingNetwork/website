import { TCompleteUser } from "@/modules/user";

export type TTeamMember = {
    user: TCompleteUser;
    username: string;
    acceptedRules: boolean;
    phasmophobia?: {
        rank: string;
        level: number;
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
    game?: {
        phasmophobia?: {
            map1?: string;
            map2?: string;
            map3?: string;
        }
    };
    staff: {
        coach?: {
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
