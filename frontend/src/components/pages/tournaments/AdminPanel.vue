<template>
    <SCard class="tournament-admin-panel">
        <SSectionTitle class="title">
            Paramètres du tournoi
        </SSectionTitle>
        <SModalSection class="tournament-section">
            <SModalSectionTitle>Tournoi</SModalSectionTitle>
            <SAvatarPicker
                :icon="['fas', 'trophy']"
                title="Logo"
                :url="logoUrl"
                @file-change="uploadLogo"
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
                :modified="
                    tournament.informations.prizes !== savedTournament.informations.prizes
                "
                title="Prix et cashprize"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.rulesUrl"
                :modified="
                    tournament.informations.rulesUrl !==
                        savedTournament.informations.rulesUrl
                "
                title="Lien du règlement"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.important.message"
                :modified="
                    tournament.informations.important.message !==
                        savedTournament.informations.important.message
                "
                title="Information importante"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.important.externalLink"
                :modified="
                    tournament.informations.important.externalLink !==
                        savedTournament.informations.important.externalLink
                "
                title="Lien externe de l'information importante"
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
        <SModalSection class="integration-section">
            <SModalSectionTitle>Intégration</SModalSectionTitle>
            <SInput
                v-model="tournament.settings.toornament"
                :modified="
                    tournament.settings.toornament !== savedTournament.settings.toornament
                "
                title="ID toornament"
                @enter="sendUpdate"
            />
            <SInputCopier
                :content="widgetUrl"
                title="Lien du widget"
            />
            <STextarea
                v-model="tournament.settings.code"
                :modified="tournament.settings.code !== savedTournament.settings.code"
                title="Code custom"
            />
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
                v-model="tournament.game.username"
                :modified="tournament.game.username !== savedTournament.game.username"
                title="Nom de l'identifiant"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.playersNumber"
                :modified="
                    tournament.game.team.playersNumber !==
                        savedTournament.game.team.playersNumber
                "
                title="Nombre de joueurs par équipe"
                type="number"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.substitutesNumber"
                :modified="
                    tournament.game.team.substitutesNumber !==
                        savedTournament.game.team.substitutesNumber
                "
                title="Nombre de remplaçants par équipe"
                type="number"
                @enter="sendUpdate"
            />
            <SCheckbox
                v-model="tournament.game.team.coachEnabled"
                :modified="
                    tournament.game.team.coachEnabled !==
                        savedTournament.game.team.coachEnabled
                "
                title="Possibilité d'avoir un coach dans l'équipe"
                @enter="sendUpdate"
            />
            <SCheckbox
                v-model="tournament.game.team.managerEnabled"
                :modified="
                    tournament.game.team.managerEnabled !==
                        savedTournament.game.team.managerEnabled
                "
                title="Possibilité d'avoir un manager dans l'équipe"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.maxTeams"
                :modified="
                    tournament.game.team.maxTeams !== savedTournament.game.team.maxTeams
                "
                title="Nombre maximum d'équipes"
                type="number"
                @enter="sendUpdate"
            />
        </SModalSection>
        <SModalSection class="dates-section">
            <SModalSectionTitle>Dates</SModalSectionTitle>
            <SInput
                v-model="tournament.dates.subscriptionClose"
                :modified="
                    tournament.dates.subscriptionClose !==
                        savedTournament.dates.subscriptionClose
                "
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
        <SModalSection class="location-section">
            <SModalSectionTitle>Localisation</SModalSectionTitle>
            <SCheckbox
                v-model="tournament.isLAN"
                :modified="tournament.isLAN !== savedTournament.isLAN"
                title="Tournoi en présentiel"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.position.latitude"
                :max="90"
                :min="-90"
                :modified="
                    tournament.position.latitude !== savedTournament.position.latitude
                "
                :step="0.001"
                title="Latitude"
                type="number"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.position.longitude"
                :max="180"
                :min="-180"
                :modified="
                    tournament.position.longitude !== savedTournament.position.longitude
                "
                :step="0.001"
                title="Longitude"
                type="number"
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import { assign, isMatch, max } from "lodash";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import { Toast, Tournament, User } from "@/modules";
import * as TournamentService from "@/services/tournament";
import { ERoles } from "@/services/user";
import SInputCopier from "@/components/design/forms/InputCopier.vue";
import { getWidgetUrl } from "@/services/tournament";
import STextarea from "@/components/design/forms/Textarea.vue";
import SCheckbox from "@/components/design/forms/SCheckbox.vue";

export default defineComponent({
    name: "STournamentAdminPanel",
    components: {
        SAvatarPicker,
        SButton,
        SCard,
        SCheckbox,
        SInput,
        SInputCopier,
        SModalSection,
        SModalSectionTitle,
        SModalSeparator,
        SSectionTitle,
        STextarea
    },
    props: {
        modelValue: {
            default: () => {
                return {};
            },
            type: Object as PropType<Tournament.TTournament>
        },
        savedTournament: {
            required: true,
            type: Object as PropType<Tournament.TTournament>
        }
    },
    emits: ["update", "update:modelValue"],
    setup(props, context) {
        const router = useRouter();
        const userStore = User.useStore();
        const tournament = reactive(Tournament.makeObject({}));

        watch(
            () => props.modelValue,
            async () => {
                assign(tournament, props.modelValue);
            },
            { deep: true, immediate: true }
        );

        watch(
            () => tournament,
            async () => {
                context.emit("update:modelValue", tournament);
            },
            { deep: true }
        );

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
            return TournamentService.getLogoUrl({
                id: tournament._id,
                logo: tournament.settings.logo
            });
        });

        const hasChanged = computed(
            () => !isMatch(props.savedTournament, tournament)
        );

        const widgetUrl = computed(() => getWidgetUrl({ id: tournament._id }));

        const sendUpdate = async () => {
            if (!hasChanged.value) {
                return;
            }
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update(tournament, tournament._id);
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        const togglePublic = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update(
                    { state: { public: !tournament.state.public } },
                    tournament._id
                );
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        const toggleArchived = async () => {
            const response = await Toast.testRequest(async () => {
                return await TournamentService.update(
                    { state: { archived: !tournament.state.archived } },
                    tournament._id
                );
            });

            if (response?.success) {
                context.emit("update");
            }
        };

        async function deleteTournament() {
            const canDelete = userStore.hasRoles([
                ERoles.Member,
                ERoles.Tournament,
                ERoles.Council
            ]);
            if (!canDelete) {
                alert(
                    "Vous n'avez pas les droits pour supprimer un tournoi. Demandez à l'administrateur du site ou au responsable tournoi."
                );
                return;
            }

            if (
                !confirm(
                    "Il est préférable d'archiver le tournoi. Êtes-vous sûr de vouloir le supprimer ? Cette action est définitive."
                )
            ) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TournamentService.remove(tournament._id);
            });

            if (response?.success) {
                await router.push("/tournaments");
            }
        }

        return {
            deleteTournament,
            hasChanged,
            logoUrl,
            sendUpdate,
            toggleArchived,
            togglePublic,
            tournament,
            uploadLogo,
            widgetUrl
        };
    }
});
</script>

<style scoped lang="scss">
.tournament-admin-panel {
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
        "dates integration"
        "location integration"
        "save save";

    @media (max-width: 999px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "title"
        "tournament"
        "widget"
        "game"
        "dates"
        "location"
        "save";
    }

    .title {
        grid-area: title;
    }

    .tournament-section {
        grid-area: tournament;
    }

    .integration-section {
        grid-area: integration;
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
</style>
