<template>
    <SModalContent class="integrations">
        <SModalSectionTitle>
            Google
        </SModalSectionTitle>
        <SModalSection>
            <template v-if="userStore.platforms.google">
                <SInput
                    v-model="userStore.platforms.google"
                    autocomplete="false"
                    disabled
                
                    :title="$t('components.template.modals.settings.integrations.google.title')"
                />
                <SButton
                    primary
                    @click="() => unlinkGoogleAccount()"
                >
                    {{ $t("components.template.modals.settings.integrations.google.unlink") }}
                </SButton>
            </template>
            
            <SButton
                v-else
                :disabled="!isReady"
                primary
                :spinning="waitingForResponse"
                @click="() => linkGoogleAccount()"
            >
                {{ $t("components.template.modals.settings.integrations.google.link") }}
            </SButton>
        </SModalSection>
        <SModalSeparator />
    </SModalContent>
</template>

<script lang="ts" setup>
import { useCodeClient, type ImplicitFlowSuccessResponse } from "vue3-google-signin";
import { cloneDeep } from "lodash";
import { reactive, ref } from "vue";
import SModalContent from "@/components/design/modal/SModalContent.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import { User, Toast } from "@/modules";
import SInput from "@/components/design/forms/SInput.vue";
import SButton from "@/components/design/forms/SButton.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import * as UserService from "@/services/user";

const userStore = User.useStore();

const platforms = reactive(cloneDeep(userStore.platforms));
const waitingForResponse = ref(false);

const { isReady, login: linkGoogleAccount } = useCodeClient({
    onSuccess: googleBindAccount,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI
});

async function googleBindAccount(googleResponse: ImplicitFlowSuccessResponse) {
    waitingForResponse.value = true;
    await Toast.testRequest(async () => {
        return await UserService.bindAccount({ code: googleResponse.code, service: "google" });
    });
    waitingForResponse.value = false;
}

async function unlinkGoogleAccount() {
    platforms.google = "";
    await userStore.updatePlatforms(platforms);
}


</script>
