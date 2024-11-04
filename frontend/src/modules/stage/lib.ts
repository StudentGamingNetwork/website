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
    BALANCED = "Score_groups_balanced", // score + fort avec fort
    RANDOM = "Score_groups_random", // score + fort avec faible
    OPPOSITE = "Score_groups_opposite" // score + random
}

export enum EStageTieBreaker {}

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
    BEST_OF = "Best_of",
    SINGLE = "Single",
    HOMEGUEST = "Home_guest",
    FIXED = "Fixed"

}
