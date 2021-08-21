<template>
    <SPageHead
        :background="BackgroundAdmin"
        title="Administration"
    >
        Ce panneau d'administration n'est accessible que par les membres du SGN.
        Toutes les informations présentes sont confidentielles, vous ne devez pas les copier ou en prendre des captures d'écran.
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

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BackgroundAdmin from "@/assets/images/backgrounds/admin.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SSelector from "@/components/design/Selector.vue";
import SAdminPanelUsers from "@/components/pages/admin/panels/Users.vue";
import SAdminPanelAssociations from "@/components/pages/admin/panels/Associations.vue";
import SAdminPanelCertificates from "@/components/pages/admin/panels/Certificates.vue";

export default defineComponent({
    name: "SAdminLayout",
    components: { SAdminPanelAssociations, SAdminPanelCertificates, SAdminPanelUsers, SBaseLayout, SPageHead, SSelector },
    setup() {
        const router = useRouter();

        const adminPanels = [
            { title: "Utilisateurs", key: "users" },
            { title: "Associations", key: "associations" },
            { title: "Certificats", key: "certificates" }
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

        return {
            adminPanels,
            BackgroundAdmin,
            selectedPanel
        };
    }
});
</script>

<style scoped lang="scss">
.admin-layout {
    max-width: 960px;
    margin: auto;
}
</style>
