<template>
    <SModalContent class="game-profil">
        <SModalSectionTitle>
            Discord
        </SModalSectionTitle>
        <SModalSection>
            <SInput
                v-model="platforms.discord"
                :modified="platforms.discord !== userStore.platforms.discord"
                title="Identifiant Discord"
                :validators="[InputValidators.Discord()]"
            />
            <div class="description">
                Nous avons besoin de votre identifiant Discord pour vous contacter lors de vos matchs.
            </div>
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            Sauvegarder le profil
        </SButton>
    </SModalContent>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { cloneDeep, isMatch } from "lodash";
import SButton from "@/components/design/forms/Button.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import * as InputValidators from "@/utils/validators";
import { User } from "@/modules";

export default defineComponent({
    name: "SGameProfil",
    components: { SButton, SInput, SModalContent, SModalSection, SModalSectionTitle, SModalSeparator },
    setup() {
        const userStore = User.useStore();

        const platforms = reactive(cloneDeep(userStore.platforms));

        const hasUpdate = computed(() => {
            return !isMatch(userStore.platforms, platforms);
        });

        const sendUpdate = async () => {
            if (!hasUpdate.value) {
                return;
            }

            await userStore.updatePlatforms(platforms);
        };

        return {
            hasUpdate,
            InputValidators,
            platforms,
            sendUpdate,
            userStore
        };
    }
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
