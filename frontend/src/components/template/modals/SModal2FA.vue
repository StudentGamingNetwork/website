<template>
    <SModal
        :active="stateStore.modal === 'twoFactorAuth'"
        @close="disconnect"
    >
        <div class="modal-content">
            <SSectionTitle>Authentification 2 facteurs</SSectionTitle>
            <span>Entrez le token généré sur votre application</span>
            <div class="login">
                <div class="local">
                    <SInput
                        v-model="otp"
                        class="input"
                        title="OTP"
                        type="text"
                        @enter="verifyToken"
                    />
                    <SButton
                        class="button"
                        :disabled="!otp"
                        primary
                        :spinning="waitingForResponse"
                        @click="verifyToken"
                    >
                        Envoyer le code
                    </SButton>
                </div>
            </div>
        </div>
    </SModal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SModal from "@/components/design/modal/Modal.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SButton from "@/components/design/forms/Button.vue";
import SInput from "@/components/design/forms/Input.vue";
import { State, Toast , User as UserModule } from "@/modules";
import * as UserService from "@/services/user";
import * as TwoFactorAuthService from "@/services/twoFactorAuth";

const stateStore = State.useStore();

const otp = ref("");
const waitingForResponse = ref(false);

async function verifyToken() {
    waitingForResponse.value = true;

    const response = await Toast.testRequest(async () => {
        return await TwoFactorAuthService.verify(otp.value);
    });
    
    waitingForResponse.value = false;

    if (response?.success && !response?.twoFactorAuth) {
        stateStore.modalClose();
        otp.value = "";

        const userStore = UserModule.useStore();
        await userStore.init();
    }
}

async function disconnect() {
    stateStore.modalClose();
    await UserService.disconnect();
}
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

    .login {
        display: flex;
        width: 100%;


        .local {
            margin: auto;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-l);

            &::v-deep(input) {
                height: 44px;
            }

             .button, .input {
                box-sizing: border-box;
                height: 48px;
                margin-top: 0;
                width: 100%;
            }
        }
    }
}
</style>
