<template>
    <div class="header-profil">
        <div class="profil">
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'user']"
            />
            {{ userStore.username }}
        </div>
        <SMenu class="menu" />
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { User } from "@/modules";
import SMenu from "@/components/template/header/SMenu.vue";

const userStore = User.useStore();


</script>

<style scoped lang="css">
.header-profil {
    display: flex;
    align-items: center;
    gap: var(--length-gap-s);
    justify-content: flex-end;
    position: relative;
    height: 48px;

    .profil {
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }

    .icon {
        width: 16px;
        height: 16px;
    }

    .menu {
        display: none;
    }

    &:hover {
        .menu {
            display: block;
        }
    }
}
</style>
