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
            :model-value="tournament"
            :saved-tournament="savedTournament"
            @update="updateTournament"
            @update:model-value="updateLocalTournament($event)"
        />
        <SStageManagement
            v-if="tournamentsPage === 'stage'"
            :tournament="tournament"
        />
        <STournamentManagement 
            v-if="tournamentsPage === 'management'"
            v-model="tournamentsPage" 
        />
        <STeamPanelValidation
            v-if="tournamentsPage === 'details'"
            :tournament="tournament"
        />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep } from "lodash";
import * as TournamentService from "@/services/tournament";
import { Toast, Tournament, User } from "@/modules";
import STournament from "@/components/pages/tournaments/STournament.vue";
import STeamCard from "@/components/pages/tournaments/STeamCard.vue";
import SLoading from "@/components/design/SLoading.vue";
import SSelector from "@/components/design/SSelector.vue";
import STournamentAdminPanel from "@/components/pages/tournaments/STournamentAdminPanel.vue";
import STournamentManagement from "@/components/pages/tournaments/STournamentManagement.vue";
import STeamPanelValidation from "@/components/pages/tournaments/STeamPanelValidation.vue";
import SStageManagement from "@/components/pages/tournaments/SStageManagement.vue";
import i18n from "@/locales";


const router = useRouter();
const userStore = User.useStore();
const slug = ref(router.currentRoute.value.params.slug as string);

const tournamentsPage = ref("team");

const tournamentsPages = [
    { title: i18n.global.t("components.pages.tournaments.pages.team"), key: "team" },
    { title: i18n.global.t("components.pages.tournaments.pages.admin"), key: "admin" },
    { title: i18n.global.t("components.pages.tournaments.pages.stage"), key: "stage" },
    { title: i18n.global.t("components.pages.tournaments.pages.management"), key: "management" },
    { title: i18n.global.t("components.pages.tournaments.pages.details"), key: "details" }
];

onMounted(() => {
    const page = router.currentRoute.value.params.page as string;
    if (["team", "admin", "stage", "management"].includes(page)) {
        tournamentsPage.value = page;
    }
});

watch(
    () => tournamentsPage.value,
    async () => {
        if (tournamentsPage.value !== router.currentRoute.value.params.page) {
            await router.push(`/tournament/${ slug.value }/${ tournamentsPage.value }`);
        }
    });

const savedTournament = reactive(Tournament.makeObject({}));
const tournament = reactive<Tournament.TTournament>(cloneDeep(savedTournament));
await updateTournament();

function updateLocalTournament(localTournament) {
    assign(tournament, localTournament);
}

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

    const page = router.currentRoute.value.params.page || "" as string;

    if (tournamentApi.settings?.slug) {
        if (tournamentApi.settings?.slug !== slug.value) {
            await router.push(`/tournament/${ tournamentApi.settings?.slug }/${ page }`);
        }
    }
    else {
        await router.push(`/tournament/${ tournamentApi._id }/${ page }`);
    }

    assign(savedTournament, Tournament.makeObject(tournamentApi));
    assign(tournament, cloneDeep(savedTournament));
}

</script>

<style scoped lang="css">
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
