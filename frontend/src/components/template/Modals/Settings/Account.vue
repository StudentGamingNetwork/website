<template>
    <div class="account">
        <div class="section-title">
            Danger zone
        </div>
        <div class="section">
            <SButton
                danger
                outlined
            >
                Supprimer mon compte
            </SButton>
            <div class="description">
                Attention, toute suppression est définitive ! Vous devrez recréer un compte pour participer aux futurs événements du SGN.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/Forms/Button.vue";

export default defineComponent({
    name: "SAccount",
    components: { SButton }
});
</script>

<style scoped lang="scss">
.account {
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
