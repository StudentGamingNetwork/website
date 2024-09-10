<template>
    <div
        ref="reference"
        @mouseout="isHovering = false" 
        @mouseover="isHovering = true"
    >
        <slot />
    </div>
    <Transition>
        <div
            v-if="isHovering && tooltipText"
            ref="floating"
            class="tooltip"
            :style="floatingStyles"
        >
            <span
                v-if="tooltipText"
                :class="{noWrap: noWrap}"
            >
                {{ tooltipText }}
            </span>
        </div>
    </Transition>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { useFloating, shift, offset, Placement } from "@floating-ui/vue";

const props = defineProps<{
    bottom?: boolean;
    bottomEnd?: boolean;
    bottomStart?: boolean;
    left?: boolean;
    leftEnd?: boolean;
    leftStart?: boolean;
    noWrap?: boolean;
    right?: boolean;
    rightEnd?: boolean;
    rightStart?: boolean;
    tooltipText: string;
    top?: boolean;
    topEnd?: boolean;
    topStart?: boolean
}>();


const reference = ref();
const floating = ref();
const isHovering = ref(false);

const { floatingStyles } = useFloating(reference, floating, {
    middleware: [
        offset(10),
        shift()
    ],
    placement: placementSelectionner(),
    strategy: "absolute"
    
});

function placementSelectionner() : Placement {
    if (props.top) return "top";
    if (props.topStart) return "top-start";
    if (props.topEnd) return "top-end";
    if (props.bottomStart) return "bottom-start";
    if (props.bottomEnd) return "bottom-end";
    if (props.left) return "left";
    if (props.leftStart) return "left-start";
    if (props.leftEnd) return "left-end";
    if (props.right) return "right";
    if (props.rightStart) return "right-start";
    if (props.rightEnd) return "right-end";
    return "bottom";
}

</script>


<style scoped>

.tooltip {
    background: var(--color-background-0);
    padding: var(--length-padding-s);
    border: 2px solid var(--color-content-softer);
    border-radius: var(--lenght-radius-base);
}

.noWrap {
    text-wrap: nowrap;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
