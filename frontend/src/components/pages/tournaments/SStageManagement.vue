<template>
    <SSelector
        v-model="stagePage"
        :options="stageManagementPages"
        @click="(event) => test(event)"
    />
   
    <SStageOverview
        v-if="stagePage === 'overview'"
        v-model="stagePage"
    />


    <SStageManageGeneral
        v-if="stagePage==='general'"
        v-model="stage"
        :saved-stage="savedStage"
        @update-stage="updateStage"
    />

    <SStageManageAdvanced
        v-if="stagePage==='advanced'"
        v-model="stage"
        :saved-stage="savedStage"
        @update-stage="updateStage"
    />

    <SStageManageSettings
        v-if="stagePage==='match'"
        v-model="stage"
        :saved-stage="savedStage"
        @update-stage="updateStage"
    />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep } from "lodash";
import SStageOverview from "@/components/pages/tournaments/stage/SStageOverview.vue";
import * as StageService from "@/services/stage";
import SSelector from "@/components/design/Selector.vue";
import SStageManageGeneral from "@/components/pages/tournaments/stage/SStageManageGeneral.vue";
import SStageManageAdvanced from "@/components/pages/tournaments/stage/SStageManageAdvanced.vue";
import SStageManageSettings from "@/components/pages/tournaments/stage/SStageManageSettings.vue";
import { Stage, Toast } from "@/modules";


const router = useRouter();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);


const pluck = (arr: Array<{ title: string; key: string }>, key: keyof { title: string; key: string }) => arr.map(i => i[key]);


const stagePage = ref("overview");

const stageManagementPages = [
    { title: "Vue d'ensemble", key: "overview" },
    { title: "Général", key: "general" },
    { title: "Avancé", key: "advanced" },
    { title: "Paramètres de match", key: "match" }
];


const savedStage = reactive(Stage.makeObject({}));
const stage = reactive<Stage.TStage>(cloneDeep(savedStage));
await updateStage();


async function updateStage() {
    const stageSlug = ref(router.currentRoute.value.params.management as string);
    
    
    if (!stageSlug.value) {
        stagePage.value = "overview";
        return;
    }
    const stageApi = await Toast.testRequest(async () => {
        return await StageService.details(tournamentSlug.value,stageSlug.value);
    }, { onlyError: true });

    assign(savedStage, Stage.makeObject(stageApi.stage));
    assign(stage, cloneDeep(savedStage));

    if (!stageApi.stage._id) {
        stage._id = "";
    }
}



onMounted(() => {
    const page = router.currentRoute.value.params.page as string;
    
    if (pluck(stageManagementPages,"key").includes(page)) {
        stagePage.value = page;
    }
});

</script>


<style scoped lang="scss">
</style>
