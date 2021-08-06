<template>
    <div class="menu">
        <div class="list">
            <SButton
                class="button"
                @click="stateStore.modalOpen('settings')"
            >
                <FontAwesomeIcon :icon="['fas', 'cog']" />
                <span>Paramètres</span>
            </SButton>
            <SModalSettings />
            <SButton
                v-if="userStore.isMember"
                class="button"
                @click="$router.push('admin')"
            >
                <FontAwesomeIcon :icon="['fas', 'tools']" />
                <span>Administration</span>
            </SButton>
            <SButton
                class="button"
                @click="userStore.disconnect"
            >
                <FontAwesomeIcon :icon="['fas', 'power-off']" />
                <span>Déconnexion</span>
            </SButton>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SButton from "@/components/design/Forms/Button.vue";
import { User, State } from "@/modules";
import SModalSettings from "@/components/template/Modals/Settings.vue";

export default defineComponent({
    name: "SMenu",
    components: { FontAwesomeIcon, SButton, SModalSettings },
    setup() {
        const stateStore = State.useStore();
        const userStore = User.useStore();

        return {
            stateStore,
            userStore
        };
    }
});
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
