<template>
    <div class="offset">
        <SButton
            class="button"
            :disabled="model === 1"
            outlined
            @click="updatePagination(1)"
        >
            <span class="center">&lt;&lt;</span>
        </SButton>
        <SButton
            class="button"
            :disabled="model === 1"
            outlined
            @click="updatePagination(model - 1)"
        >
            <span class="center">&lt;</span>
        </SButton>
        <template
            v-for="number in computedButtons"
            :key="number"
        >
            <SButton
                v-if="number!==0"
                class="button"
                :class="{ active: model == number }"
                outlined
                @click="updatePagination(number)"
            >
                <span class="center">{{ number }}</span>
            </SButton>
            <SButton
                v-else
                class="button"
                disabled
                outlined
            >
                <span class="center">...</span>
            </SButton>
        </template>
       
        <SButton
            class="button"
            :disabled="model === total"
            outlined
            @click="updatePagination(model + 1)"
        >
            <span class="center">&gt;</span>
        </SButton>
        <SButton
            class="button"
            :disabled="model === total"
            outlined
            @click="updatePagination(total)"
        >
            <span class="center">&gt;&gt;</span>
        </SButton>
    </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import SButton from "@/components/design/forms/SButton.vue";

const model = defineModel({
    default: 1,
    type: Number
});

const props = defineProps<{
    total: number;
}>();


function updatePagination(newOffset: number) {
    if (newOffset < 1 || newOffset > props.total) {
        return;
    }
    model.value = newOffset; 
}


const computedButtons = computed(() => {
    const buttons = [1];

    if (props.total < 7) {
        for (let i = 2; i <= props.total; i++) {
            buttons.push(i);
        }
        return buttons;
    }

    if (model.value <= 4) {
        buttons.push(2, 3, 4, 5, 0, props.total);
        return buttons;
    }

    if (model.value >= props.total - 3) {
        buttons.push(0, props.total - 4, props.total - 3, props.total - 2, props.total - 1, props.total);
        return buttons;
    }
    buttons.push(0, model.value - 1, model.value , model.value + 1, 0, props.total);
    return buttons;
});

</script>

<style scoped>

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.spacer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--length-gap-l);
}
.button {
    width: var(--length-gap-xl);
    border-color: var( --color-content-softest);
}
.offset {
    display: flex;
    justify-content: center;
    margin-top: var(--length-margin-s);
    gap: var(--length-gap-s);

    .active {
        background-color: var(--color-background-2);
        border-color: var(--color-content-soft);
    }
}
</style>
