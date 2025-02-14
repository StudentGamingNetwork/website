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

export const TieBreakers = {
    POINTS: {
        name: "Points",
        description: "Le participant qui a gagné le plus de points dans les matches joués contre ses adversaires ex aequo remporte le tie-break."
    },
    MATCH_WIN_DRAW_LOSE: {
        name: "Match Victoires/Égalités/Défaites",
        description: "Le participant qui a le plus grand nombre de victoires, puis le plus grand nombre de nuls et enfin le plus grand nombre de défaites (un match perdu a plus de valeur qu'aucun match joué ou qu'un match perdu par forfait) remporte le tie-break."
    },
    MATCH_FORFEIT: {
        name: "Match abandonné",
        description: "Le participant ayant le plus petit nombre de matchs abandonnés remporte le tie-break."
    },
    MATCH_SCORE_FOR: {
        name: "Score match pour",
        description: "Le participant ayant accumulé le plus grand nombre de points remporte le tie-break."
    },
    MATCH_SCORE_AGAINST: {
        name: "Score match contre",
        description: "Le participant dont le score cumulé est le plus bas remporte le tie-break."
    },
    MATCH_SCORE_DIFF: {
        name: "Différence de score",
        description: "Le participant ayant la plus grande différence de score (« différence de score » = « score pour » - « score contre ») remporte l'égalité."
    },
    GAME_WINS: {
        name: "Victoires de partie",
        description: "Le participant ayant le plus grand nombre de parties gagnées remporte le tie-break."
    },
    GAME_DRAWS: {
        name: "Égalités de partie",
        description: "Le participant ayant le plus grand nombre de parties nulles remporte le tie-break."
    },
    GAME_LOSES: {
        name: "Défaites de partie",
        description: "Le participant ayant le plus petit nombre de parties perdues remporte le tie-break."
    },
    GAME_FORFEIT: {

    }
}

export enum EStageGroupComposition {
    ADJACENT = "Adjacent",
    EFFORT = "Effort", // équilibré
    SEED = "Seed", // Les meilleurs sont réparties de manière équilibrée
    BRACKET = "Bracket" // Les meilleurs sont réparties de manière à ce qu'ils ne se rencontrent pas trop tôt
}

export enum EStageGrandFinal {
    NONE = "None",
    SIMPLE = "Simple",
    DOUBLE = "Double"
}

export enum EStageMatchFormat {
    NONE = "None",
    BEST_OF = "Best of",
    SINGLE = "Single",
    HOMEGUEST = "Home/guest",
    FIXED = "Fixed"

}

export enum EStageMatchCalculation {
    NONE = "None",
    SCORE = "Score",
    RESULT = "Result",
}
