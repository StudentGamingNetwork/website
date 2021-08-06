<template>
    <hr>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SModalSeparator"
});
</script>

<style scoped lang="scss">
hr {
    margin: var(--length-margin-m) 0 0;
    width: 100%;
    border: none;
    border-top: 1px solid var(--color-content-litest);
}
</style>
