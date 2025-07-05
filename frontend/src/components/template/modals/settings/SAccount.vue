<template>
    <SModalContent class="account">
        <SModalSectionTitle>
            {{ $t("components.template.modals.settings.account.password") }}
        </SModalSectionTitle>
        <form>
            <SModalSection>
                <SInput
                    v-model="password.old"
                    autocomplete="false"
                    :title="$t('components.template.modals.settings.account.old')"
                    type="password"
                />
                <SInput
                    v-model="password.new"
                    autocomplete="false"
                    :title="$t('components.template.modals.settings.account.new')"
                    type="password"
                />
            </SModalSection>
        </form>
    
        <SModalSectionTitle>
            {{ $t("components.template.modals.settings.2fa.title") }}
        </SModalSectionTitle>
        <SModalSection>
            <SModalSectionDescription>
                {{ $t("components.template.modals.settings.2fa.description") }}
            </SModalSectionDescription>
            <SButton
                outlined
                @click="toggleTwoFactorAuth"
            >
                {{ twoFactorAuthButtonText }}
            </SButton>
            <div v-show="showQR">
                <img
                    alt="QR Code"
                    :src="qrcode"
                >
            </div>
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            {{ $t("components.template.modals.save") }}
        </SButton>
        <SModalSectionTitle>
            Danger zone
        </SModalSectionTitle>
        <SModalSection>
            <SButton
                danger
                outlined
            >
                {{ $t("components.template.modals.delete") }}
            </SButton>
            <SModalSectionDescription>
                {{ $t("components.template.modals.description") }}
            </SModalSectionDescription>
        </SModalSection>
    </SModalContent>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import SButton from "@/components/design/forms/SButton.vue";
import SModalContent from "@/components/design/modal/SModalContent.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";
import { Toast, User } from "@/modules";
import SInput from "@/components/design/forms/SInput.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import * as TFAService from "@/services/twoFactorAuth";
import i18n from "@/locales";


const userStore = User.useStore();
const showQR = ref(false);
const totpLink = ref("");
const qrcode = useQRCode(totpLink);
const password = reactive({
    new: "",
    old: ""
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

const toggleTwoFactorAuth = async () => {
    if (userStore.twoFactorAuth.enabled) {
        await disableTwoFactorAuth();
    }
    else {
        await enableTwoFactorAuth();
    }
};

const twoFactorAuthButtonText = computed(() => {
    return userStore.twoFactorAuth.enabled ? i18n.global.t("components.template.modals.settings.2fa.disable") : i18n.global.t("components.template.modals.settings.2fa.enable");
});

async function enableTwoFactorAuth() {
    const result = confirm(i18n.global.t("components.template.modals.settings.2fa.enablePrompt"));
    if (result) {
        const response = await Toast.testRequest(async () => {
            return await TFAService.create();
        });

        if (response?.success) { 
            showQR.value = true;
            totpLink.value = response.tokenLink;
            userStore.twoFactorAuth.enabled = true;
        }
    }
}
    
async function disableTwoFactorAuth() {
    const result = confirm(i18n.global.t("components.template.modals.settings.2fa.disablePrompt"));
    if (result) {
        const response = await Toast.testRequest(async () => {
            return await TFAService.remove();
        });

        if (response?.success) {
            showQR.value = false;
            totpLink.value = "";
            userStore.twoFactorAuth.enabled = false;
        }
    }
}
</script>
