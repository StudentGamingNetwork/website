<template>
    <div class="game-profil">
        <SButton
            disabled
            primary
        >
            Sauvegarder le profil
        </SButton>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/Forms/Button.vue";

export default defineComponent({
    name: "SGameProfil",
    components: { SButton }
});
</script>

<style scoped lang="scss">
.game-profil {
    padding: var(--length-padding-m);
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);
    align-items: start;
}
</style>
