import Mongo from "@/database";

export interface ITeam {
    settings: {
        name: string;
        tag: string;
    };
    state: {
        ready: boolean;
        validated: boolean;
    };
    tournament: Mongo.Schema.Types.ObjectId;
    users: {
        members: Array<{
            id: Mongo.Schema.Types.ObjectId;
            username: string;
        }>;
        owner: Mongo.Schema.Types.ObjectId;
    };
}

export interface ITeamDocument extends ITeam, Mongo.Document {

}

const teamSchema: Mongo.Schema = new Mongo.Schema({
    settings: {
        name: String,
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
    },
    users: {
        members: [{
            ref: "user",
            type: Mongo.Schema.Types.ObjectId
        }],
        owner: {
            ref: "user",
            required: true,
            type: Mongo.Schema.Types.ObjectId
        }
    }
});

export default Mongo.model<ITeamDocument>("team", teamSchema);
