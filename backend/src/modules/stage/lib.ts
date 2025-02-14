import { ObjectId } from "mongodb";
import httpErrors from "http-errors";
import StageModel, { IStageDocument } from "@/modules/stage/model";

export async function getStageFromSlug(slug: string): Promise<IStageDocument> {
    let stage;

    if (ObjectId.isValid(slug)) {
        stage = await StageModel.findById(slug);
    }

    if (!stage) {
        stage = await StageModel.findOne({ "settings.slug": slug });
    }

    if (!stage) {
        throw new httpErrors.NotFound("Aucune étape trouvé.");
    }

    return stage;
}

