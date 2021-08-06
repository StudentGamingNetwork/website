<template>
    <SModalContent class="game-profil">
        <SModalSectionTitle>
            Discord
        </SModalSectionTitle>
        <SModalSection>
            <SInput title="Identifiant Discord" />
            <div class="description">
                Nous avons besoin de votre identifiant Discord pour vous contacter lors de vos matchs.
            </div>
        </SModalSection>
        <SModalSeparator />
        <SButton
            disabled
            primary
        >
            Sauvegarder le profil
        </SButton>
    </SModalContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/forms/Button.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";

export default defineComponent({
    name: "SGameProfil",
    components: { SButton, SInput, SModalContent, SModalSection, SModalSectionTitle, SModalSeparator }
});
</script>

<style scoped lang="scss">
.game-profil {
    .description {
        font-size: 0.8rem;
        color: var(--color-content-softer);
    }
}
</style>
