<template>
    <div class="offset">
        <SButton
            v-for="number in range(0, Math.ceil(props.arrayLength / displayed))"
            :key="number"
            class="button"
            :class="{ active: router.currentRoute.value.params.page as unknown as number == number }"
            outlined
            @click="updatePagination(number)"
        >
            {{ number }}
        </SButton>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { range } from "lodash";
import SButton from "@/components/design/forms/Button.vue";

const router = useRouter();

const emit = defineEmits(["offset"]);

const props = defineProps<{
    arrayLength: number;
    displayed: number;
}>();


function updatePagination(newOffset: number) {
    router.push(`/${ String(router.currentRoute.value.name) }/${ newOffset }`).then(() => {
        emit("offset");
    }); 
}

</script>

<style scoped>
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
