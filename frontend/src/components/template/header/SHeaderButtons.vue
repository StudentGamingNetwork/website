<template>
    <div class="header-buttons">
        <SButton
            primary
            @click="stateStore.modalOpen('signup')"
        >
            {{ $t("components.template.header.signup") }}
        </SButton>
        <SModalSignUp />
        <SButton
            outlined
            @click="stateStore.modalOpen('login')"
        >
            {{ $t("components.template.header.login") }}
        </SButton>
        <SModalLogIn />
        <SModal2FA />
    </div>
</template>

<script lang="ts" setup>
import SButton from "@/components/design/forms/SButton.vue";
import SModalSignUp from "@/components/template/modals/SModalSignUp.vue";
import SModalLogIn from "@/components/template/modals/SModalLogIn.vue";
import SModal2FA from "@/components/template/modals/SModal2FA.vue";
import { State } from "@/modules";

const stateStore = State.useStore();

</script>

<style scoped lang="css">
.header-buttons {
    display: flex;
    gap: var(--length-gap-l);
    justify-content: flex-end;
}
</style>
