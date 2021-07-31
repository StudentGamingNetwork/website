import Mongo from "@/database";

export interface ISession {
    user: string;
    token: string;
    machine: {
        host: string;
        userAgent: string;
    };
    dates: {
        creation: Date;
        expiration: Date;
    };
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
    user: {
        required: true,
        type: String
    }
});

export default Mongo.model<ISessionDocument>("session", sessionSchema);
