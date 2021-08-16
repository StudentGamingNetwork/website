<template>
    <SModalContent class="account">
        <SModalSectionTitle>
            Changer de mot de passe
        </SModalSectionTitle>
        <SModalSection>
            <SInput
                v-model="password.old"
                autocomplete="false"
                title="Ancien mot de passe"
                type="password"
            />
            <SInput
                v-model="password.new"
                autocomplete="false"
                title="Nouveau mot de passe"
                type="password"
            />
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            Sauvegarder les changements
        </SButton>
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
import { computed, defineComponent, reactive, ref } from "vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import { User } from "@/modules";
import SInput from "@/components/design/forms/Input.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";

export default defineComponent({
    name: "SAccount",
    components: { SButton, SInput, SModalContent, SModalSection, SModalSectionDescription, SModalSectionTitle, SModalSeparator },
    setup() {
        const userStore = User.useStore();
        const password = reactive({
            new: ref(""),
            old: ref("")
        });

        const hasUpdate = computed(() => {
            return (password.old && password.new);
        });

        const sendUpdate = async () => {
            if (!hasUpdate.value) {
                return;
            }

            await userStore.update({
                password: {
                    new: password.new,
                    old: password.old
                }
            });
        };

        return {
            hasUpdate,
            password,
            sendUpdate
        };
    }
});
</script>

<style scoped lang="scss">
</style>
