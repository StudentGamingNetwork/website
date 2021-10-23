<template>
    <SHeader />
    <SAboutLayout />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SAboutLayout from "@/components/pages/about/Layout.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "About",
    components: { SAboutLayout, SFooter, SHeader }
});
</script>

<style scoped lang="scss">

</style>
