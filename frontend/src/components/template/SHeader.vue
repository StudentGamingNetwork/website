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
        <div class="personalization">
            <div class="profil">
                <SHeaderProfil v-if="isConnected" />
                <SHeaderButtons v-else />
            </div>
            
            <SSelect
                v-model="locale"
                class="select"
                :options="langs"
                @enter="router.go(0)"
            />
        </div>
    </header>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import SLogo from "@/components/template/SLogo.vue";
import SNavbar from "@/components/template/SNavbar.vue";
import { User } from "@/modules";
import SHeaderButtons from "@/components/template/header/SHeaderButtons.vue";
import SHeaderProfil from "@/components/template/header/SHeaderProfil.vue";
import SSelect from "@/components/design/forms/SSelect.vue";
import { langs } from "@/locales";

const userStore = User.useStore();
const router = useRouter();
const locale = useStorage("locale", "fr", localStorage); 


const isConnected = computed(() => {
    return !! userStore._id;
});
     

</script>

<style scoped lang="css">

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
    .personalization {
        display: flex;
        align-items: center;
        gap: var(--length-gap-l);

         .profil {
            width: 256px;
        }
    }
}
</style>
