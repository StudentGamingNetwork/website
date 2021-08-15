import { PopulatedDoc } from "mongoose";
import Mongo from "@/database";
import { IAssociationDocument } from "@/modules/association/model";

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
    Rejected = "rejected"
}

export interface IUser {
    association?: PopulatedDoc<IAssociationDocument>;
    avatar?: string;
    mail: string;
    password: string;
    platforms: {
        discord?: string;
    };
    roles: Array<ERoles>;
    student: {
        name?: string;
        certificate?: string;
        schoolName?: string;
        status?: EStudentStatus;
        year?: number;
    };
    subscriptionDate: Date;
    username: string;
}

export interface IUserDocument extends IUser, Mongo.Document {
}

const userSchema: Mongo.Schema = new Mongo.Schema({
    association: {
        ref: "association",
        type: Mongo.Schema.Types.ObjectId
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
        discord: {
            default: "",
            type: String
        }
    },
    roles: [{
        enum: Object.values(ERoles),
        type: String
    }],
    student: {
        name: {
            faker: "name.firstName",
            type: String
        },
        certificate: {
            type: String
        },
        schoolName: {
            faker: "company.companyName",
            type: String
        },
        status: {
            default: EStudentStatus.Undefined,
            enum: Object.values(EStudentStatus),
            type: String
        },
        year: {
            type: Number
        }
    },
    subscriptionDate: {
        type: Date
    },
    username: {
        faker: "internet.userName",
        required: true,
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
