<template>
    <div class="tournament-widget">
        <STournamentWidgetLayout />
    </div>
</template>

<script lang="ts" setup>
</script>

<script setup lang="ts">
import STournamentWidgetLayout from "@/components/pages/tournaments/widget/STournamentWidgetLayout.vue";

document.documentElement.setAttribute("data-widget", "");
</script>

<style scoped lang="css">
.tournament-widget {
}
</style>
