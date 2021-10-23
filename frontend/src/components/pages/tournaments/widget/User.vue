<template>
    <div class="user">
        <div class="username">
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'user']"
            />
            {{ userStore.username }}
        </div>
        <div
            class="button"
            @click="userStore.disconnect"
        >
            <FontAwesomeIcon :icon="['fas', 'power-off']" />
            <span>Déconnexion</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SUser"
};
</script>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { User } from "@/modules";

const userStore = User.useStore();
</script>

<style scoped lang="scss">
.user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--color-content-liter);
    padding: 0 var(--length-padding-m);

    .username {
    }

    .button {
        text-align: left;
        display: flex;
        align-items: center;
        gap: var(--length-gap-s);
        cursor: pointer;

        &:hover {
            color: var(--color-content);
        }
    }
}
</style>
