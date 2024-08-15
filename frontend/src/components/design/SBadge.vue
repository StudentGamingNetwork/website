<template>
    <SButton
        :outline="!active"
        :primary="active"
        @click="toggle"
    > 
        <div>
            {{ props.displayedName }}
        </div>
    </SButton>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
import SButton from "@/components/design/forms/Button.vue";

const props = defineProps<{
    displayedName: string;
}>();

const active = ref(true);
const displayedName = ref(props.displayedName);


const toggle = () => {
    active.value = !active.value;
};

defineExpose({
    active,displayedName
});
</script>
