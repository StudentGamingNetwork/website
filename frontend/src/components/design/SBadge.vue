<template>
    <SButton
        :outline="!model"
        :primary="model"
        @click="toggle"
    > 
        <div>
            {{ displayedName }}
        </div>
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
