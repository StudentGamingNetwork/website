import Mongo from "@/database";

export interface IPartner {
    name: string;
    description: string;
    links: {
        facebook: string;
        twitter: string;
        website: string;
    };
    logo: Mongo.Schema.Types.ObjectId;
}

export interface IPartnerDocument extends IPartner, Mongo.Document {
}

const partnerSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "company.companyName",
        required: true,
        type: String
    },
    description: {
        type: String
    },
    links: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        website: {
            type: String
        }
    },
    logo: {
        type: Mongo.Schema.Types.ObjectId
    }
});

export default Mongo.model<IPartnerDocument>("partner", partnerSchema);
