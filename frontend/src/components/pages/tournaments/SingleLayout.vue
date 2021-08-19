<template>
    <div class="tournament-layout">
        <STournament
            class="tournament-card"
            :tournament="tournament"
        />
        <Suspense>
            <template #default>
                <STeamCard />
            </template>
            <template #fallback>
                <SLoading />
            </template>
        </Suspense>
        <SCard
            v-if="userStore.hasTournamentRight"
            class="tournament-form"
        >
            <SSectionTitle class="title">
                Panneau d'administration
            </SSectionTitle>
            <SModalSection class="tournament-section">
                <SModalSectionTitle>Tournoi</SModalSectionTitle>
                <SAvatarPicker
                    :icon="['fas', 'trophy']"
                    title="Logo"
                    :url="logoUrl"
                    @fileChange="uploadLogo"
                />
                <SInput
                    v-model="tournament.name"
                    :modified="tournament.name !== savedTournament.name"
                    title="Nom du tournoi"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.settings.slug"
                    :modified="tournament.settings.slug !== savedTournament.settings.slug"
                    title="Slug"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.informations.prizes"
                    :modified="tournament.informations.prizes !== savedTournament.informations.prizes"
                    title="Prix et cashprize"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.informations.rulesUrl"
                    :modified="tournament.informations.rulesUrl !== savedTournament.informations.rulesUrl"
                    title="Lien du règlement"
                    @enter="sendUpdate"
                />
                <div class="buttons">
                    <SButton
                        class="button"
                        outlined
                        @click="togglePublic"
                    >
                        {{ tournament.state.public ? "Cacher" : "Rendre public" }}
                    </SButton>
                    <SButton
                        class="button"
                        outlined
                        @click="toggleArchived"
                    >
                        {{ tournament.state.archived ? "Désarchiver" : "Archiver" }}
                    </SButton>
                </div>
            </SModalSection>
            <SModalSection class="game-section">
                <SModalSectionTitle>Jeu</SModalSectionTitle>
                <SInput
                    v-model="tournament.game.name"
                    :modified="tournament.game.name !== savedTournament.game.name"
                    title="Nom du jeu"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.game.team.playersNumber"
                    :modified="tournament.game.team.playersNumber !== savedTournament.game.team.playersNumber"
                    title="Nombre de joueurs par équipe"
                    type="number"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.game.team.substitutesNumber"
                    :modified="tournament.game.team.substitutesNumber !== savedTournament.game.team.substitutesNumber"
                    title="Nombre de remplaçants par équipe"
                    type="number"
                    @enter="sendUpdate"
                />
            </SModalSection>
            <SModalSection class="dates-section">
                <SModalSectionTitle>Dates</SModalSectionTitle>
                <SInput
                    v-model="tournament.dates.subscriptionClose"
                    :modified="tournament.dates.subscriptionClose !== savedTournament.dates.subscriptionClose"
                    title="Fin des inscriptions"
                    type="date"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.dates.start"
                    :modified="tournament.dates.start !== savedTournament.dates.start"
                    title="Début du tournoi"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.dates.playDays"
                    :modified="tournament.dates.playDays !== savedTournament.dates.playDays"
                    title="Jours de match"
                    @enter="sendUpdate"
                />
                <SInput
                    v-model="tournament.dates.final"
                    :modified="tournament.dates.final !== savedTournament.dates.final"
                    title="Finale"
                    @enter="sendUpdate"
                />
            </SModalSection>
            <div class="save">
                <SModalSeparator />
                <SButton
                    :disabled="!hasChanged"
                    primary
                    @click="sendUpdate"
                >
                    Sauvegarder les changements
                </SButton>
                <SModalSectionTitle>Danger Zone</SModalSectionTitle>
                <SButton
                    danger
                    outlined
                    @click="deleteTournament"
                >
                    Supprimer le tournoi
                </SButton>
            </div>
        </SCard>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { cloneDeep, isMatch, merge } from "lodash";
