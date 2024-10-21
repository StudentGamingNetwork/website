import Mongo from "@/database";

export interface ISession {
    dates: {
        creation: Date;
        expiration: Date;
    };
    machine: {
        host: string;
        userAgent: string;
    };
    token: string;
    twoFactorAuth: boolean;
    userId: string;
}

export interface ISessionDocument extends ISession, Mongo.Document {
}

const sessionSchema: Mongo.Schema = new Mongo.Schema({
    dates: {
        creation: {
            required: true,
            type: Date
        },
        expiration: {
            required: true,
            type: Date
        }
    },
    machine: {
        host: {
            required: true,
            type: String
        },
        userAgent: {
            required: true,
            type: String
        }
    },
    token: {
        required: true,
        type: String
    },
    twoFactorAuth: {
        default: false,
        required: true,
        type: Boolean
    },
    userId: {
        required: true,
        type: String
    }
});

export default Mongo.model<ISessionDocument>("session", sessionSchema);
