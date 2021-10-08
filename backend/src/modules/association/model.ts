import Mongo from "@/database";

export enum ESchoolType {
    Engineering = "engineering",
    Business = "business",
    Other = "other"
}

export enum ERegion {
    none = "none",
    IDF = "idf", // Ile-de-France
    NBP = "nbp", // Normandie / Bretagne / Pays-de-la-Loire
    NAC = "nac", // Nouvelle-Aquitaine / Centre-Val-de-Loire
    HDF = "hdf", // Hauts-de-France
    OPC = "opc", // Occitanie / PACA / Corse
    GEB = "geb", // Grand Est / Bourgogne-Franche-Comté
    ARA = "ara", // Auvergne-Rhone-Alpes
}

export interface IAssociation {
    name: string;
    federation: {
        isValidated: boolean;
        region: ERegion;
    };
    lastOwnerChange: Date;
    logo: string;
    mail: string;
    networks: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
        website: string;
    };
    school: {
        name: string;
        address: string;
        studentsNumber: number;
        type: ESchoolType;
    };
    settings: {
        invitationCode: string;
        slug: string;
    };
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
    federation: {
        isValidated: {
            default: false,
            type: Boolean
        },
        region: {
            default: ERegion.none,
            enum: Object.values(ERegion),
            type: String
        }
    },
    lastOwnerChange: {
        type: Date
    },
    logo: {
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
        },
        website: {
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
        studentsNumber: {
            type: Number
        },
        type: {
            enum: Object.values(ESchoolType),
            type: String
        }
    },
    settings: {
        invitationCode: {
            type: String
        },
        slug: {
            type: String
        }
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

associationSchema.index(
    {
        name: "text",
        mail: "text",
        "school.name": "text"
    }
);

export default Mongo.model<IAssociationDocument>("association", associationSchema);
