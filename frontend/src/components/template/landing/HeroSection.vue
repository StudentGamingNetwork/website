<template>
    <section
        class="hero-section"
        :style="headerStyle"
    >
        <div class="text-wrapper">
            <div class="hero-text">
                Votre match est prêt !
            </div>
            <div class="hero-text">
                Votre match est prêt !
            </div>
            <div class="hero-text">
                Votre match est prêt !
            </div>
        </div>
        <div class="description">
            Le <strong>Student Gaming Network</strong> (SGN) est la fédération des associations étudiantes françaises d'esport.
            Nous organisons de nombreux tournois à l'échelle nationale et promouvons activement l'esport étudiant.
        </div>
        <div class="cta">
            <SButton primary>
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
import SButton from "@/components/design/Button.vue";

export default defineComponent({
    name: "SHeroSection",
    components: { SButton },
    setup() {
        return {
            headerStyle: {
                backgroundImage: `url(${ heroBackground })`
            }
        };
    }
});
</script>

<style scoped lang="scss">
.hero-section {
    padding: 128px;
    background-size: cover;
    background-position: 50% 50%;
    height: 640px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);

    .text-wrapper {
        position: relative;
        height: 4rem;

        .hero-text {
            font-weight: 800;
            text-transform: uppercase;
            font-size: 4rem;
            color: var(--color-background-0);
            padding: 0 var(--length-padding-xxs);

            background: var(--gradient);
            display: inline-block;
            -webkit-background-clip: text;
            -webkit-text-stroke: 3px transparent;

            &:nth-child(1) {
                position: absolute;
                left: -16px;
                top: -16px;
                opacity: 0.3;
                user-select: none;
            }

            &:nth-child(2) {
                position: absolute;
                left: -8px;
                top: -8px;
                opacity: 0.6;
                user-select: none;
            }

            &:nth-child(3) {
                position: absolute;
                text-shadow: 0 0 32px var(--color-primary-liter);
            }
        }
    }

    .description {
        font-size: 1.2rem;
        opacity: 0.75;
        max-width: 800px;
        text-shadow: 0 4px 4px var(--color-background-0);

        strong {
            font-weight: 600;
        }
    }

    .cta {
        display: flex;
        gap: var(--length-gap-l);
    }
}
</style>
