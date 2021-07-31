<template>
    <div class="header-buttons">
        <SButton
            primary
            @click="stateStore.modalSignUpOpen"
        >
            Inscription
        </SButton>
        <SModalSignUp />
        <SButton
            outlined
            @click="stateStore.modalLogInOpen"
        >
            Connexion
        </SButton>
        <SModalLogIn />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/Forms/Button.vue";
import SModalSignUp from "@/components/template/Modals/SignUp.vue";
import SModalLogIn from "@/components/template/Modals/LogIn.vue";
import { State } from "@/modules";

export default defineComponent({
    name: "SHeaderButtons",
    components: { SButton, SModalLogIn, SModalSignUp },
    setup() {
        const stateStore = State.useStore();

        return {
            stateStore
        };
    }
});
</script>

<style scoped lang="scss">
.header-buttons {
    display: flex;
    gap: var(--length-gap-l);
    justify-content: flex-end;
}
</style>
