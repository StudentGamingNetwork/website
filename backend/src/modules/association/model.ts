import Mongo from "@/database";

export enum ESchoolType {
    Engineering = "engineering",
    Business = "business",
    Other = "other"
}

export enum ERegion {
    IDF = "idf", // Ile-de-France
    NBP = "nbp", // Normandie / Bretagne / Pays-de-la-Loire
    NAC = "nac", // Nouvelle-Aquitaine / Centre-Val-de-Loire
    HDF = "hdf", // Hauts-de-France
    OPC = "opc", // Occitanie / PACA / Corse
    GEB = "geb", // Grand Est / Bourgogne-Franche-Comté
    ARA = "ara", // Auvergne-Rhone-Alpes
}

export enum EAssociationState {
    New = "new",
    Validated = "validated",
    Rejected = "rejected"
}

export interface IAssociation {
    name: string;
    description: string;
    lastOwnerChange: Date;
    logoSrc: string;
    mail: string;
    networks: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
    };
    school: {
        name: string;
        address: string;
        region: ERegion;
        studentsNumber: number;
        type: ESchoolType;
    };
    state: EAssociationState;
    tag: string;
    users: {
        members: Array<Mongo.Schema.Types.ObjectId>;
        moderators: Array<Mongo.Schema.Types.ObjectId>;
        owner: Mongo.Schema.Types.ObjectId;
    };
}

export interface IAssociationDocument extends IAssociation, Mongo.Document {

}

const associationSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "company.companyName",
        required: true,
        type: String
    },
    description: {
        type: String
    },
    lastOwnerChange: {
        type: Date
    },
    logoSrc: {
        type: String
    },
    mail: {
        type: String
    },
    networks: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitch: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    school: {
        name: {
            type: String
        },
        address: {
            type: String
        },
        location: {
            type: String
        },
        region: {
            enum: Object.values(ERegion),
            type: String
        },
        studentsNumber: {
            type: Number
        },
        type: {
            enum: Object.values(ESchoolType),
            type: String
        }
    },
    state: {
        enum: Object.values(EAssociationState),
        type: String
    },
    tag: {
        type: String
    },
    users: {
        members: [{
            ref: "user",
            type: Mongo.Schema.Types.ObjectId
        }],
        moderators: [{
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

export default Mongo.model<IAssociationDocument>("association", associationSchema);
