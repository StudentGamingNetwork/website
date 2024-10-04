import { merge } from "lodash";
import { TTeam } from "@/modules/team/type";

export function makeObject(team: Partial<TTeam>): TTeam {
    const basicTeam = {
        _id: "",
        members: [],
        owner: "",
        settings: {
            name: "",
            coachInvitationCode: "",
            invitationCode: "",
            logo: "",
            tag: ""
        },
        staff: [],
        state: {
            ready: false,
            validated: false
        },
        tournament: ""
    };

    return merge(basicTeam, team);
}
