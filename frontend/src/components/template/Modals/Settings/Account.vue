<template>
    <SModalContent class="account">
        <SModalSectionTitle>
            Danger zone
        </SModalSectionTitle>
        <SModalSection>
            <SButton
                danger
                outlined
            >
                Supprimer mon compte
            </SButton>
            <div class="description">
                Attention, toute suppression est définitive ! Vous devrez recréer un compte pour participer aux futurs
                événements du SGN.
            </div>
        </SModalSection>
    </SModalContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/Forms/Button.vue";
import SModalContent from "@/components/design/Modal/Content.vue";
import SModalSectionTitle from "@/components/design/Modal/SectionTitle.vue";
import SModalSection from "@/components/design/Modal/Section.vue";

export default defineComponent({
    name: "SAccount",
    components: { SButton, SModalContent, SModalSection, SModalSectionTitle }
});
</script>

<style scoped lang="scss">
.account {
    .description {
        font-size: 0.8rem;
        color: var(--color-content-softer);
    }
}
</style>
