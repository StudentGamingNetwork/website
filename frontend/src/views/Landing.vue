<template>
    <SHeader />
    <SLandingLayout />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SLandingLayout from "@/components/pages/landing/Layout.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Landing",
    components: { SFooter, SHeader, SLandingLayout }
});
</script>

<style scoped lang="scss">

</style>
