<template>
    <SButton
        primary
        @click="toggleSort()"
    >
        <div class="sort-content">
            <FontAwesomeIcon
                :icon="sortIcon"
            />
            {{ props.sortField }}
        </div>
    </SButton>
</template>

<script setup lang="ts">
import { computed, ref, defineExpose } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SButton from "@/components/design/forms/Button.vue";

enum ESortDirection {
    DOWN = 0,
    NONE = 1,
    UP = 2
}

const sortCount = ref(ESortDirection.NONE);

const props = defineProps({
    sortField: {
        default: "Région",
        required: true,
        type: String
    }
});

const sortIcon = computed(() => {
    switch (sortCount.value) {
    case ESortDirection.DOWN:
        return ["fas", "sort-down"];
    case ESortDirection.NONE:
        return ["fas", "sort"];
    case ESortDirection.UP:
        return ["fas", "sort-up"];
    default:
        return ["fas", "sort"];
    }
});

function toggleSort() {
    sortCount.value = (sortCount.value + 1) % 3;
}

defineExpose({ sortCount });
</script>

<style scoped>
.sort-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 var(--lenght-radius-s);
}
</style>
