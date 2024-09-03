<template>
    <div class="tooltip">
        <slot />
        <span
            v-if="tooltipText"
            class="tooltiptext"
            :class="{top, bottom, left, right, nowrap}"
        >
            {{ tooltipText }}
        </span>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    bottom: {
        default: false,
        type: Boolean
    },
    left: {
        default: false,
        type: Boolean
    },
    nowrap: {
        default: false,
        type: Boolean
    },
    right: {
        default: false,
        type: Boolean
    },
    tooltipText: { 
        default: "",
        type: String
    },
    top: {
        default: false,
        type: Boolean
    }
});

</script>


<style scoped>
.tooltip {
    position: relative;
    display: inline-block;

    .tooltiptext {
        position: absolute;
        display: none;

        background-color: var(--color-background-2);
        padding: var(--length-padding-xs) var(--length-padding-s);
        border: 2px solid var(--color-content-softest);
        border-radius: var(--lenght-radius-base);

        z-index: 1;

         &.top  {
            bottom: 110%;
            left: 50%;
            transform: translateX(-50%);
        }

        &.bottom {
            top: 110%;
            left: 50%;
            transform: translateX(-50%);
        }

        &.left {
            top: -75%;
            right: 110%;
            width: 200px;
        }

        &.right {
            top: -75%;
            left: 110%;
            width: 200px;
        }

        &.nowrap {
            white-space: nowrap;
        }
    }

    &:hover .tooltiptext {
        display: inline-block;
    }
}

</style>
