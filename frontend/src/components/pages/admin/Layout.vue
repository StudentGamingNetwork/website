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
            test
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BackgroundAdmin from "@/assets/images/backgrounds/admin.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SSelector from "@/components/design/Selector.vue";

export default defineComponent({
    name: "SAdminLayout",
    components: { SBaseLayout, SPageHead, SSelector },
    setup() {
        const adminPanels = [
            { title: "Utilisateurs", key: "users" },
            { title: "Associations", key: "associations" },
            { title: "Membres", key: "members" }
        ];

        const selectedPanel = ref("users");

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
