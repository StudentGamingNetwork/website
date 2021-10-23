<template>
    <SCard class="card">
        <div class="input mail">
            <SInput
                v-model="mail"
                title="Mail"
                :validators="[Validators.Mail()]"
            />
        </div>
        <div class="input password">
            <SInput
                v-model="password"
                title="Mot de passe"
                type="password"
            />
            <div v-if="password">
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
        </div>
        <SButton
            class="button signup"
            :disabled="!(mail && password)"
            primary
            :spinning="waitingForSignUpResponse"
            @click="signup"
        >
            S'inscrire
        </SButton>
        <SButton
            class="button login"
            :disabled="!(mail && password)"
            outlined
            :spinning="waitingForLogInResponse"
            @click="login"
        >
            Connexion
        </SButton>
        <SModalSectionDescription class="description">
            Vous pouvez utiliser votre <a href="https://sgnw.fr">compte SGN</a> si vous en avez un.
            Vous pourrez supprimer ce compte après la compétition si vous le souhaitez.
        </SModalSectionDescription>
    </SCard>
</template>

<script lang="ts">
export default {
    name: "SSignUp"
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";
import SCard from "@/components/design/Card.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import { Toast, User as UserModule } from "@/modules";
import * as UserService from "@/services/user";
import SValidator from "@/components/design/forms/Validator.vue";
import * as Validators from "@/utils/validators";

const PASSWORD_MIN_LENGTH = 8;

const mail = ref("");
const password = ref("");
const waitingForSignUpResponse = ref(false);
const waitingForLogInResponse = ref(false);

async function signup() {
    waitingForSignUpResponse.value = true;
    const response = await Toast.testRequest(async () => {
        return UserService.signup({ mail: mail.value, password: password.value });
    });
    waitingForSignUpResponse.value = false;

    if (response?.success) {
        password.value = "";
        mail.value = "";

        const userStore = UserModule.useStore();
        await userStore.init();
    }
}

async function login() {
    waitingForLogInResponse.value = true;
    const response = await Toast.testRequest(async () => {
        return await UserService.login({ mail: mail.value, password: password.value });
    });
    waitingForLogInResponse.value = false;

    if (response?.success) {
        password.value = "";
        mail.value = "";

        const userStore = UserModule.useStore();
        await userStore.init();
    }
}

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

const isFormValid = computed(() => {
    return Validators.Mail().execute(mail.value)
        && isPasswordLongEnough.value
        && doesPasswordContainNumber.value
        && doesPasswordContainUppercaseLetter.value
        && doesPasswordContainLowercaseLetter.value;
});
</script>

<style scoped lang="scss">
.card {

    padding: var(--length-padding-m);
    display: grid;
    row-gap: var(--length-gap-l);
    column-gap: var(--length-gap-l);
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "mail mail"
        "password password"
        "signup login"
        "description description";

    .input {
        &::v-deep(.input) {
            width: 100%;
        }
    }

    .button {
        &::v-deep(button) {
            text-align: center;
        }
    }

    .mail {
        grid-area: mail;
    }

    .password {
        grid-area: password;
    }

    .signup {
        grid-area: signup;
    }

    .login {
        grid-area: login;
    }

    .description {
        grid-area: description;
    }
}
</style>
