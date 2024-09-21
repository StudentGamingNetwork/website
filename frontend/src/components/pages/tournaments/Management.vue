<template>
    <div class="tournament-management">
        <SSelector
            v-model="managementPage"
            :options="managementPages"
        />
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
                Aucun équipe trouvée...
            </div>
        </div>
        <template v-else>
            <router-link    
                v-for="team of teams" 
                :key="team._id"
                class="link"
                :to="'/tournament/manage/' + team._id"
            >
                <STournamentManagementTeamCard
                    :team="team"
                    @update="updateSearch"
                />
            </router-link>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { Team } from "@/modules";
import * as AdminService from "@/services/admin";
import STournamentManagementTeamCard from "@/components/pages/tournaments/SManagementTeamCard.vue";
import SSelector from "@/components/design/Selector.vue";

export default defineComponent({
    name: "STournamentManagement",
    components: { FontAwesomeIcon, SSelector, STournamentManagementTeamCard },
    setup() {
        const router = useRouter();
        const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
        const isSearching = ref(true);
        const teams = ref([] as Array<Team.TTeam>);

        const managementPage = ref("forming");

        const managementPages = [
            { title: "En formation", key: "forming" },
            { title: "Prêtes", key: "ready" },
            { title: "Validées", key: "validated" }
        ];

        watch(
            () => managementPage.value,
            async () => {
                if (managementPage.value !== router.currentRoute.value.params.management) {
                    await router.push(`/tournament/${ tournamentSlug.value }/management/${ managementPage.value }`);

                    await updateSearch();
                }
            });

        onMounted(async () => {
            const page = router.currentRoute.value.params.management as string;

            if (["forming", "ready", "validated"].includes(page)) {
                managementPage.value = page;
            }

            await updateSearch();
        });

        async function updateSearch() {
            isSearching.value = true;
            teams.value = await AdminService.teamList(tournamentSlug.value, managementPage.value);
            isSearching.value = false;
        }

        return {
            isSearching,
            managementPage,
            managementPages,
            teams,
            updateSearch
        };
    }
});
</script>

<style scoped lang="scss">
.tournament-management {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-l);

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

    .link {
        text-decoration: none;
    }
}
</style>
