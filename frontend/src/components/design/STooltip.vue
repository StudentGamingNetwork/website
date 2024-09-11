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
    noWrap: boolean;
    placement: Placement;
    tooltipText: string;
}>();


const reference = ref();
const floating = ref();
const isHovering = ref(false);

const { floatingStyles } = useFloating(reference, floating, {
    middleware: [
        offset(10),
        shift()
    ],
    placement: props.placement,
    strategy: "absolute"
    
});


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
