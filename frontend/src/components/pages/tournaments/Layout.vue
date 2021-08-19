<template>
    <SPageHead
        :background="BackgroundTournaments"
        title="Tournois"
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper
        semper. Donec pretium massa at enim tincidunt laoreet.
    </SPageHead>
    <SBaseLayout>
        <div class="layout-tournaments">
            <SSelector
                v-model="tournamentType"
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
                :key="tournament._id"
                class="tournament-card"
                :class="{private: !tournament.state?.public}"
                :tournament="tournament"
                @click="openTournament(tournament)"
            />
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundTournaments from "@/assets/images/backgrounds/tournaments.png";
import STournament from "@/components/pages/tournaments/Tournament.vue";
import SSelector from "@/components/design/Selector.vue";
import { Toast, User, Tournament } from "@/modules";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SButton from "@/components/design/forms/Button.vue";
import * as TournamentService from "@/services/tournament";
import { ETournamentType } from "@/services/tournament";


export default defineComponent({
    name: "STournamentsLayout",
    components: { SBaseLayout, SButton, SPageHead, SSelector, STournament },
    async setup() {
        const userStore = User.useStore();
        const router = useRouter();

        const tournamentType = ref(ETournamentType.Coming);
        const tournaments = ref<Array<Tournament.TTournament>>([]);

        const tournamentsTypes = [
            { title: "Prochains tournois", key: ETournamentType.Coming },
            { title: "Tournois en cours", key: ETournamentType.Current },
            { title: "Précédents tournois", key: ETournamentType.Past }
        ];

        watch(
            () => tournamentType.value,
            async () => {
                await list();
            });

        await list();

        function openTournament(tournament: Tournament.TTournament) {
            let slug = tournament._id;
            if (tournament.settings?.slug) {
                slug = tournament.settings.slug;
            }

            router.push(`/tournament/${ slug }`);
        }

        async function list() {
            tournaments.value = await TournamentService.list(tournamentType.value);
        }

        async function create() {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.create();
            });

            if (response?.success) {
                await router.push(`/tournament/${ response.id }`);
            }
        }

        return {
            BackgroundTournaments,
            create,
            openTournament,
            tournaments,
            tournamentsTypes,
            tournamentType,
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
        box-shadow: 0 0 0 hsla(0, 0%, 0%, 0);

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.25);
        }

        &.private {
            background: var(--color-background-0);
        }
    }
}
</style>
