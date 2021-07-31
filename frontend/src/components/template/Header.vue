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
            <SHeaderProfil v-if="isConnected" />
            <SHeaderButtons v-else />
        </div>
    </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import SLogo from "@/components/template/Logo.vue";
import SNavbar from "@/components/template/Navbar.vue";
import { User } from "@/modules";
import SHeaderButtons from "@/components/template/Header/Buttons.vue";
import SHeaderProfil from "@/components/template/Header/Profil.vue";

export default defineComponent({
    name: "SHeader",
    components: { SHeaderButtons, SHeaderProfil, SLogo, SNavbar },
    setup() {
        const userStore = User.useStore();

        const isConnected = computed(() => {
            return !! userStore.username;
        });

        return {
            isConnected,
            userStore
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
        width: 256px;
    }
}
</style>
