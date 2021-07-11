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
    description: {
        prizes: string;
        registeredTeams: number;
        rulesUrl: string;
        team: string;
    };
    game: Game.TGame;
}
