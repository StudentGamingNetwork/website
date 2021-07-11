<template>
    <SPageHead
        :background="BackgroundTournaments"
        title="Tournois"
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
    </SPageHead>
    <div class="layout-tournaments">
        <SSelector
            class="selector"
            :options="tournamentsTypes"
        />
        <STournament
            v-for="tournament of tournaments"
            :key="tournament.id"
            :tournament="tournament"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundTournaments from "@/assets/images/backgrounds/tournaments.png";
import STournament from "@/components/pages/tournaments/Tournament.vue";
import SSelector from "@/components/design/Selector.vue";
import LogoCSGO from "@/assets/images/games/csgo.png";
import LogoTM from "@/assets/images/games/trackmania.png";
import LogoRL from "@/assets/images/games/rocket-league.png";
import { Tournament } from "@/modules";

export default defineComponent({
    name: "STournamentsLayout",
    components: { SPageHead, SSelector, STournament },
    setup() {
        const csgoTournament: Tournament.TTournament = {
            id: "a",
            title: "Student Gaming League 2021 : CSGO",
            dates: {
                start: "15 Mai 2021",
                final: "5 Juin 2021",
                playDays: "Les mardis à 19h30",
                subscriptionClose: "13 Mai 2021"
            },
            description: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
            },
            game: {
                id: "",
                title: "Counter Strike: Global Offensive",
                logoUrl: LogoCSGO
            }
        };
        const rlTournament: Tournament.TTournament = {
            id: "b",
            title: "Student Gaming League 2021 : Rocket League",
            dates: {
                start: "15 Mai 2021",
                final: "5 Juin 2021",
                playDays: "Les mardis à 19h30",
                subscriptionClose: "13 Mai 2021"
            },
            description: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
            },
            game: {
                id: "",
                title: "Rocket League",
                logoUrl: LogoRL
            }
        };
        const tmTournament: Tournament.TTournament = {
            id: "c",
            title: "Student Gaming League 2021 : Trackmania",
            dates: {
                start: "15 Mai 2021",
                final: "5 Juin 2021",
                playDays: "Les mardis à 19h30",
                subscriptionClose: "13 Mai 2021"
            },
            description: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
            },
            game: {
                id: "",
                title: "Trackmania",
                logoUrl: LogoTM
            }
        };

        const tournamentsTypes = [
            { title: "Prochains tournois", key: "coming" },
            { title: "Tournois en cours", key: "current" },
            { title: "Précédents tournois", key: "past" }
        ];

        return {
            BackgroundTournaments,
            tournaments: [csgoTournament, rlTournament, tmTournament],
            tournamentsTypes
        };
    }
});
</script>

<style scoped lang="scss">
.layout-tournaments {
    padding: 96px 128px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--length-gap-xl);

    .selector {
        width: 960px;
    }
}
</style>
