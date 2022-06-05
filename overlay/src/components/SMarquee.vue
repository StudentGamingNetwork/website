<template>
    <div class="marquee" :class="{reverse}">
        <slot></slot>
        <slot></slot>
        <slot></slot>
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: "SMarquee"
};
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    speed: number;
    reverse?: boolean;
}>()

const speedVar = computed(()=> 1/props.speed + "s")
</script>

<style scoped lang="scss">
@keyframes marquee {
    0% {
        transform: translate3d(25%, 0, 0);
    }
    100% {
        transform: translate3d(-25%, 0, 0);
    }
}

.marquee {
    white-space: nowrap;
    display: inline-block;
    animation: marquee v-bind(speedVar) linear infinite;

    &.reverse {
        animation: marquee v-bind(speedVar) linear infinite reverse;
    }
}
</style>
