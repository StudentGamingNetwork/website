<template>
    <div class="card">
        <SCardBackground>{{ author }}</SCardBackground>
        <div class="left">{{ amount }}€</div>
        <div class="right">
            <div class="title-wrapper">
                <SCardTitle class="title">{{ author }}</SCardTitle>
            </div>
            <div class="message">“{{ message }}”</div>
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

const props = defineProps<{
    author: string;
    message: string;
    amount: number;
}>();
</script>

<style scoped lang="scss">
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
