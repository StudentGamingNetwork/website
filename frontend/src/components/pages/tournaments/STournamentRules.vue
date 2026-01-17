<template>
    <SCard class="tournament-rules-panel">
        <div v-if="props.tournament.informations.rulesUrl" class="rules-container">
            <iframe 
                :src="props.tournament.informations.rulesUrl" 
                type="application/pdf" 
                width="100%" 
                height="600px" />

            <SButton 
                primary
                class="button"
                :disabled="hasAcceptedRules || !hasTeam "
                @click="acceptRules"
            >
                {{ i18n.global.t("components.pages.tournaments.rules.accept") }}
            </SButton>
        </div>


        <p v-else>{{ i18n.global.t("components.pages.tournaments.rules.error") }}</p>
    </SCard>
</template>

<script lang="ts" setup>
import SButton from "@/components/design/forms/SButton.vue";
import SCard from "@/components/design/SCard.vue";
import { Team, Toast, Tournament, User } from "@/modules";
import * as TeamService from "@/services/team";
import { assign } from "lodash";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import i18n from "@/locales";

const router = useRouter();
const userStore = User.useStore();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);

const team = reactive(Team.Lib.makeObject({}));

const isConnected = computed(() => !!userStore._id);
const hasTeam = computed(() => !!team._id);
const hasAcceptedRules = computed(() => {
    return team.members.some((member) => {
        return member.user._id === userStore._id && member.acceptedRules;
    });
});

const props = defineProps<{
    tournament: {
        required: true;
        type: Tournament.TTournament;
    };
}>();



async function updateTeam() {
    if (!isConnected.value) {
        return;
    }
    const teamApi = await TeamService.get(tournamentSlug.value);
    assign(team, teamApi);

    if (!teamApi._id) {
        team._id = "";
    }
}

async function acceptRules() {
    if (hasAcceptedRules.value) {
        return;
    }

    if (!hasTeam.value || !confirm(i18n.global.t("components.pages.tournaments.rules.confirmation"))) {
        return;
    }

    team.members.forEach((member) => {
        if (member.user._id === userStore._id) {
            member.acceptedRules = true;
        }
    });

    const response = await Toast.testRequest(async () => {
        return await TeamService.update(team);
    });

    if(response) {
        await updateTeam();
    }

}


await updateTeam();

</script>

<style scoped lang="css">
.tournament-rules-panel {
    padding: var(--length-padding-l);
    box-sizing: border-box;
    width: 100%;
    display: grid;
    justify-items: center;

    .rules-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--length-gap-m);

        iframe {
            border: none;
            box-shadow: var(--shadow-elevation-2);
        }

        .button {
            border-color: var( --color-content-softest);
        }
        
    }
}
</style>
