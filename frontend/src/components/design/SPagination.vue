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
            :disabled="currentPage === 1"
            outlined
            @click="() =>{if(currentPage !== 1) updatePagination(currentPage - 1)}"
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
                :class="{ active: router.currentRoute.value.params.page as unknown as number == number }"
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
            :disabled="currentPage === Math.ceil(arrayLength / displayed)"
            outlined
            @click="() => {if (currentPage !== Math.ceil(arrayLength / displayed)) updatePagination(currentPage + 1)}"
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
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import SButton from "@/components/design/forms/Button.vue";

const router = useRouter();

const emit = defineEmits(["offset"]);

const props = defineProps<{
    arrayLength: number;
    currentPage: number;
    displayed: number;
}>();


function updatePagination(newOffset: number) {
    router.push(`/${ String(router.currentRoute.value.name) }/${ newOffset }`).then(() => {
        emit("offset");
    }); 
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

    if (props.currentPage <= 4) {
        buttons.push(2, 3, 4, 5, 0, numberOfPage.value);
        return buttons;
    }

    if (props.currentPage >= numberOfPage.value - 3) {
        buttons.push(0, numberOfPage.value - 4, numberOfPage.value - 3, numberOfPage.value - 2, numberOfPage.value - 1, numberOfPage.value);
        return buttons;
    }
    buttons.push(0, props.currentPage - 1, props.currentPage, props.currentPage + 1, 0, numberOfPage.value);
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
