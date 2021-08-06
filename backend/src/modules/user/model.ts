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

export enum EStudentStatus {
    Undefined = "undefined",
    Processing = "processing",
    Validated = "validated",
    Rejected = "rejected",
    Outdated = "outdated"
}

export enum EStudentCertificateType {
    Undefined = "undefined",
    Image = "image",
    Document = "document",
}

export interface IUser {
    name: string;
    avatar: string;
    mail: string;
    password: string;
    platforms: Record<string, string>;
    roles: Array<ERoles>;
    student: {
        certificateType: EStudentCertificateType;
        lastModifier: Mongo.Schema.Types.ObjectId;
        message: string;
        status: EStudentStatus;
    };
    username: string;
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
    student: {
        certificateType: {
            enum: Object.values(EStudentCertificateType),
            type: String
        },
        lastModifier: {
            ref: "user",
            required: true,
            type: Mongo.Schema.Types.ObjectId
        },
        message: String,
        status: {
            enum: Object.values(EStudentStatus),
            type: String
        }
    },
    username: {
        faker: "internet.userName",
        type: String
    }
});

userSchema.index(
    {
        name: "text",
        mail: "text",
        username: "text"
    }
);

export default Mongo.model<IUserDocument>("user", userSchema);
