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

export enum EStageType {
    DUEL_SINGLE_ELIM = "DSE",
    DUEL_DOUBLE_ELIM = "DDE",
    DUEL_GAUNTLET = "DG",
    DUEL_BRACKET_GROUPS = "DBG",
    DUEL_ROUND_ROBIN = "DRR",
    DUEL_LEAGUE = "DL",
    DUEL_SWISS_SYSTEM = "DSS",
    FFA_SIMPLE = "FS",
    FFA_SINGLE_ELIM = "FSE",
    FFA_BRACKET_GROUPS = "FBG",
    FFA_LEAGUE = "FL"
}

export enum EStageParingMethod {
    MANUAL = "Manual",
    BALANCED = "Score groups balanced", // score + fort avec fort
    RANDOM = "Score groups random", // score + fort avec faible
    OPPOSITE = "Score groups opposite" // score + random
}

export enum EStageTieBreaker {}

export enum EStageGroupComposition {
    ADJACENT = "Adjacent",
    EFFORT = "Effort", // équilibré
    SEED = "Seed", // Les meilleurs sont réparties de manière équilibrée
    BRACKET = "Bracket" // Les meilleurs sont réparties de manière à ce qu'ils ne se rencontrent pas trop tôt
}
