<template>
    <SPageHead
        :background="BackgroundTournaments"
        :title="$t('components.pages.tournaments.title')"
    >
        {{ $t('components.pages.tournaments.head') }}
    </SPageHead>
    <SBaseLayout>
        <div class="layout-tournaments">
            <SSelector
                v-model="tournamentType"
                class="selector"
                :options="tournamentsTypes"
            />
            <SButton
                v-if="userStore?.hasTournamentRight"
                outlined
                @click="create"
            >
                {{ $t('components.pages.tournaments.create') }}
            </SButton>
            <template v-if="tournaments.length">
                <STournament
                    v-for="tournament of tournaments"
                    :key="tournament._id"
                    class="tournament-card"
                    :class="{private: !tournament.state?.public}"
                    :tournament="tournament"
                    @click="openTournament(tournament)"
                />
            </template>
            <div
                v-else
                class="empty"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas','frown']"
                />
                <div class="description">
                    {{ $t('components.pages.tournaments.noTournament') }}
                </div>
            </div>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SPageHead from "@/components/template/SPageHead.vue";
import BackgroundTournaments from "@/assets/images/backgrounds/tournaments.png";
import STournament from "@/components/pages/tournaments/STournament.vue";
import SSelector from "@/components/design/SSelector.vue";
import { Toast, User, Tournament } from "@/modules";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SButton from "@/components/design/forms/SButton.vue";
import * as TournamentService from "@/services/tournament";
import { ETournamentType } from "@/services/tournament";
import i18n from "@/locales";

const userStore = User.useStore();
const router = useRouter();

const tournamentType = ref(ETournamentType.Coming);
const tournaments = ref<Array<Tournament.TTournament>>([]);

const tournamentsTypes = [
    { title: i18n.global.t("components.pages.tournaments.types.coming"), key: ETournamentType.Coming },
    { title: i18n.global.t("components.pages.tournaments.types.current"), key: ETournamentType.Current },
    { title: i18n.global.t("components.pages.tournaments.types.past"), key: ETournamentType.Past }
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
        await router.push(`/tournament/${ response.id }/admin`);
    }
}

</script>

<style scoped lang="css">
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
            background: repeating-linear-gradient(
                    -45deg,
                    var(--color-background-2),
                    var(--color-background-2) 32px,
                    var(--color-background-1) 32px,
                    var(--color-background-1) 64px
            );
        }
    }

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
