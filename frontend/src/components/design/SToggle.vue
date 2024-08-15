<template>
    <SButton
        class="button"
        :class="{inactive: !model}"
        outlined
        @click="toggle"
    >
        {{ displayedName }}
    </SButton>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SButton from "@/components/design/forms/Button.vue";
import { getRegionName } from "@/services/association";

const props = defineProps<{
    id: string;
}>();

const model = defineModel<boolean>();
const displayedName = computed(() => getRegionName(props.id));

const toggle = () => {
    model.value = !model.value;
};
</script>

<style scoped>
.button {
    --color-button-border: var(--color-background-2);
    background: var(--color-background-1);

    &.inactive {
        background: transparent;
        opacity: 0.3;
    }
}
</style>
