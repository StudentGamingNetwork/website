import Mongo from "@/database";

export interface IToken {
    expirationDate: Date;
    token: string;
    used: boolean;
    user: Mongo.Schema.Types.ObjectId;
}

export interface ITokenDocument extends IToken, Mongo.Document {
}

const tokenSchema: Mongo.Schema = new Mongo.Schema({
    expirationDate: {
        required: true,
        type: Date
    },
    token: {
        required: true,
        type: String
    },
    used: {
        default: false,
        required: true,
        type: Boolean
    },
    user: {
        ref: "user",
        required: true,
        type: Mongo.Schema.Types.ObjectId
    }
}, {
    collation: {
        locale: "fr",
        strength: 1
    }
});



tokenSchema.index(
    {
        token: "text"
    }
);


export default Mongo.models.token || Mongo.model<ITokenDocument>("token", tokenSchema);
