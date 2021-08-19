import { ObjectId } from "mongodb";
import httpErrors from "http-errors";
import TournamentModel, { ITournamentDocument } from "@/modules/tournament/model";

export async function getTournamentFromSlug(slug: string): Promise<ITournamentDocument> {
    let tournament;

    if (ObjectId.isValid(slug)) {
        tournament = await TournamentModel.findById(slug);
    }

    if (!tournament) {
        tournament = await TournamentModel.findOne({ "settings.slug": slug });
    }

    if (!tournament) {
        throw new httpErrors.NotFound("Aucun tournoi trouvé.");
    }

    return tournament;
}
