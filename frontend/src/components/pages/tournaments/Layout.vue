<template>
    <SPageHead
        :background="BackgroundTournaments"
        title="Tournois"
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
    </SPageHead>
    <SBaseLayout>
        <div class="layout-tournaments">
            <SSelector
                class="selector"
                :options="tournamentsTypes"
            />
            <SButton
                v-if="userStore.hasTournamentRight"
                outlined
                @click="create"
            >
                Créer un nouveau tournoi
            </SButton>
            <STournament
                v-for="tournament of tournaments"
                :key="tournament.id"
                class="tournament-card"
                :tournament="tournament"
            />
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundTournaments from "@/assets/images/backgrounds/tournaments.png";
import STournament from "@/components/pages/tournaments/Tournament.vue";
import SSelector from "@/components/design/Selector.vue";
import LogoCSGO from "@/assets/images/games/csgo.png";
import LogoTM from "@/assets/images/games/trackmania.png";
import LogoRL from "@/assets/images/games/rocket-league.png";
import { Toast, Tournament, User } from "@/modules";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SButton from "@/components/design/forms/Button.vue";
import * as TournamentService from "@/services/tournament";


export default defineComponent({
    name: "STournamentsLayout",
    components: { SBaseLayout, SButton, SPageHead, SSelector, STournament },
    setup() {
        const userStore = User.useStore();

        const csgoTournament: Tournament.TTournament = {
            id: "a",
            title: "Student Gaming League 2021 : CSGO",
            dates: {
                start: "15 Mai 2021",
                final: "5 Juin 2021",
                playDays: "Les mardis à 19h30",
                subscriptionClose: "13 Mai 2021"
            },
            game: {
                id: "",
                title: "Counter Strike: Global Offensive",
                logoUrl: LogoCSGO
            },
            informations: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
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
            game: {
                id: "",
                title: "Rocket League",
                logoUrl: LogoRL
            },
            informations: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
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
            game: {
                id: "",
                title: "Trackmania",
                logoUrl: LogoTM
            },
            informations: {
                prizes: "*2000€* de cashprize",
                registeredTeams: 27,
                rulesUrl: "https://google.com",
                team: "*5 joueurs* par équipe + *2 remplaçants*"
            }
        };

        const tournamentsTypes = [
            { title: "Prochains tournois", key: "coming" },
            { title: "Tournois en cours", key: "current" },
            { title: "Précédents tournois", key: "past" }
        ];
        const router = useRouter();

        const create = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.create();
            });

            if (response?.success) {
                await router.push(`/tournament/${ response.id }`);
            }
        };

        return {
            BackgroundTournaments,
            create,
            tournaments: [csgoTournament, rlTournament, tmTournament],
            tournamentsTypes,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.layout-tournaments {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--length-gap-xl);
    max-width: 960px;
    margin: auto;

    .tournament-card {
        cursor: pointer;
        box-shadow: 0 0 0 hsla(0,0%,0%,0);

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px hsla(0,0%,0%,0.25);
        }
    }
}
</style>
