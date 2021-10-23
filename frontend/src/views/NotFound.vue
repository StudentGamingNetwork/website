<template>
    <SHeader />
    <SNotFoundLayout />
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SNotFoundLayout from "@/components/pages/notFound/Layout.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "NotFound",
    components: { SFooter, SHeader, SNotFoundLayout }
});
</script>

<style scoped lang="scss">
</style>
