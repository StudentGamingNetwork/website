<template>
    <STournamentsLayout />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import STournamentsLayout from "@/components/pages/tournaments/Layout.vue";

export default defineComponent({
    name: "Tournaments",
    components: { STournamentsLayout }
});
</script>

<style scoped lang="scss">

</style>
