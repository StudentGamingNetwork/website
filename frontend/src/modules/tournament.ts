import { Game } from "@/modules";

export type TTournament = {
    id: string;
    title: string;
    dates: {
        final: string;
        playDays: string;
        start: string;
        subscriptionClose: string;
    };
    game: Game.TGame;
    informations: {
        prizes: string;
        registeredTeams: number;
        rulesUrl: string;
        team: string;
    };
}
