import Mongo from "@/database";

export interface ITeam {
    members: Array<{
        user: Mongo.Schema.Types.ObjectId;
        username: string;
    }>;
    owner: Mongo.Schema.Types.ObjectId;
    settings: {
        name: string;
        coachInvitationCode: string;
        invitationCode: string;
        logo: string;
        managerInvitationCode: string;
        tag: string;
    };
    staff: {
        coach: {
            user: Mongo.Schema.Types.ObjectId;
            username: string;
        };
        manager: {
            user: Mongo.Schema.Types.ObjectId;
            username: string;
        };
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
        logo: String,
        managerInvitationCode: String,
        tag: String
    },
    staff: {
        coach: {
            user: {
                ref: "user",
                type: Mongo.Schema.Types.ObjectId
            },
            username: String
        },
        manager: {
            user: {
                ref: "user",
                type: Mongo.Schema.Types.ObjectId
            },
            username: String
        }
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
},{ minimize: false });

export default Mongo.models.team || Mongo.model<ITeamDocument>("team", teamSchema);
