import Mongo from "@/database";

export interface IUser {
    mail: string;
    password: string;
    username: string;
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
    username: {
        faker: "internet.userName",
        type: String
    }
});

export default Mongo.model<IUserDocument>("user", userSchema);
