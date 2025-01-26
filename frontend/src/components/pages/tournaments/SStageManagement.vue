<template>
    <SSelector
        v-model="stagePage"
        :options="stageManagementPages"
    />
    <SCard
        v-if="stagePage === 'overview'"
    >
        <SStageCard v-model="stagePage" />
    </SCard>

    <SStageManageGeneral v-if="stagePage==='general'" />

    <SStageManageAdvanced v-if="stagePage==='advanced'" />

    <SStageManageSettings v-if="stagePage==='match'" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SStageCard from "@/components/pages/tournaments/stage/SStageCard.vue";
import SCard from "@/components/design/Card.vue";
import SSelector from "@/components/design/Selector.vue";
import SStageManageGeneral from "@/components/pages/tournaments/stage/SStageManageGeneral.vue";
import SStageManageAdvanced from "@/components/pages/tournaments/stage/SStageManageAdvanced.vue";
import SStageManageSettings from "@/components/pages/tournaments/stage/SStageManageSettings.vue";


const router = useRouter();

const pluck = (arr: Array<{ title: string; key: string }>, key: keyof { title: string; key: string }) => arr.map(i => i[key]);


const stagePage = ref("overview");

const stageManagementPages = [
    { title: "Vue d'ensemble", key: "overview" },
    { title: "Général", key: "general" },
    { title: "Avancé", key: "advanced" },
    { title: "Paramètres de match", key: "match" }
];

onMounted(() => {
    const page = router.currentRoute.value.params.page as string;
    if (pluck(stageManagementPages,"key").includes(page)) {
        stagePage.value = page;
    }
});

</script>


<style scoped lang="scss">
</style>
