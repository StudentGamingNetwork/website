<template>
    <div
        class="hero-page"
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import heroBackground from "@/assets/images/hero-background.png";
import SButton from "@/components/design/Button.vue";

export default defineComponent({
    name: "SHeroPage",
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
.hero-page {
    padding: 128px;
    background-size: cover;
    background-position: 50% 50%;
    height: calc(100vw / 3);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-l);

    .text-wrapper {
        position: relative;

        .hero-text {

            font-weight: 800;
            text-transform: uppercase;
            font-size: 4rem;
            color: var(--color-background-0);

            background: linear-gradient(20deg, #ea7c11 0%, #f5cc3f 50%, #ffffff 100%);
            display: inline-block;
            -webkit-background-clip: text;
            -webkit-text-stroke: 3px transparent;

            &:nth-child(1) {
                position: absolute;
                left: -8px;
                top: -8px;
                opacity: 0.3;
            }

            &:nth-child(2) {
                opacity: 0.6;
            }

            &:nth-child(3) {
                position: absolute;
                left: 8px;
                top: 8px;
            }
        }
    }

    .description {
        font-size: 1.2rem;
        opacity: 0.75;
        width: 800px;
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
