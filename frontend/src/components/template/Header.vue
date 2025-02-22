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
                title=""
                v-model="locale"
                :modified="false"
                :options="langs"
                class="select"/>
            </div>
    </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import SLogo from "@/components/template/Logo.vue";
import SNavbar from "@/components/template/Navbar.vue";
import { User } from "@/modules";
import SHeaderButtons from "@/components/template/header/Buttons.vue";
import SHeaderProfil from "@/components/template/header/Profil.vue";
import SSelect from "@/components/design/forms/SSelect.vue";
import { useCookies } from '@vueuse/integrations/useCookies'
import { langs } from "@/main";
import { useRouter } from "vue-router";


export default defineComponent({
    name: "SHeader",
    components: { SHeaderButtons, SHeaderProfil, SLogo, SNavbar, SSelect },
    setup() {
        const userStore = User.useStore();
        const router = useRouter();

        const cookies = useCookies(['locale'])
        const locale = ref<string>()

        const isConnected = computed(() => {
            return !! userStore._id;
        });

        onMounted(async() => {
           locale.value = cookies.get('locale')
        });

        watch(locale, (newLocale) => {
            if(newLocale !== cookies.get('locale')) {
                cookies.set('locale', newLocale, { path: '/', sameSite: 'strict' });
                router.go(0)
            }
        });

        return {
            isConnected,
            userStore,
            langs,
            locale
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
