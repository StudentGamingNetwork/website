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
            <SButton primary>
                Inscription
            </SButton>
            <SButton outlined>
                Connexion
            </SButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SLogo from "@/components/template/Logo.vue";
import SNavbar from "@/components/template/Navbar.vue";
import SButton from "@/components/design/Button.vue";


export default defineComponent({
    name: "SHeader",
    components: { SButton, SLogo, SNavbar }
});
</script>

<style scoped lang="scss">

header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background-1);

    .logo {
        width: 256px;
        margin-left: var(--length-margin-l);
        display: flex;
    }

    .profil {
        display: flex;
        gap: var(--length-gap-l);
        width: 256px;
        margin-right: var(--length-margin-l);
    }
}


</style>
