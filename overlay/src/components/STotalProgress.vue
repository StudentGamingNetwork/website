<template>
    <div class="wrapper-progress">
        <div class="progress-bar"></div>
        <div class="total">
            {{ displayPrice(donationStore.total/100) }}
        </div>
        <div class="goal">
            {{ displayPrice(currentLevel.sum) }} <span class="description">({{currentLevel.name}})</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "STotalProgress"
};
</script>

<script setup lang="ts">
import { useDonationStore } from "../store";
import { computed } from "vue";

const donationStore = useDonationStore();

const DELAY = 10 * 1000;
const levels = [
    { sum: 100, name: "Flex SGN" },
    { sum: 150, name: "LoL 1v1" },
    { sum: 225, name: "Chubby Bunny" },
    { sum: 350, name: "Maquillage" },
    { sum: 500, name: "Karaoké" },
    { sum: 750, name: "Epilation" },
    { sum: 1000, name: "VR Horreur" },
    { sum: 1500, name: "Caster cellophane" },
    { sum: 2250, name: "Piments pour les casters" },
    { sum: 3500, name: "Dégustation de vinaigre" },
    { sum: 5000, name: "Dégustation d'insectes" },
    { sum: 7500, name: "Serpents" },
    { sum: 10000, name: "Coloration de cheveux" },
    { sum: 15000, name: "Tatouage" },
    { sum: 20000, name: "Rasage de cheveux" }
];

const currentLevel = computed(() => {
    let cursor = 0;

    while (levels[cursor].sum < (donationStore.total / 100) && cursor < levels.length - 1) {
        cursor++;
    }

    return levels[cursor];
});

const purcentage = computed(() => Math.min(donationStore.total / currentLevel.value.sum, 100) + "%");

async function updateLoop() {
    await donationStore.updateList();
    setTimeout(updateLoop, DELAY);
}

function displayPrice(amount: number) {
    return amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €"
}

updateLoop();
</script>

<style scoped lang="css">
.wrapper-progress {
    position: relative;
    background-image: linear-gradient(-45deg, var(--color-background-0), var(--color-background-2));
    border-radius: calc(var(--lenght-radius-base) * 2);
    overflow: hidden;
    margin: var(--length-margin-s);
    display: flex;
    justify-content: space-between;
    padding: var(--length-padding-xs) var(--length-padding-m);
    font-size: 4rem;
    font-weight: 800;

    .progress-bar {
        position: absolute;
        background-image: linear-gradient(-45deg, var(--color-primary), var(--color-primary-background));
        width: v-bind(purcentage);
        transition: width var(--duration-medium);

        top: 0;
        left: 0;
        bottom: 0;
    }

    .total {
        position: relative;
    }

    .goal {
        position: relative;

        .description {
            font-weight: 400;
            color: var(--color-content-lite);
        }
    }
}
</style>
