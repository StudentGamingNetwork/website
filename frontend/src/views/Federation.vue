<template>
    <SHeader />
    <SFederationLayout />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SFederationLayout from "@/components/pages/federation/Layout.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Federation",
    components: { SFederationLayout, SFooter, SHeader }
});
</script>

<style scoped lang="scss">

</style>
