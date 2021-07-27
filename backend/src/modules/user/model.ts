import Mongo from "@/database";

export enum ERoles {
    Admin = "admin"
}

export interface IUser {
    mail: string;
    password: string;
    username: string;
    roles: Array<ERoles>;
}

export interface IUserDocument extends IUser, Mongo.Document {
}

const userSchema: Mongo.Schema = new Mongo.Schema({
    mail: {
        faker: "internet.email",
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
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
