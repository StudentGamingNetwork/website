<template>
    <div class="loading">
        <FontAwesomeIcon
            class="spinner"
            :icon="['fas', 'spinner']"
            spin
        />
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped lang="css">
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--length-margin-xl);

    .spinner {
        width: 48px;
        height: 48px;
        color: var(--color-content-litest);
    }
}
</style>
