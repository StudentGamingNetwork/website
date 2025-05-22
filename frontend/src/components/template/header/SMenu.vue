<template>
    <div class="menu">
        <div class="list">
            <SButton
                class="button"
                @click="stateStore.modalOpen('settings')"
            >
                <FontAwesomeIcon :icon="['fas', 'cog']" />
                <span>{{ $t("components.template.header.settings") }}</span>
            </SButton>
            <SModalSettings />
            <SButton
                v-if="userStore.isMember"
                class="button"
                @click="$router.push('/admin')"
            >
                <FontAwesomeIcon :icon="['fas', 'tools']" />
                <span>{{ $t("components.template.header.admin") }}</span>
            </SButton>
            <SButton
                class="button"
                @click="userStore.disconnect"
            >
                <FontAwesomeIcon :icon="['fas', 'power-off']" />
                <span>{{ $t("components.template.header.logout") }}</span>
            </SButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SButton from "@/components/design/forms/SButton.vue";
import { User, State } from "@/modules";
import SModalSettings from "@/components/template/modals/SModalSettings.vue";


const stateStore = State.useStore();
const userStore = User.useStore();


</script>

<style scoped lang="scss">
.menu {
    position: absolute;
    z-index: 10;
    top: 48px;
    right: -48px;

    .list {
        margin-top: 32px;
        background: var(--color-background-0);
        border: 2px solid var(--color-background-1);
        width: 196px;
        box-sizing: border-box;
        padding: var(--length-padding-s);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--length-gap-s);
        border-radius: var(--lenght-radius-base);
    }

    .button {
        text-align: left;
        display: flex;
        align-items: center;
        gap: var(--length-gap-s);
    }
}
</style>
