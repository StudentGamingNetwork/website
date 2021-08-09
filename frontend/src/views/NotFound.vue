<template>
    <SNotFoundLayout />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SNotFoundLayout from "@/components/pages/notFound/Layout.vue";

export default defineComponent({
    name: "NotFound",
    components: { SNotFoundLayout }
});
</script>

<style scoped lang="scss">
</style>
