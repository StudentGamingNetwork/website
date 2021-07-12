<template>
    <div class="page-title">
        <div class="text">
            <slot />
        </div>
        <div class="text">
            <slot />
        </div>
        <h1 class="text">
            <slot />
        </h1>
        <div class="spacer">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SPageTitle"
});
</script>

<style scoped lang="scss">
.page-title {
    position: relative;
    font-size: 4rem;
    text-transform: uppercase;
    font-weight: 800;

    @media (max-width: 1099px) {
        font-size: 3rem;
    }

    .spacer {
        opacity: 0;
        pointer-events: none;
        user-select: none;
        display: inline-block;
    }

    .text {
        color: var(--color-background-0);
        padding: 0 var(--length-padding-xxs);

        background: var(--gradient);
        display: inline-block;
        -webkit-background-clip: text;
        -webkit-text-stroke: 3px transparent;
        font-size: inherit;
        margin: 0;

        &:nth-child(1) {
            position: absolute;
            left: -16px;
            top: -16px;
            opacity: 0.3;
            user-select: none;
        }

        &:nth-child(2) {
            position: absolute;
            left: -8px;
            top: -8px;
            opacity: 0.6;
            user-select: none;
        }

        &:nth-child(3) {
            position: absolute;
            text-shadow: 0 0 32px var(--color-primary-liter);
        }
    }
}
</style>
