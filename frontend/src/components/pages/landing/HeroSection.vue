<template>
    <section class="hero-section">
        <SPageTitle>
            Votre match est prêt !
        </SPageTitle>
        <SPageDescription>
            Le <strong>Student Gaming Network</strong> (SGN) est la fédération des associations étudiantes françaises d'esport.
            Nous organisons de nombreux tournois à l'échelle nationale et promouvons activement l'esport étudiant.
        </SPageDescription>
        <div class="cta">
            <SButton
                primary
                @click="stateStore.modalOpen('signup')"
            >
                Rejoignez-nous
            </SButton>
            <SButton outlined>
                Contactez-nous
            </SButton>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import heroBackground from "@/assets/images/backgrounds/hero.png";
import SButton from "@/components/design/forms/Button.vue";
import SPageTitle from "@/components/template/PageTitle.vue";
import SPageDescription from "@/components/template/PageDescription.vue";
import { State } from "@/modules";

export default defineComponent({
    name: "SHeroSection",
    components: { SButton, SPageDescription, SPageTitle },
    setup() {
        const stateStore = State.useStore();

        return {
            backgroundImage: `url(${ heroBackground })`,
            stateStore
        };
    }
});
</script>

<style scoped lang="scss">
.hero-section {
    padding: 128px;

    @media (max-width: 1099px) {
        padding: 48px;
    }

    background-image: v-bind(backgroundImage);
    background-size: cover;
    background-position: 50% 50%;
    min-height: 640px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);

    .cta {
        display: flex;
        gap: var(--length-gap-l);
    }
}
</style>
