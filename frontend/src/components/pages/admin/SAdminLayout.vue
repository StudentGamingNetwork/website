<template>
    <SPageHead
        :background="BackgroundAdmin"
        :title="$t('components.pages.admin.title')"
    >
        {{ $t("components.pages.admin.head") }}
    </SPageHead>
    <SBaseLayout>
        <div class="admin-layout">
            <SSelector
                v-model="selectedPanel"
                :options="adminPanels"
            />
            <SAdminPanelUsers v-if="selectedPanel === 'users'" />
            <SAdminPanelAssociations v-if="selectedPanel === 'associations'" />
            <SAdminPanelCertificates v-if="selectedPanel === 'certificates'" />
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BackgroundAdmin from "@/assets/images/backgrounds/admin.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SSelector from "@/components/design/SSelector.vue";
import SAdminPanelUsers from "@/components/pages/admin/panels/SAdminPanelUsers.vue";
import SAdminPanelAssociations from "@/components/pages/admin/panels/SAdminPanelAssociations.vue";
import SAdminPanelCertificates from "@/components/pages/admin/panels/SAdminPanelCertificates.vue";
import i18n from "@/locales";


const router = useRouter();

const adminPanels = [
    { title: i18n.global.t("components.pages.admin.users"), key: "users" },
    { title: i18n.global.t("components.pages.admin.associations"), key: "associations" },
    { title: i18n.global.t("components.pages.admin.certificates"), key: "certificates" }
];

const selectedPanel = ref("users");

onMounted(() => {
    const page = router.currentRoute.value.params.page as string;

    if (["users", "associations", "certificates"].includes(page)) {
        selectedPanel.value = page;
    }
});

watch(
    () => selectedPanel.value,
    async () => {
        await router.push(`/admin/${ selectedPanel.value }`);
    });


</script>

<style scoped lang="css">
.admin-layout {
    max-width: 960px;
    margin: auto;
}
</style>
