<template>
    <header class="page-head">
        <SPageTitle class="title">
            {{ title }}
        </SPageTitle>
        <SPageDescription>
            <slot />
        </SPageDescription>
    </header>
</template>

<script lang="ts" setup>
import SPageTitle from "@/components/template/SPageTitle.vue";
import SPageDescription from "@/components/template/SPageDescription.vue";

const props = defineProps<{title:string; background:string}>();


const backgroundImage = `url(${ props.background })`;

</script>

<style scoped lang="scss">
.page-head {
    @media (max-width: 1099px) {
        padding: 48px;
    }

    background-image: v-bind(backgroundImage);
    background-size: cover;
    background-position: 50% 50%;
    height: 320px;
    padding: 48px 128px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-l);
}
</style>
