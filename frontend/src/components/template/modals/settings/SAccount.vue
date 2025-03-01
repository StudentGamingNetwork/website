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
    
        <SModalSectionTitle>
            Authentification à deux facteurs
        </SModalSectionTitle>
        <SModalSection>
            <SModalSectionDescription>
                L'authentification à deux facteurs est une méthode de sécurité supplémentaire pour protéger votre
                compte. Lorsque vous l'activez, vous devrez entrer un code de vérification à chaque connexion.
            </SModalSectionDescription>
            <SButton
             outlined
                @click="toggleTwoFactorAuth">
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

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import SButton from "@/components/design/forms/Button.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import { Toast, User } from "@/modules";
import SInput from "@/components/design/forms/Input.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import * as TFAService from "@/services/twoFactorAuth";


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
    } else {
        await enableTwoFactorAuth();
    }
};

const twoFactorAuthButtonText = computed(() => {
    return userStore.twoFactorAuth.enabled ? "Désactiver l'authentification à deux facteurs" : "Activer l'authentification à deux facteurs";
});

async function enableTwoFactorAuth() {
    const result = confirm("Êtes-vous sûr de vouloir activer l'authentification à deux facteurs ?");
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
    const result = confirm("Êtes-vous sûr de vouloir désactiver l'authentification à deux facteurs ?");
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
