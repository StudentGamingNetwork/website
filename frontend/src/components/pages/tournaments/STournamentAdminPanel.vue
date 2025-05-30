<template>
    <SCard class="tournament-admin-panel">
        <SSectionTitle class="title">
            {{ $t("components.pages.tournaments.admin.title") }}
        </SSectionTitle>
        <SModalSection class="tournament-section">
            <SModalSectionTitle>  {{ $t("components.pages.tournaments.title") }}</SModalSectionTitle>
            <SAvatarPicker
                :icon="['fas', 'trophy']"
                title="Logo"
                :url="logoUrl"
                @file-change="uploadLogo"
            />
            <SInput
                v-model="tournament.name"
                :modified="tournament.name !== savedTournament.name"
                :title="$t('components.pages.tournaments.admin.name')"
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
                :title="$t('components.pages.tournaments.admin.prizes')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.rulesUrl"
                :modified="
                    tournament.informations.rulesUrl !==
                        savedTournament.informations.rulesUrl
                "
                :title="$t('components.pages.tournaments.admin.rulesLink')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.important.message"
                :modified="
                    tournament.informations.important.message !==
                        savedTournament.informations.important.message
                "
                :title="$t('components.pages.tournaments.admin.importantInfo')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.informations.important.externalLink"
                :modified="
                    tournament.informations.important.externalLink !==
                        savedTournament.informations.important.externalLink
                "
                :title="$t('components.pages.tournaments.admin.externalLink')"
                @enter="sendUpdate"
            />
            <div class="buttons">
                <SButton
                    class="button"
                    outlined
                    @click="togglePublic"
                >
                    {{ tournament.state.public ? $t("components.pages.tournaments.admin.hide") : $t("components.pages.tournaments.admin.public") }}
                </SButton>
                <SButton
                    class="button"
                    outlined
                    @click="toggleArchived"
                >
                    {{ tournament.state.archived ? $t("components.pages.tournaments.admin.unarchive") : $t("components.pages.tournaments.admin.archive") }}
                </SButton>
            </div>
        </SModalSection>
        <SModalSection class="integration-section">
            <SModalSectionTitle>{{ $t("components.pages.tournaments.admin.integration.title") }}</SModalSectionTitle>
            <SInput
                v-model="tournament.settings.toornament"
                :modified="
                    tournament.settings.toornament !== savedTournament.settings.toornament
                "
                :title="$t('components.pages.tournaments.admin.integration.id')"
                @enter="sendUpdate"
            />
            <SInputCopier
                :content="widgetUrl"
                :title="$t('components.pages.tournaments.admin.integration.widgetUrl')"
            />
            <STextarea
                v-model="tournament.settings.code"
                :modified="tournament.settings.code !== savedTournament.settings.code"
                :title="$t('components.pages.tournaments.admin.integration.code')"
            />
        </SModalSection>
        <SModalSection class="game-section">
            <SModalSectionTitle>{{ $t('components.pages.tournaments.admin.game.title') }}</SModalSectionTitle>
            <SInput
                v-model="tournament.game.name"
                :modified="tournament.game.name !== savedTournament.game.name"
                :title="$t('components.pages.tournaments.admin.game.name')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.username"
                :modified="tournament.game.username !== savedTournament.game.username"
                :title="$t('components.pages.tournaments.admin.game.username')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.playersNumber"
                :modified="
                    tournament.game.team.playersNumber !==
                        savedTournament.game.team.playersNumber
                "
                :title="$t('components.pages.tournaments.admin.game.playerByTeam')"
                type="number"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.substitutesNumber"
                :modified="
                    tournament.game.team.substitutesNumber !==
                        savedTournament.game.team.substitutesNumber
                "
                :title="$t('components.pages.tournaments.admin.game.subByTeam')"
                type="number"
                @enter="sendUpdate"
            />
            <SCheckbox
                v-model="tournament.game.team.coachEnabled"
                :modified="
                    tournament.game.team.coachEnabled !==
                        savedTournament.game.team.coachEnabled
                "
                :title="$t('components.pages.tournaments.admin.game.coachEnabled')"
                @enter="sendUpdate"
            />
            <SCheckbox
                v-model="tournament.game.team.managerEnabled"
                :modified="
                    tournament.game.team.managerEnabled !==
                        savedTournament.game.team.managerEnabled
                "
                :title="$t('components.pages.tournaments.admin.game.managerEnabled')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.game.team.maxTeams"
                :modified="
                    tournament.game.team.maxTeams !== savedTournament.game.team.maxTeams
                "
                :title="$t('components.pages.tournaments.admin.game.maxTeams')"
                type="number"
                @enter="sendUpdate"
            />
        </SModalSection>
        <SModalSection class="dates-section">
            <SModalSectionTitle>{{ $t('components.pages.tournaments.admin.dates.title') }}</SModalSectionTitle>
            <SInput
                v-model="tournament.dates.subscriptionClose"
                :modified="
                    tournament.dates.subscriptionClose !==
                        savedTournament.dates.subscriptionClose
                "
                :title="$t('components.pages.tournaments.admin.dates.subClose')"
                type="date"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.start"
                :modified="tournament.dates.start !== savedTournament.dates.start"
                :title="$t('components.pages.tournaments.admin.dates.start')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.playDays"
                :modified="tournament.dates.playDays !== savedTournament.dates.playDays"
                :title="$t('components.pages.tournaments.admin.dates.playDay')"
                @enter="sendUpdate"
            />
            <SInput
                v-model="tournament.dates.final"
                :modified="tournament.dates.final !== savedTournament.dates.final"
                :title="$t('components.pages.tournaments.admin.dates.final')"
                @enter="sendUpdate"
            />
        </SModalSection>
        <SModalSection class="location-section">
            <SModalSectionTitle>{{ $t('components.pages.tournaments.admin.location.title') }}</SModalSectionTitle>
            <SCheckbox
                v-model="tournament.isLAN"
                :modified="tournament.isLAN !== savedTournament.isLAN"
                :title="$t('components.pages.tournaments.admin.location.isLan')"
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
                {{ $t('components.pages.tournaments.admin.save') }}
            </SButton>
            <SModalSectionTitle>Danger Zone</SModalSectionTitle>
            <SButton
                danger
                outlined
                @click="deleteTournament"
            >
                {{ $t('components.pages.tournaments.admin.delete') }}
            </SButton>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import { assign, isMatch } from "lodash";
