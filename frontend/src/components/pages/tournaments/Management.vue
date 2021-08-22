<template>
    <div class="tournament-management">
        <div
            v-if="isSearching"
            class="loading"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','spinner']"
                spin
            />
        </div>
        <div
            v-else-if="teams.length === 0"
            class="empty"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','frown']"
            />
            <div class="description">
                Aucun équipe inscrite...
            </div>
        </div>
        <template v-else>
            <STournamentManagementTeamCard
                v-for="team of teams"
                :key="team._id"
                :team="team"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { Team } from "@/modules";
import * as AdminService from "@/services/admin";
import STournamentManagementTeamCard from "@/components/pages/tournaments/ManagementTeamCard.vue";

export default defineComponent({
    name: "STournamentManagement",
    components: { FontAwesomeIcon, STournamentManagementTeamCard },
    setup() {
        const router = useRouter();
        const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
        const isSearching = ref(true);
        const teams = ref([] as Array<Team.TTeam>);

        onMounted(async () => {
            teams.value = await AdminService.teamList(tournamentSlug.value);
            isSearching.value = false;
        });

        return {
            isSearching,
            teams
        };
    }
});
</script>

<style scoped lang="scss">
.tournament-management {
    width: 100%;

    .empty, .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: var(--length-gap-m);
        margin: var(--length-margin-l) 0;

        .icon {
            width: 64px;
            height: 64px;
            color: var(--color-content-litest);
        }

        .description {
            text-align: center;
            color: var(--color-content-liter);
        }
    }
}
</style>
