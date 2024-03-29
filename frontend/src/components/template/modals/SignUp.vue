<template>
    <SModal
        :active="stateStore.modal === 'signup'"
        @close="stateStore.modalClose()"
    >
        <div class="modal-content">
            <SSectionTitle>Inscription</SSectionTitle>
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
                        Inscription avec Google
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
                        Inscription avec Facebook
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
                        Inscription avec Twitter
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
                        class="button"
                        :disabled="!isFormValid"
                        primary
                        :spinning="waitingForResponse"
                        @click="signup"
                    >
                        S'inscrire
                    </SButton>
                </div>
            </div>
            <div
                class="link"
                @click="stateStore.modalOpen('login')"
            >
                Déjà inscrit ?
            </div>
        </div>
    </SModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SModal from "@/components/design/modal/Modal.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SButton from "@/components/design/forms/Button.vue";
import LogoGoogleSignIn from "@/assets/images/brands/google-sign-in.svg";
import SInput from "@/components/design/forms/Input.vue";
import { State, Toast, User as UserModule } from "@/modules";
import * as UserService from "@/services/user";
import SValidator from "@/components/design/forms/Validator.vue";
import * as Validators from "@/utils/validators";

const PASSWORD_MIN_LENGTH = 8;

export default defineComponent({
    name: "SModalSignUp",
    components: { FontAwesomeIcon, SButton, SInput, SModal, SSectionTitle, SValidator },
    setup() {
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

        return {
            doesPasswordContainLowercaseLetter,
            doesPasswordContainNumber,
            doesPasswordContainUppercaseLetter,
            isFormValid,
            isPasswordLongEnough,
            LogoGoogleSignIn,
            mail,
            password,
            PASSWORD_MIN_LENGTH,
            signup,
            stateStore,
            Validators,
            waitingForResponse
        };
    }
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
