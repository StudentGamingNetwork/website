<template>
    <div class="tournament-layout">
        <STournament
            class="tournament-card"
            :tournament="tournament"
        />
        <SSelector
            v-if="userStore.hasTournamentRight"
            v-model="tournamentsPage"
            :options="tournamentsPages"
        />
        <Suspense v-if="tournamentsPage === 'team'">
            <template #default>
                <STeamCard :tournament="savedTournament" />
            </template>
            <template #fallback>
                <SLoading />
            </template>
        </Suspense>
        <STournamentAdminPanel
            v-if="tournamentsPage === 'admin'"
            v-model="tournament"
            :saved-tournament="savedTournament"
            @update="updateTournament"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep } from "lodash";
import * as TournamentService from "@/services/tournament";
import { Toast, Tournament, User } from "@/modules";
import STournament from "@/components/pages/tournaments/Tournament.vue";
import STeamCard from "@/components/pages/tournaments/TeamCard.vue";
import SLoading from "@/components/design/Loading.vue";
import SSelector from "@/components/design/Selector.vue";
import STournamentAdminPanel from "@/components/pages/tournaments/AdminPanel.vue";

export default defineComponent({
    name: "STournamentsSingleLayout",
    components: { SLoading, SSelector, STeamCard, STournament, STournamentAdminPanel },
    async setup() {
        const router = useRouter();
        const userStore = User.useStore();
        const slug = ref(router.currentRoute.value.params.slug as string);

        const tournamentsPage = ref("team");

        const tournamentsPages = [
            { title: "Équipe", key: "team" },
            { title: "Administration", key: "admin" },
            { title: "Gestion", key: "management" }
        ];

        const savedTournament = reactive(Tournament.makeObject({}));
        const tournament = reactive<Tournament.TTournament>(cloneDeep(savedTournament));
        await updateTournament();


        async function updateTournament() {
            const tournamentApi = await Toast.testRequest(async () => {
                return tournament._id ? await TournamentService.get(tournament._id) : await TournamentService.get(slug.value);
            }, { onlyError: true });

            if (!tournamentApi) {
                await router.push("/404");
            }

            if (tournamentApi.dates?.subscriptionClose) {
                const subscriptionClose = new Date(tournamentApi.dates?.subscriptionClose);
                tournamentApi.dates.subscriptionClose = `${ subscriptionClose.getFullYear() }-` +
                    `${ (subscriptionClose.getMonth() + 1).toString().padStart(2, "0") }-` +
                    `${ subscriptionClose.getDate().toString().padStart(2, "0") }`;
            }

            if (tournamentApi.settings?.slug) {
                if (tournamentApi.settings?.slug !== slug.value) {
                    await router.push(`/tournament/${ tournamentApi.settings?.slug }`);
                }
            }
            else {
                await router.push(`/tournament/${ tournamentApi._id }`);
            }

            assign(savedTournament, Tournament.makeObject(tournamentApi));
            assign(tournament, cloneDeep(savedTournament));
        }

        return {
            savedTournament,
            tournament,
            tournamentsPage,
            tournamentsPages,
            updateTournament,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.tournament-layout {
    margin: var(--length-margin-l) auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
    width: 100%;
    gap: var(--length-gap-l);
}
</style>