import * as TournamentService from "@/services/tournament";
import { Toast, Tournament, User } from "@/modules";
import STournament from "@/components/pages/tournaments/Tournament.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import { ERoles } from "@/services/user";
import STeamCard from "@/components/pages/tournaments/TeamCard.vue";
import SCard from "@/components/design/Card.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SLoading from "@/components/design/Loading.vue";

export default defineComponent({
    name: "STournamentsSingleLayout",
    components: { SAvatarPicker, SButton, SCard, SInput, SLoading, SModalSection, SModalSectionTitle, SModalSeparator, SSectionTitle, STeamCard, STournament },
    async setup() {
        const router = useRouter();
        const userStore = User.useStore();
        const slug = ref(router.currentRoute.value.params.slug as string);

        const savedTournament = reactive(Tournament.makeObject({}));
        const tournament = reactive<Tournament.TTournament>(cloneDeep(savedTournament));
        await updateTournament();

        const uploadLogo = async (file: File) => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.uploadLogo({ file }, tournament._id);
            });

            if (response?.success) {
                tournament.settings.logo = response.logo;
            }
        };

        const logoUrl = computed(() => {
            if (!tournament.settings?.logo) {
                return "";
            }
            return TournamentService.getLogoUrl({ id: tournament._id, logo: tournament.settings.logo });
        });

        const hasChanged = computed(() => {
            return !isMatch(savedTournament, tournament);
        });

        const sendUpdate = async () => {
            if (!hasChanged.value) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TournamentService.update(tournament, tournament._id);
            });

            if (response?.success) {
                await updateTournament();
            }
        };

        const togglePublic = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update({ state: { public: !tournament.state.public } }, tournament._id);
            });

            if (response?.success) {
                await updateTournament();
            }
        };

        const toggleArchived = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update({ state: { archived: !tournament.state.archived } }, tournament._id);
            });

            if (response?.success) {
                await updateTournament();
            }
        };

        async function deleteTournament() {
            const canDelete = userStore.hasRoles([ERoles.Member, ERoles.Tournament, ERoles.Council]);
            if (!canDelete) {
                alert("Vous n'avez pas les droits pour supprimer un tournoi. Demandez à l'administrateur du site ou au responsable tournoi.");
                return;
            }

            if (!confirm("Il est préférable d'archiver le tournoi. Êtes-vous sûr de vouloir le supprimer ? Cette action est définitive.")) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TournamentService.remove(tournament._id);
            });

            if (response?.success) {
                await router.push("/tournaments");
            }
        }

        async function updateTournament() {
            const tournamentApi = await Toast.testRequest(async () => {
                return tournament._id ? await TournamentService.get(tournament._id) : await TournamentService.get(slug.value);
            }, { onlyError: true });

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

            merge(savedTournament, Tournament.makeObject(tournamentApi));
            merge(tournament, cloneDeep(savedTournament));
        }

        return {
            deleteTournament,
            hasChanged,
            logoUrl,
            savedTournament,
            sendUpdate,
            toggleArchived,
            togglePublic,
            tournament,
            uploadLogo,
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

    .tournament-form {
        padding: var(--length-padding-l);
        box-sizing: border-box;
        width: 100%;
        display: grid;
        column-gap: var(--length-gap-m);
        row-gap: var(--length-gap-l);
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
        "title title"
        "tournament game"
        "tournament dates"
        "save save";

        .title {
            grid-area: title;
        }

        .tournament-section {
            grid-area: tournament;
        }

        .game-section {
            grid-area: game;
        }

        .dates-section {
            grid-area: dates;
        }

        .save {
            grid-area: save;
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-m);
            align-items: flex-start;
        }

        .buttons {
            display: flex;
            gap: var(--length-gap-m);
            width: 318px;

            .button {
                flex-grow: 1;
                flex-basis: 1px;
            }
        }
    }
}
</style>
