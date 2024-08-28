<template>
    <div class="offset">
        <SButton
           
            class="button"
            outlined
            @click="updatePagination(1)"
        >
            <span class="center"><<</span>
        </SButton>
        <SButton
           
            class="button"
            :disabled="model === 1"
            outlined
            @click="() =>{if(model !== 1) updatePagination(model - 1)}"
        >
            <span class="center"><</span>
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
                {{ number }}
            </SButton>
            <span
                v-else
                class="spacer"
            >. . .</span>
        </template>
       
        <SButton
           
            class="button"
            :disabled="model === Math.ceil(arrayLength / displayed)"
            outlined
            @click="() => {if (model !== Math.ceil(arrayLength / displayed)) updatePagination(model + 1)}"
        >
            <span class="center">></span>
        </SButton>
        <SButton
           
            class="button"
            outlined
            @click="updatePagination(Math.ceil(arrayLength / displayed))"
        >
            <span class="center">>></span>
        </SButton>
    </div>
</template>


<script setup lang="ts">
import { computed, ref } from "vue";
import SButton from "@/components/design/forms/Button.vue";

const model = defineModel({
    default: 1,
    type: Number
});

const props = defineProps<{
    arrayLength: number;
    displayed: number;
}>();


function updatePagination(newOffset: number) {
    model.value = newOffset; 
}


const computedButtons = computed(() => {
    const buttons = [1];
    const numberOfPage = ref(Math.ceil(props.arrayLength / props.displayed));

    if (numberOfPage.value < 7) {
        for (let i = 2; i <= numberOfPage.value; i++) {
            buttons.push(i);
        }
        return buttons;
    }

    if (model.value <= 4) {
        buttons.push(2, 3, 4, 5, 0, numberOfPage.value);
        return buttons;
    }

    if (model.value >= numberOfPage.value - 3) {
        buttons.push(0, numberOfPage.value - 4, numberOfPage.value - 3, numberOfPage.value - 2, numberOfPage.value - 1, numberOfPage.value);
        return buttons;
    }
    buttons.push(0, model.value - 1, model.value , model.value + 1, 0, numberOfPage.value);
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
    width: 40px;
}
.button {
    width: 40px;
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
