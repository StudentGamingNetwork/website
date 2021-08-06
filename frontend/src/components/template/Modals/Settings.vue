<template>
    <SModal
        :active="stateStore.modal === 'settings'"
        class="modal"
        @close="stateStore.modalClose()"
    >
        <div class="profil">
            <SModalMenu
                v-model="currentTab"
                class="menu"
                :options="menuOptions"
            />
            <component
                :is="currentTab.component"
                class="content"
            />
        </div>
    </SModal>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import SModal from "@/components/design/Modal/Modal.vue";
import SModalMenu, { TMenuOption } from "@/components/design/ModalMenu.vue";
import { State } from "@/modules";
import SPublicProfil from "@/components/template/Modals/Settings/PublicProfil.vue";
import SGameProfil from "@/components/template/Modals/Settings/GameProfil.vue";
import SAccount from "@/components/template/Modals/Settings/Account.vue";
import SAssociation from "@/components/template/Modals/Settings/Association.vue";

export default defineComponent({
    name: "SModalSettings",
    components: { SAccount, SGameProfil, SModal, SModalMenu },
    setup() {
        const menuOptions: Array<TMenuOption> = [
            { id: "public", name: "Profil public", component: SPublicProfil, icon: "user" },
            { id: "game", name: "Profil de jeu", component: SGameProfil, icon: "headset" },
            { id: "association", name: "Association", component: SAssociation, icon: "users" },
            { id: "account", name: "Compte SGN", component: SAccount, icon: "cog" }
        ];

        const currentTab = shallowRef(menuOptions[0]);

        const menuContents = {
            account: SPublicProfil,
            game: SPublicProfil,
            public: SPublicProfil
        };

        const stateStore = State.useStore();

        return {
            currentTab,
            menuContents,
            menuOptions,
            stateStore
        };
    }
});
</script>

<style scoped lang="scss">
.profil {
    width: 720px;
    min-height: 380px;
    height: 75vh;
    display: flex;

    .menu {
        width: 196px;
        height: 100%;
        flex-shrink: 0;
        flex-grow: 0;
    }

    .content {
        flex-grow: 1;
    }
}
</style>
