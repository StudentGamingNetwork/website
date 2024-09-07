import Mongo from "@/database";

export interface ITeam {
    members: Array<{
        role: string;
        user: Mongo.Schema.Types.ObjectId;
        username: string;
    }>;
    owner: Mongo.Schema.Types.ObjectId;
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
    tournament: Mongo.Schema.Types.ObjectId;
}

export interface ITeamDocument extends ITeam, Mongo.Document {

}

const teamSchema: Mongo.Schema = new Mongo.Schema({
    members: [{
        role: { 
            default: "Player",
            type: String },
        user: {
            ref: "user",
            type: Mongo.Schema.Types.ObjectId
        },
        username: String
    }],
    owner: {
        ref: "user",
        required: true,
        type: Mongo.Schema.Types.ObjectId
    },
    settings: {
        name: String,
        coachInvitationCode: String,
        invitationCode: String,
        tag: String
    },
    state: {
        ready: Boolean,
        validated: Boolean
    },
    tournament: {
        ref: "tournament",
        required: true,
        type: Mongo.Schema.Types.ObjectId
    }
});

export default Mongo.model<ITeamDocument>("team", teamSchema);
