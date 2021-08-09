<template>
    <div
        class="not-found"
        :style="headerStyle"
    >
        <SPageTitle>
            Page introuvable
        </SPageTitle>
        <SPageDescription>
            <strong>Vous vous êtes perdu ?</strong> On fait tout ce qu'on peut pour vous localiser !<br>
            <em><sub>Jean-Mich, t'as toujours pas réparé l'antenne 3 ? On passe pour quoi, là...</sub></em>
        </SPageDescription>
        <div class="cta">
            <SButton
                primary
                @click="$router.push('/')"
            >
                Revenir à la page d'acceuil
            </SButton>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import notFoundBackground from "@/assets/images/backgrounds/not-found.png";
import SPageTitle from "@/components/template/PageTitle.vue";
import SPageDescription from "@/components/template/PageDescription.vue";
import SButton from "@/components/design/forms/Button.vue";

export default defineComponent({
    name: "SNotFoundLayout",
    components: { SButton, SPageDescription, SPageTitle },
    setup() {
        return {
            headerStyle: {
                backgroundImage: `url(${ notFoundBackground })`
            }
        };
    }
});
</script>

<style scoped lang="scss">
.not-found {
    padding: 128px;
    background-size: cover;
    background-position: 50% 50%;
    min-height: 640px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);

    .cta {
        display: flex;
        gap: var(--length-gap-l);
    }
}
</style>
