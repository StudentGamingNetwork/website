<template>
    <div class="offset">
        <SButton
            v-for="number in range(1, Math.ceil(props.arrayLength / displayed))"
            :key="number"
            class="button"
            :class="{ offset: number === number ? 'active' : '' }"
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
const offset = router.currentRoute.value.params.page;
const fullPath = router.currentRoute.value.name;

const emit = defineEmits(["offset"]);

const props = defineProps<{
    arrayLength: number;
    displayed: number;
}>();


function updatePagination(newOffset: number) {
    router.push(`/${ fullPath }/${ newOffset }`).then(() => {
        emit("offset");
    }); 
}

</script>

<style scoped>
.button {
    width: 40px;
}
.offset {
    display: flex;
    justify-content: center;
    margin-top: var(--length-margin-s);
    gap: var(--length-gap-s);

    .active {
        background-color: var(--color-content-soft);
    }
}
</style>
