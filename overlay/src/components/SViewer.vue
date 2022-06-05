<template>
    <div class="viewer">
        <Transition>
            <SCard v-if="isShowing" :author="currentDonation.author" :message="currentDonation.message" :amount="currentDonation.amount" />
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: "SViewer"
};
</script>

<script setup lang="ts">
import SCard from "./SCard.vue";
import { ref, watch } from "vue";
import { TDonation, useDonationStore } from "../store";
import { sleep } from "../lib/utils";

const DELAY = 10 * 1000;

const isShowing = ref(false);
const donationStore = useDonationStore()
const currentDonation = ref<TDonation>({} as any);

watch(() => !isShowing.value && donationStore.hasDonations, async (result) => {
    if (result) {
        await sleep(500);
        currentDonation.value = donationStore.getNextDonation() as TDonation
        isShowing.value = true;
        await sleep(8000);
        isShowing.value = false;
    }
}, {
    immediate: true
})

async function updateLoop() {
    await donationStore.updateList();
    setTimeout(updateLoop, DELAY);
}

updateLoop();
</script>

<style scoped lang="scss">
.viewer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s ease-in, transform 0.25s ease-in;
    transform: scale(100%);
}

.v-enter-from {
    opacity: 0;
    transform: scale(0%);
}

.v-leave-to {
    opacity: 0;
}

</style>
