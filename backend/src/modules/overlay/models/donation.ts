import Mongo from "@/database";

export interface IDonation {
    amount: string;
    author: string;
    date: Date;
    message: string;
}

export interface IDonationDocument extends IDonation, Mongo.Document {
}

const donationSchema: Mongo.Schema = new Mongo.Schema({
    amount: {
        type: Number
    },
    author: {
        faker: "internet.userName",
        required: true,
        type: String
    },
    date: {
        type: Date
    },
    message: {
        type: String
    }
});

export default Mongo.model<IDonationDocument>("donation", donationSchema);
