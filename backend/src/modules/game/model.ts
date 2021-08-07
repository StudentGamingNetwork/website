import Mongo from "@/database";

export interface IGame {
    title: string;
    logo: string;
}

export interface IGameDocument extends IGame, Mongo.Document {
}

const gameSchema: Mongo.Schema = new Mongo.Schema({
    title: {
        faker: "internet.userName",
        type: String
    },
    logo: {
        type: String
    }
});

export default Mongo.model<IGameDocument>("game", gameSchema);
