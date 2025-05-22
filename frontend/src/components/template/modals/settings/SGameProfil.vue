<template>
    <SModalContent class="game-profil">
        <SModalSectionTitle>
            Discord
        </SModalSectionTitle>
        <SModalSection>
            <SInput
                v-model="platforms.discord"
                :modified="platforms.discord !== userStore.platforms.discord"
                :title="$t('components.template.modals.settings.game.discordID')"
                :validators="[InputValidators.Discord()]"
                @enter="sendUpdate"
            />
            <SModalSectionDescription>
                {{ $t('components.template.modals.settings.game.discordDescription') }}
            </SModalSectionDescription>
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            {{ $t("components.template.modals.settings.game.save") }}
        </SButton>
    </SModalContent>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import { cloneDeep, isMatch } from "lodash";
import SButton from "@/components/design/forms/SButton.vue";
import SInput from "@/components/design/forms/SInput.vue";
import SModalContent from "@/components/design/modal/SModalContent.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import * as InputValidators from "@/utils/validators";
import { User } from "@/modules";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";


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

watch (
    () => platforms.discord,
    () => {
        platforms.discord = platforms.discord.replace(" #", "#");
    }
);

</script>

<style scoped lang="scss">
</style>
