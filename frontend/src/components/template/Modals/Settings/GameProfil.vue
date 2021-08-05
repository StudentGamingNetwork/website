<template>
    <div class="game-profil">
        <div class="section-title">
            Discord
        </div>
        <div class="section">
            <SInput placeholder="Identifiant Discord" />
            <div class="description">
                Nous avons besoin de votre identifiant Discord pour vous contacter lors de vos matchs.
            </div>
        </div>
        <hr>
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
import SInput from "@/components/design/Forms/Input.vue";

export default defineComponent({
    name: "SGameProfil",
    components: { SButton, SInput }
});
</script>

<style scoped lang="scss">
.game-profil {
    padding: var(--length-padding-m);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: var(--length-gap-m);
    align-items: start;

    .section {
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);
        align-items: start;

        .description {
            font-size: 0.8rem;
            color: var(--color-content-softer);
        }
    }

    .section-title {
        margin-top: var(--length-margin-m);
        margin-bottom: var(--length-margin-s);
        padding-top: var(--length-padding-xs);
        color: var(--color-content-softer);
        font-size: 0.8rem;
        border-top: 1px solid var(--color-content-litest);
        width: 100%;
        text-transform: uppercase;
    }

    hr {
        margin: var(--length-margin-m) 0 0;
        width: 100%;
        border:none;
        border-top: 1px solid var(--color-content-litest);
    }
}
</style>
