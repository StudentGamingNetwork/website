import Mongo from "@/database";

export interface IPartner {
    name: string;
    description: string;
    logo: string;
    networks: {
        facebook: string;
        twitter: string;
        website: string;
    };
    public: boolean;
}

export interface IPartnerDocument extends IPartner, Mongo.Document {
}

const partnerSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "company.company.name",
        required: true,
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    networks: {
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
    public: Boolean
});

export default Mongo.models.partner || Mongo.model<IPartnerDocument>("partner", partnerSchema);
