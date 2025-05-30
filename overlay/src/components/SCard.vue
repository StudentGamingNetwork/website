<template>
    <div class="card">
        <SCardBackground>{{ author }}</SCardBackground>
        <div class="left">{{ formattedAmount }}€</div>
        <div class="right">
            <div class="title-wrapper">
                <SCardTitle class="title">{{ author }}</SCardTitle>
            </div>
            <div class="message" v-if="message">“{{ message }}”</div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SCard"
};
</script>

<script setup lang="ts">
import SCardTitle from "./SCardTitle.vue";
import SCardBackground from "./SCardBackground.vue";
import { computed } from "vue";

const props = defineProps<{
    author: string;
    message: string;
    amount: number;
}>();

const formattedAmount = computed(() => {
    if (props.amount%100 === 0) {
        return Math.round(props.amount/100)
    }
    return (props.amount/100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
})
</script>

<style scoped lang="css">
.card {
    position: relative;
    background-image: linear-gradient(-45deg, var(--color-background-0), var(--color-background-2));
    border-radius: var(--lenght-radius-base);
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: var(--length-padding-s) var(--length-padding-l);
    gap: var(--length-gap-l);
    box-shadow: 0 16px 64px black;

    .left {
        position: relative;
        font-size: 6rem;
        font-weight: 800;
    }

    .right {
        flex-grow: 1;
        min-width: 400px;
        min-height: 145px;
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-s);
    }

    .title-wrapper {
        display: flex;
        justify-content: center;
        height: 80px;

        .title {
            padding-right: var(--length-padding-l);
        }
    }

    .message {
        max-width: 600px;
        color: var(--color-content-lite);
        text-align: center;
        font-size: 1.5rem;
        font-style: italic;
    }
}
</style>