import { useRouter } from "vue-router";
import SCard from "@/components/design/SCard.vue";
import SSectionTitle from "@/components/design/SSectionTitle.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SAvatarPicker from "@/components/design/forms/SAvatarPicker.vue";
import SInput from "@/components/design/forms/SInput.vue";
import SButton from "@/components/design/forms/SButton.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import { Toast, Tournament, User } from "@/modules";
import * as TournamentService from "@/services/tournament";
import { ERoles } from "@/services/user";
import SInputCopier from "@/components/design/forms/SInputCopier.vue";
import { getWidgetUrl } from "@/services/tournament";
import STextarea from "@/components/design/forms/STextarea.vue";
import SCheckbox from "@/components/design/forms/SCheckbox.vue";
import i18n from "@/locales";


const props = defineProps<{
    modelValue: Tournament.TTournament;
    savedTournament: Tournament.TTournament;
}>();

const emit = defineEmits(["update", "update:modelValue"]);
   
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
        emit("update:modelValue", tournament);
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
        emit("update");
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
        emit("update");
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
        emit("update");
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
            i18n.global.t("components.pages.tournaments.admin.deleteAlert")
        );
        return;
    }

    if (
        !confirm(
            i18n.global.t("components.pages.tournaments.admin.deleteConfirm")
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

</script>

<style scoped lang="css">
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
