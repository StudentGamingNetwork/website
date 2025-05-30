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

<script lang="ts" setup>
import { shallowRef } from "vue";
import SModal from "@/components/design/modal/SModal.vue";
import SModalMenu, { TMenuOption } from "@/components/design/SModalMenu.vue";
import { State } from "@/modules";
import SPublicProfil from "@/components/template/modals/settings/SPublicProfil.vue";
import SGameProfil from "@/components/template/modals/settings/SGameProfil.vue";
import SAccount from "@/components/template/modals/settings/SAccount.vue";
import SAssociation from "@/components/template/modals/settings/SAssociation.vue";
import i18n from "@/locales";


const menuOptions: Array<TMenuOption> = [
    { id: "public", name: i18n.global.t("components.template.modals.settings.menu.public"), component: SPublicProfil, icon: "user" },
    { id: "game", name: i18n.global.t("components.template.modals.settings.menu.game"), component: SGameProfil, icon: "headset" },
    { id: "association", name: i18n.global.t("components.template.modals.settings.menu.asso"), component: SAssociation, icon: "users" },
    { id: "account", name: i18n.global.t("components.template.modals.settings.menu.account"), component: SAccount, icon: "cog" }
];

const currentTab = shallowRef(menuOptions[0]);

const menuContents = {
    account: SPublicProfil,
    game: SPublicProfil,
    public: SPublicProfil
};

const stateStore = State.useStore();

</script>

<style scoped lang="css">
.profil {
    width: 720px;
    max-width: 100vw;
    min-height: 380px;
    height: 75vh;
    display: flex;

    
    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-content-softest);
    }

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
