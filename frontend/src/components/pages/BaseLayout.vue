<template>
    <div class="base-layout">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SBaseLayout"
});
</script>

<style scoped lang="scss">
.base-layout {
    padding: 96px 128px;

    @media (max-width: 1099px) {
        padding: 48px;
    }
}
</style>
