<template>
    <SCard>
        <div class="tournament-stage-panel">
            <SCard
                v-for="stage in stages"
                :key="stage._id"
                class="tournament-stage"
                @click="openStage(stage._id)"
            >
                <span>{{ stage.name }}</span>
                <span>{{ stage.type }}</span>
                <span>{{ stage.number }}</span>
            </SCard>
            <SCard
                class="tournament-stage"
                @click="createStage"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'plus']"
                    size="3x"
                />
                <span>Créer une nouvelle étape</span>
            </SCard>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import SCard from "@/components/design/Card.vue";
import * as StageService from "@/services/stage";
import { Toast } from "@/modules";
import { TStage } from "@/modules/stage";

const model = defineModel<string>();


const router = useRouter();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);


const stages = ref([] as Array<TStage>);

await list();

async function openStage(stageId: string) {
    await router.push(`/tournament/${ tournamentSlug.value }/stage/${ stageId }`);
    model.value = "general";
}

async function createStage() {
    const response = await Toast.testRequest(async () => {
        return await StageService.create(tournamentSlug.value);
    });

    if (response?.success) {
        openStage(response.id);
    }
}

async function list() {
    stages.value = await StageService.list(tournamentSlug.value);
}


</script>


<style scoped lang="scss">
.tournament-stage-panel{

    width: 960px;
    display: flex;
    flex-wrap: wrap;
    gap: var(--length-gap-xxl);
    padding: var(--length-padding-s);


    .tournament-stage {
        aspect-ratio: 1 / 1;
        width: 200px;
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
}
</style>
