<template>
    <SModal
        :active="stateStore.modal === 'signup'"
        @close="stateStore.modalClose()"
    >
        <div class="modal-content">
            <SSectionTitle>{{ $t("components.template.header.signup") }}</SSectionTitle>
            <div class="signup">
                <div class="remote">
                    <SButton
                        class="button google"
                        disabled
                        primary
                    >
                        <img
                            alt="Google Logo"
                            class="google-logo icon"
                            :src="LogoGoogleSignIn"
                        >
                        {{ $t("components.template.modals.signup.google") }}
                    </SButton>
                    <SButton
                        class="button facebook"
                        disabled
                        primary
                    >
                        <FontAwesomeIcon
                            class="icon"
                            :icon="['fab', 'facebook']"
                        />
                        {{ $t("components.template.modals.signup.facebook") }}
                    </SButton>
                    <SButton
                        class="button twitter"
                        disabled
                        primary
                    >
                        <FontAwesomeIcon
                            class="icon"
                            :icon="['fab', 'twitter']"
                        />
                        {{ $t("components.template.modals.signup.twitter") }}
                    </SButton>
                </div>
                <div class="separator">
                    <div class="line" />
                    <div class="text">
                        or
                    </div>
                    <div class="line" />
                </div>
                <div class="local">
                    <div>
                        <SInput
                            v-model="mail"
                            class="input"
                            title="Mail"
                            type="email"
                            :validators="[Validators.Mail()]"
                            @enter="signup"
                        />
                    </div>
                    <div>
                        <SInput
                            v-model="password"
                            class="input"
                            title="Mot de passe"
                            type="password"
                            @enter="signup"
                        />
                        <div v-if="password">
                            <SValidator :valid="isPasswordLongEnough">
                                {{ $t("components.template.modals.signup.length",PASSWORD_MIN_LENGTH) }}
                            </SValidator>
                            <SValidator :valid="doesPasswordContainLowercaseLetter">
                                {{ $t("components.template.modals.signup.lowercase") }}
                            </SValidator>
                            <SValidator :valid="doesPasswordContainUppercaseLetter">
                                {{ $t("components.template.modals.signup.uppercase") }}
                            </SValidator>
                            <SValidator :valid="doesPasswordContainNumber">
                                {{ $t("components.template.modals.signup.number") }}
                            </SValidator>
                        </div>
                    </div>
                    <SButton
                        class="button"
                        :disabled="!isFormValid"
                        primary
                        :spinning="waitingForResponse"
                        @click="signup"
                    >
                        {{ $t("components.template.modals.signup.signup") }}
                    </SButton>
                </div>
            </div>
            <div
                class="link"
                @click="stateStore.modalOpen('login')"
            >
                {{ $t("components.template.modals.signup.alreadyHaveAnAccount") }}]
            </div>
        </div>
    </SModal>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SModal from "@/components/design/modal/SModal.vue";
import SSectionTitle from "@/components/design/SSectionTitle.vue";
import SButton from "@/components/design/forms/SButton.vue";
import LogoGoogleSignIn from "@/assets/images/brands/google-sign-in.svg";
import SInput from "@/components/design/forms/SInput.vue";
import { State, Toast, User as UserModule } from "@/modules";
import * as UserService from "@/services/user";
import SValidator from "@/components/design/forms/SValidator.vue";
import * as Validators from "@/utils/validators";

const PASSWORD_MIN_LENGTH = 8;

const stateStore = State.useStore();

const mail = ref("");
const password = ref("");
const waitingForResponse = ref(false);

async function signup() {
    waitingForResponse.value = true;
    const response = await Toast.testRequest(async () => {
        return UserService.signup({ mail: mail.value, password: password.value });
    });
    waitingForResponse.value = false;

    if (response?.success) {
        password.value = "";
        mail.value = "";
        stateStore.modalClose();

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
.modal-content {
    padding: var(--length-padding-xl);
    width: 720px;
    max-width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--length-gap-l);

    .signup {
        display: flex;
        width: 100%;
        gap: var(--length-gap-l);

        .separator {
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0.5;

            .line {
                background: var(--color-content-softest);
                width: 1px;
                flex-grow: 1;
                flex-basis: 1px;
            }

            .text {
                padding-bottom: 2px;
            }
        }

        .remote, .local {
            flex-grow: 1;
            flex-basis: 1px;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-l);

            &::v-deep(input) {
                height: 44px;
            }
        }

        .remote {
            .button {
                display: flex;
                align-items: center;
                gap:var(--length-gap-m);
                height: 48px;
                position: relative;
                box-shadow: 0 4px 0px -8px transparent;
                background: var(--color-button);

                &:hover:not(.disabled) {
                    box-shadow: 0 4px 16px -8px var(--color-button);
                }
            }

            .google {
                --color-button: #ffffff;
                color: #6c6c6c;
            }

            .google-logo {
                height: 1.8rem;
            }

            .facebook {
                --color-button: #1977f3;
            }

            .twitter {
                --color-button: #08a0e9;
            }

            .icon {
                font-size: 1.8rem;
            }
        }

        .local {
            .button, .input {
                box-sizing: border-box;
                height: 48px;
                margin-top: 0;
                width: 100%;
            }
        }
    }

    .link {
        color: var(--color-primary);
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            opacity: 1;
        }
    }
}
</style>
