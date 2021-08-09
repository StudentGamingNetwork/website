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
            <SModalSectionDescription>
                Attention, toute suppression est définitive ! Vous devrez recréer un compte pour participer aux futurs
                événements du SGN.
            </SModalSectionDescription>
        </SModalSection>
    </SModalContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";

export default defineComponent({
    name: "SAccount",
    components: { SButton, SModalContent, SModalSection, SModalSectionDescription, SModalSectionTitle }
});
</script>

<style scoped lang="scss">
</style>
