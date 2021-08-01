<template>
    <SModal
        :active="true"
        class="modal"
    >
        <div class="profil">
            <SModalMenu
                class="menu"
                :options="menuOptions"
            />
        </div>
    </SModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SModal from "@/components/design/Modal.vue";
import SModalMenu, { TMenuOption } from "@/components/design/ModalMenu.vue";

export default defineComponent({
    name: "SModalSettings",
    components: { SModal, SModalMenu },
    setup() {
        const menuOptions: Array<TMenuOption> = [
            { id: "public", name: "Profil public", icon: "user" },
            { id: "game", name: "Profil de jeux", icon: "headset" },
            { id: "account", name: "Compte SGN", icon: "cog" }
        ];

        return {
            menuOptions
        };
    }
});
</script>

<style scoped lang="scss">
.profil {
    width: 720px;
    height: 380px;
    display: flex;

    .menu {
        width: 196px;
        height: 100%;
    }
}
</style>
