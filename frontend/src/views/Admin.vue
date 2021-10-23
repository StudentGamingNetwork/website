<template>
    <SHeader />
    <SAdminLayout />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SAdminLayout from "@/components/pages/admin/Layout.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Admin",
    components: { SAdminLayout, SFooter, SHeader }
});
</script>

<style scoped lang="scss">

</style>
