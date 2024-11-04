<template>
    <SCard
        class="tournament-stage"
        @click="model='general'"
    >
        <FontAwesomeIcon
            class="icon"
            :icon="['fas', 'plus']"
            size="3x"
        />
        <span>Créer une nouvelle étape</span>
    </SCard>
</template>

<script lang="ts" setup>
import { defineModel } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";

const model = defineModel<string>();

</script>


<style scoped lang="scss">
.tournament-stage {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--length-padding-l);
    box-sizing: border-box;
    background-color: var(--color-background-2);
    gap: var(--length-gap-m);

    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s;
        border-color: var(--color-content-softest);
    }

    span {
        text-align: center;
    }
}
</style>
