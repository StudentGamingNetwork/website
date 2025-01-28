<template>
    <SCard
        class="tournament-stage"
        @click="model='general'"
    >
        <FontAwesomeIcon
            class="icon"
            :icon="['fas', 'plus']"
            size="3x"
        />
        <span>Créer une nouvelle étape</span>
    </SCard>
</template>

<script lang="ts" setup>
import { defineModel } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import * as StageService from "@/services/stage";
import { Toast } from "@/modules";

const model = defineModel<string>();

async function createStage() {
    const response = await Toast.testRequest(async () => {
        return await StageService.create(tournamentSlug.value);
    });

    if (response?.success) {
        await updateStage();
    }

    team.members[playerIndex.value].username = username.value;

    await sendUpdate();
}


</script>


<style scoped lang="scss">
.tournament-stage {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--length-padding-l);
    box-sizing: border-box;
    background-color: var(--color-background-2);
    gap: var(--length-gap-m);

    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s;
        border-color: var(--color-content-softest);
    }

    span {
        text-align: center;
    }
}
</style>
