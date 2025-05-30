<template>
    <SCard class="card">
        <div class="input mail">
            <SInput
                v-model="mail"
                :title="$t('tournaments.widget.signup.mail')"
                type="email"
                :validators="[Validators.Mail()]"
            />
        </div>
        <div class="input password">
            <SInput
                v-model="password"
                :title="$t('tournaments.widget.signup.password')"
                type="password"
            />
            <div v-if="password">
                <SValidator :valid="isPasswordLongEnough">
                    {{ $t("tournaments.widget.signup.passLen",PASSWORD_MIN_LENGTH) }}
                </SValidator>
                <SValidator :valid="doesPasswordContainLowercaseLetter">
                    {{ $t("tournaments.widget.signup.passMin") }}
                </SValidator>
                <SValidator :valid="doesPasswordContainUppercaseLetter">
                    {{ $t("tournaments.widget.signup.passMaj") }}
                </SValidator>
                <SValidator :valid="doesPasswordContainNumber">
                    {{ $t("tournaments.widget.signup.passNum") }}
                </SValidator>
            </div>
        </div>
        <SButton
            class="button signup"
            primary
            :spinning="waitingForSignUpResponse"
            @click="signup"
        >
            {{ $t("tournaments.widget.signup.button.signup") }}
        </SButton>
        <SButton
            class="button login"
            outlined
            :spinning="waitingForLogInResponse"
            @click="login"
        >
            {{ $t("tournaments.widget.signup.button.login") }}
        </SButton>
        <SModalSectionDescription class="description">
            <i18n-t keypath="tournaments.widget.signup.description">
                <template #account>
                    <a
                        href="https://sgnw.fr"
                        target="_blank"
                    >{{ $t('tournaments.widget.signup.account') }}</a>
                </template>
            </i18n-t>
        </SModalSectionDescription>
    </SCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import SInput from "@/components/design/forms/SInput.vue";
import SButton from "@/components/design/forms/SButton.vue";
import SCard from "@/components/design/SCard.vue";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";
import { Toast, User as UserModule } from "@/modules";
import * as UserService from "@/services/user";
import SValidator from "@/components/design/forms/SValidator.vue";
import * as Validators from "@/utils/validators";
import { EToastType, useStore } from "@/modules/toast/store";


const { t } = useI18n(); 
const PASSWORD_MIN_LENGTH = 8;
const toastStore = useStore();

const mail = ref("");
const password = ref("");
const waitingForSignUpResponse = ref(false);
const waitingForLogInResponse = ref(false);

async function signup() {
    if (!mail.value || !password.value) {
        toastStore.add({
            title: t("tournaments.widget.signup.function.title"),
            message: t("tournaments.widget.signup.function.message"),
            type: EToastType.Error
        });

        return;
    }

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
    if (!mail.value || !password.value) {
        toastStore.add({
            title: t("tournaments.widget.signup.function.title"),
            message: t("tournaments.widget.signup.function.message"),
            type: EToastType.Error
        });

        return;
    }

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

<style scoped lang="css">
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
