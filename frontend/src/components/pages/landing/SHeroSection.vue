<template>
    <section class="hero-section">
        <SPageTitle>
            {{ $t("components.pages.landing.hero.title") }}
        </SPageTitle>
        <SPageDescription>
            {{ $t("components.pages.landing.hero.description.part1") }} <strong>Student Gaming Network</strong> {{ $t("components.pages.landing.hero.description.part2") }}
        </SPageDescription>
        <div class="cta">
            <SButton
                primary
                @click="stateStore.modalOpen('signup')"
            >
                {{ $t("components.pages.landing.hero.join") }}
            </SButton>
            <SButton
                outlined
                @click="contact"
            >
                {{ $t("components.pages.landing.hero.contact") }}
            </SButton>
        </div>
    </section>
</template>

<script lang="ts" setup>
import heroBackground from "@/assets/images/backgrounds/hero.png";
import SButton from "@/components/design/forms/SButton.vue";
import SPageTitle from "@/components/template/SPageTitle.vue";
import SPageDescription from "@/components/template/SPageDescription.vue";
import { State } from "@/modules";

const stateStore = State.useStore();

const backgroundImage = `url(${ heroBackground })`;

function contact() {
    window.open("mailto:contact@sgnw.fr");
}

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
