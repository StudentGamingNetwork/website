<template>
    <SModal v-model:active="stateStore.modals.logIn">
        <div class="modal-content">
            <SSectionTitle>Connexion</SSectionTitle>
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
                        Connexion avec Google
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
                        Connexion avec Facebook
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
                        Connexion avec Twitter
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
                    <SInput
                        v-model="mail"
                        class="input"
                        placeholder="Mail"
                        @enter="login"
                    />
                    <SInput
                        v-model="password"
                        class="input"
                        password
                        placeholder="Mot de passe"
                        @enter="login"
                    />
                    <SButton
                        class="button"
                        :disabled="!(mail && password)"
                        primary
                        :spinning="waitingForResponse"
                        @click="login"
                    >
                        Connexion
                    </SButton>
                </div>
            </div>
            <div
                class="link"
                @click="stateStore.modalSignUpOpen"
            >
                Pas encore de compte ?
            </div>
        </div>
    </SModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SModal from "@/components/design/Modal.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SButton from "@/components/design/Button.vue";
import LogoGoogleSignIn from "@/assets/images/brands/google-sign-in.svg";
import SInput from "@/components/design/Input.vue";
import { State } from "@/modules";
import * as UserService from "@/services/user";
import * as ToastModule from "@/modules/toast";

export default defineComponent({
    name: "SModalLogIn",
    components: { FontAwesomeIcon, SButton, SInput, SModal, SSectionTitle },
    setup() {
        const stateStore = State.useStore();

        const mail = ref("");
        const password = ref("");
        const waitingForResponse = ref(false);

        async function login() {
            waitingForResponse.value = true;
            await ToastModule.testRequest(async () => {
                return await UserService.login({ mail: mail.value, password: password.value });
            });
            waitingForResponse.value = false;
        }

        return {
            login,
            LogoGoogleSignIn,
            mail,
            password,
            stateStore,
            waitingForResponse
        };
    }
});
</script>

<style scoped lang="scss">
.modal-content {
    padding: var(--length-padding-xl);
    width: 720px;
    height: 380px;
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
            height: 100%;
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
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-l);
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
