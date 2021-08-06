<template>
    <div class="header-buttons">
        <SButton
            primary
            @click="stateStore.modalOpen('signup')"
        >
            Inscription
        </SButton>
        <SModalSignUp />
        <SButton
            outlined
            @click="stateStore.modalOpen('login')"
        >
            Connexion
        </SButton>
        <SModalLogIn />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSignUp from "@/components/template/modals/SignUp.vue";
import SModalLogIn from "@/components/template/modals/LogIn.vue";
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
