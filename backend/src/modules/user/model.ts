import Mongo from "@/database";

export enum ERoles {
    Admin = "admin",
    Office = "office", // Bureau
    Council = "council", // Conseil/Respos
    Member = "member", // Membres SGN
    Tournament = "tournament",
    Federation = "federation",
    Partnership = "partnership"
}

export interface IUser {
    mail: string;
    password: string;
    username: string;
    roles: Array<ERoles>;
    platforms: Record<string, string>;
    name: string;
    avatar: string;
}

export interface IUserDocument extends IUser, Mongo.Document {
}

const userSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "name.firstName",
        type: String
    },
    avatar: {
        type: String
    },
    mail: {
        faker: "internet.email",
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    platforms: {
        of: String,
        type: Map
    },
    roles: [{
        enum: Object.values(ERoles),
        type: String
    }],
    username: {
        faker: "internet.userName",
        type: String
    }
});

export default Mongo.model<IUserDocument>("user", userSchema);
