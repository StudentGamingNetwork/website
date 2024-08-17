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
    <SConfirmTransferOwnership />
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import SModal from "@/components/design/modal/Modal.vue";
import SModalMenu, { TMenuOption } from "@/components/design/ModalMenu.vue";
import { State } from "@/modules";
import SPublicProfil from "@/components/template/modals/settings/PublicProfil.vue";
import SGameProfil from "@/components/template/modals/settings/GameProfil.vue";
import SAccount from "@/components/template/modals/settings/Account.vue";
import SAssociation from "@/components/template/modals/settings/Association.vue";
import SConfirmTransferOwnership from "@/components/template/modals/settings/modal/SConfirmTransferOwnership.vue";

export default defineComponent({
    name: "SModalSettings",
    components: { SAccount, SConfirmTransferOwnership, SGameProfil, SModal, SModalMenu },
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
    max-width: 100vw;
    min-height: 380px;
    height: 75vh;
    display: flex;

    .menu {
        width: 196px;
        height: 100%;
        flex-shrink: 0;
        flex-grow: 0;

        @media (max-width: 550px) {
            width: 50px;
        }
    }

    .content {
        flex-grow: 1;
    }
}
</style>
