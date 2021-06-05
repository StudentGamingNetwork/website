import Mongo from "@/database";

export interface IConfig {
    name: string;
    data: Record<string, any>;
}

interface IConfigDocument extends IConfig, Mongo.Document {
}

const configSchema: Mongo.Schema = new Mongo.Schema({
    data: { type: Object },
    name: { required: true, type: String }
});

export default Mongo.model<IConfigDocument>("config", configSchema);
