<template>
    <SButton
        outlined
        @click="toggleSort()"
    >
        <div class="sort-content">
            <FontAwesomeIcon :icon="sortIcon" />
            <slot />
        </div>
    </SButton>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SButton from "@/components/design/forms/Button.vue";
import { ESortDirection } from "@/components/design/lib/type";

const model = defineModel<ESortDirection>();

const sortIcon = computed(() => {
    switch (model.value) {
    case ESortDirection.DOWN:
        return ["fas", "sort-down"];
    case ESortDirection.NONE:
        return ["fas", "sort"];
    case ESortDirection.UP:
        return ["fas", "sort-up"];
    }
});

function toggleSort() {
    switch (model.value) {
    case ESortDirection.DOWN:
        model.value = ESortDirection.UP;
        break;
    case ESortDirection.NONE:
        model.value = ESortDirection.DOWN;
        break;
    case ESortDirection.UP:
        model.value = ESortDirection.NONE;
        break;
    }
}
</script>

<style scoped>
.sort-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 var(--lenght-radius-s);
}
</style>
