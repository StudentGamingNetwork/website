<template>
    <SCard class="team-card">
        <div
            v-if="!isConnected"
            class="empty"
        >
            <div>Pour participer à ce tournoi, vous devez d'abord vous inscrire ou vous connecter.</div>
            <div class="buttons">
                <SButton
                    primary
                    @click="stateStore.modalOpen('signup')"
                >
                    Inscription
                </SButton>
                <SButton
                    outlined
                    @click="stateStore.modalOpen('login')"
                >
                    Connexion
                </SButton>
            </div>
        </div>
        <div
            v-else-if="!hasTeam"
            class="empty"
        >
            <div>Prêt à rejoindre l'arène ?</div>
            <div class="buttons">
                <SButton
                    primary
                    @click="createTeam"
                >
                    Créer une équipe
                </SButton>
                <SButton
                    outlined
                    @click="joinTeam"
                >
                    Rejoindre une équipe
                </SButton>
            </div>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import * as TeamService from "@/services/team";
import { User, State, Toast } from "@/modules";
import SButton from "@/components/design/forms/Button.vue";
import * as TournamentService from "@/services/tournament";

export default defineComponent({
    name: "STeamCard",
    components: { SButton, SCard },
    async setup() {
        const router = useRouter();
        const userStore = User.useStore();
        const stateStore = State.useStore();
        const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
        const team = ref({});

        const isConnected = computed(() => {
            return !!userStore._id;
        });

        const hasTeam = computed(() => {
            return !! team.value._id;
        });

        await getTeam();

        async function getTeam() {
            if (!isConnected.value) {
                return;
            }
            team.value = await TeamService.get(tournamentSlug.value);
        }

        async function joinTeam() {
            const invitationCode = prompt("Entrez le code d'invitation de l'équipe. Vous pouvez le demander au chef d'équipe, il est de la forme XXXX-XXXX.");
        }

        async function createTeam() {
            const response = await Toast.testRequest(async () => {
                return await TeamService.create(tournamentSlug.value);
            });

            if (response?.success) {
                await getTeam();
            }
        }

        return {
            createTeam,
            hasTeam,
            isConnected,
            joinTeam,
            stateStore,
            team
        };
    }
});
</script>

<style scoped lang="scss">
.team-card {
    width: 100%;
    box-sizing: border-box;
    padding: var(--length-padding-l);

    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: var(--length-gap-m);

        .buttons {
            display: flex;
            gap: var(--length-gap-l);
        }
    }
}
</style>
