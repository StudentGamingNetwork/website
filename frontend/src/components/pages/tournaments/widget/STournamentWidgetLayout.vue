<template>
    <div class="layout">
        <STournamentWidget :tournament="tournament" />
        <SSignUp v-if="!isConnected" />
        <template v-else>
            <SUser />
            <STeamCard :tournament="tournament" />
        </template>
    </div>
    <div
        v-if="tournament.settings.code"
        v-html="tournament.settings.code"
    />
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { assign } from "lodash";
import { Toast, Tournament, User } from "@/modules";
import * as TournamentService from "@/services/tournament";
import SSignUp from "@/components/pages/tournaments/widget/SSignUp.vue";
import STournamentWidget from "@/components/pages/tournaments/widget/STournamentWidget.vue";
import STeamCard from "@/components/pages/tournaments/widget/STeamCard.vue";
import SUser from "@/components/pages/tournaments/widget/User.vue";

const router = useRouter();
const userStore = User.useStore();
const slug = ref(router.currentRoute.value.params.slug as string);

const tournament = reactive(Tournament.makeObject({}));

async function updateTournament() {
    const tournamentApi = await Toast.testRequest(async () => {
        return await TournamentService.get(slug.value);
    }, { onlyError: true });

    assign(tournament, Tournament.makeObject(tournamentApi));
}

const isConnected = computed(() => {
    return !!userStore._id;
});

onMounted(async() => {
    await updateTournament();
});
</script>

<style scoped lang="scss">
.layout {
    padding: var(--length-padding-s);

    display: flex;
    flex-direction: column;
    gap: var(--length-gap-l);
}
</style>
