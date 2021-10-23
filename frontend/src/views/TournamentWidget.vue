<template>
    <div class="tournament-widget">
        <STournamentWidgetLayout />
    </div>
</template>

<script lang="ts">
export default {
    name: "STournamentWidget"
};
</script>

<script setup lang="ts">
import STournamentWidgetLayout from "@/components/pages/tournaments/widget/Layout.vue";

document.documentElement.setAttribute("data-widget", "");
</script>

<style scoped lang="scss">
.tournament-widget {
}
</style>
