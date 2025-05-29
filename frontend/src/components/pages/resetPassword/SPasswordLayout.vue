<template>
    <SPageHead
        :background="BackgroundAbout"
        title="Réinitialisation du mot de passe"
    >
        Entrez votre adresse e-mail ainsi qu'un nouveau mot de passe.
    </SPageHead>
    <SBaseLayout>
        <div class="wrapper">
            <SInput
                v-model="mail"
                class="input"
                required
                title="Adresse e-mail"
                type="email"
            />
            <SInput
                v-model="password"
                class="input"
                required
                title="Nouveau mot de passe"
                type="password"
            />
            <div
                v-if="password"
                class="validators"
            >
                <SValidator :valid="isPasswordLongEnough">
                    Au moins {{ PASSWORD_MIN_LENGTH }} caractères
                </SValidator>
                <SValidator :valid="doesPasswordContainLowercaseLetter">
                    Au moins une lettre minuscule
                </SValidator>
                <SValidator :valid="doesPasswordContainUppercaseLetter">
                    Au moins une lettre majuscule
                </SValidator>
                <SValidator :valid="doesPasswordContainNumber">
                    Au moins un chiffre
                </SValidator>
            </div>
            <SInput
                v-model="passwordConfirmation"
                class="input"
                required
                title="Confirmer votre mot de passe"
                type="password"
            />
            <div v-if="passwordConfirmation">
                <SValidator :valid="password===passwordConfirmation">
                    Les mots de passe doivent correspondre
                </SValidator>
            </div>
            <SButton
                class="button"
                :disabled="!mail || !password"
                primary
                @click="handleSubmit"
            >
                Réinitialiser le mot de passe
            </SButton>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { EToastType, useStore } from "@/modules/toast/store";
import BackgroundAbout from "@/assets/images/backgrounds/about.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SInput from "@/components/design/forms/SInput.vue";
import SButton from "@/components/design/forms/SButton.vue";
import SValidator from "@/components/design/forms/SValidator.vue";
import * as UserService from "@/services/user";
import { Toast } from "@/modules";

const PASSWORD_MIN_LENGTH = 8;
const router = useRouter();
const toastStore = useStore();

const mail = ref("");
const password = ref("");
const passwordConfirmation = ref("");


const isPasswordLongEnough = computed(() => {
    return password.value.length >= PASSWORD_MIN_LENGTH;
});

const doesPasswordContainNumber = computed(() => {
    return /[0-9]/.test(password.value);
});

const doesPasswordContainUppercaseLetter = computed(() => {
    return /[A-Z]/.test(password.value);
});

const doesPasswordContainLowercaseLetter = computed(() => {
    return /[a-z]/.test(password.value);
});

async function handleSubmit(){
    if (!mail.value || !password.value) {
        toastStore.add({
            title: "Erreur",
            message: "Tous les champs doivent être remplis.",
            type: EToastType.Error
        });

        return;
    }
    const response = await Toast.testRequest(async () => {
        return await UserService.changePassword({ mail: mail.value, password: password.value, token: router.currentRoute.value.params.token as string });
    });

    if (response?.success) {
        router.push("/");
    }
}


</script>

<style scoped lang="scss">
.wrapper {
    width: fit-content;
    margin: auto;

    .input {
        box-sizing: border-box;
        height: 48px;
        margin-top: 0;
        width: 100%;
    }

    .button {
        box-sizing: border-box;
        height: 36px;
        margin-top: var(--length-margin-s);
        width: 100%;
    }

    .validator {
        padding-bottom: var(--length-margin-xs);
        
    }
        
}
</style>
