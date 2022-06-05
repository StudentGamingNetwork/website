<template>
    <div class="card-title">
        <div class="main">
            <slot></slot>
        </div>
        <div class="shadow">
            <slot></slot>
        </div>
        <div class="shadow">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SCardTitle"
};
</script>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.card-title {
    font-size: 3rem;
    font-weight: 800;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
    color: var(--color-primary);
    text-shadow: 0 0 32px var(--color-primary-background);

    @keyframes text-bump {
        from {
            transform: translateY(-4px);
        }
        to {
            transform: translateY(4px);
        }
    }

    .main {
        animation: text-bump 2s infinite alternate ease-in-out;
        animation-delay: -1s;
        white-space: nowrap;
    }

    .shadow {
        animation: text-bump 2s infinite alternate ease-in-out;
        position: absolute;
        z-index: -1;
        width: 100%;
        color: transparent;
        -webkit-text-stroke: 2px var(--color-primary);
        user-select: none;

        &:nth-child(2) {
            top: 12px;
            left: 12px;
            opacity: 0.5;
            animation-delay: -0.5s;
        }

        &:nth-child(3) {
            top: 24px;
            left: 24px;
            opacity: 0.25;
            animation-delay: 0s;
        }
    }
}
</style>
