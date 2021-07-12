<template>
    <header>
        <div class="logo">
            <router-link
                v-slot="{ href }"
                to="/"
            >
                <a :href="href">
                    <SLogo />
                </a>
            </router-link>
        </div>
        <SNavbar class="navbar" />
        <div class="profil">
            <SButton
                primary
                @click="stateStore.modalSignUpOpen"
            >
                Inscription
            </SButton>
            <SModalSignUp />
            <SButton
                outlined
                @click="stateStore.modalLogInOpen"
            >
                Connexion
            </SButton>
            <SModalLogIn />
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SLogo from "@/components/template/Logo.vue";
import SNavbar from "@/components/template/Navbar.vue";
import SButton from "@/components/design/Button.vue";
import SModalSignUp from "@/components/template/ModalSignUp.vue";
import SModalLogIn from "@/components/template/ModalLogIn.vue";
import { State } from "@/modules";

export default defineComponent({
    name: "SHeader",
    components: { SButton, SLogo, SModalLogIn, SModalSignUp, SNavbar },
    setup() {
        const stateStore = State.useStore();

        return {
            stateStore
        };
    }
});
</script>

<style scoped lang="scss">

header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background-1);
    padding: 0 var(--length-margin-l);


    @media (max-width: 1099px) {
        padding: 0 var(--length-margin-s);
    }

    .logo {
        @media (min-width: 1400px) {
            width: 256px;
        }

        display: flex;
    }

    .profil {
        display: flex;
        gap: var(--length-gap-l);
        width: 256px;
        justify-content: flex-end;
    }
}


</style>
