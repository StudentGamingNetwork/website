import Mongo from "@/database";

export interface IConfig {
    name: string;
    data: Record<string, any>;
}

interface IConfigDocument extends IConfig, Mongo.Document {
}

const configSchema: Mongo.Schema = new Mongo.Schema({
    name: { required: true, type: String },
    data: { type: Object }
});

export default Mongo.models.donaconfigtion || Mongo.model<IConfigDocument>("config", configSchema);
