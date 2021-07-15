import Mongo from "@/database";

export enum ESchoolType {
    Engineering = "engineering",
    Business = "business",
    Other = "other"
}

/*
Ile-de-France
Normandie / Bretagne / Pays-de-la-Loire
Nouvelle-Aquitaine / Centre-Val-de-Loire
Hauts-de-France
Occitanie / PACA / Corse
Grand Est / Bourgogne-Franche-Comté
Auvergne-Rhone-Alpes
*/

export interface IAssociation {
    title: string;
    tag: string;
    users: {
        admin: Mongo.Schema.Types.ObjectId;
        members: Array<Mongo.Schema.Types.ObjectId>;
        moderators: Array<Mongo.Schema.Types.ObjectId>;
    };
    description: string;
    logoSrc: string;
    school: {
        name: string;
        studentsNumber: number;
        type: ESchoolType;
    };
    address: string;
    networks: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
    };
    mail: string;
}

export interface IAssociationDocument extends IAssociation, Mongo.Document {

}

const associationSchema: Mongo.Schema = new Mongo.Schema({
    title: {
        faker: "company.companyName",
        required: true,
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
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
        studentsNumber: {
            type: Number
        },
        type: {
            enum: Object.values(ESchoolType),
            type: String
        }
    },
    tag: {
        type: String
    },
    users: {
        admin: {
            ref: "user",
            required: true,
            type: Mongo.Schema.Types.ObjectId
        },
        members: [{
            ref: "user",
            type: Mongo.Schema.Types.ObjectId
        }],
        moderators: [{
            ref: "user",
            type: Mongo.Schema.Types.ObjectId
        }]
    }
});

export default Mongo.model<IAssociationDocument>("association", associationSchema);
