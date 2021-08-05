import Mongo from "@/database";

export interface IUpload {
    name: string;
    file: string;
    mime: string;
    size: number;
}

export interface IUploadDocument extends IUpload, Mongo.Document {

}

const uploadSchema: Mongo.Schema = new Mongo.Schema({
    name: {
        faker: "system.commonFileName",
        required: true,
        type: String
    },
    file: {
        faker: "system.filePath",
        type: String
    },
    mime: {
        faker: "system.commonFileType",
        type: String
    },
    size: {
        type: Number
    }
});

export default Mongo.model<IUploadDocument>("upload", uploadSchema);
