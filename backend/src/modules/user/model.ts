import Mongo from "@/database";

export interface IUser {
    mail: string;
    password: string;
    login: string;
}

export interface IUserDocument extends IUser, Mongo.Document {

}

const userSchema: Mongo.Schema = new Mongo.Schema({
    login: {
        faker: "internet.userName",
        required: true,
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
    }
});

export default Mongo.model<IUserDocument>("user", userSchema);
