<template>
    <div class="public-profil">
        <div class="section">
            <SAvatarPicker />
            <div>
                <SInput
                    v-model="username"
                    placeholder="Pseudo"
                />
                <template v-if="!username">
                    <SValidator :valid="false">
                        Vous devez entrez un pseudo
                    </SValidator>
                </template>
            </div>
            <SInput
                disabled
                :model-value="userStore.mail"
                placeholder="Mail"
            />
        </div>
        <div class="section-title">
            Statut étudiant
        </div>
        <div class="section">
            <SInput
                placeholder="Prénom et nom"
            />
            <SInput
                disabled
                placeholder="Certificat étudiant"
            />
            <div class="status">
                <span class="soft">État:</span> Aucun certificat fourni
            </div>
            <div class="description">
                Vous devez fournir une preuve de votre statut étudiant (<u>certificat étudiant</u> ou <u>carte étudiante</u>) pour participer aux tournois.
                Les collégiens et lycéens <strong>ne sont pas</strong> considérés comme "étudiants".
            </div>
        </div>
        <div class="section-title">
            Changer de mot de passe
        </div>
        <div class="section">
            <SInput
                placeholder="Ancien mot de passe"
            />
            <SInput
                placeholder="Nouveau mot de passe"
            />
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
import { defineComponent, ref } from "vue";
import SInput from "@/components/design/Forms/Input.vue";
import { User } from "@/modules";
import SValidator from "@/components/design/Forms/Validator.vue";
import SAvatarPicker from "@/components/design/Forms/AvatarPicker.vue";
import SButton from "@/components/design/Forms/Button.vue";

export default defineComponent({
    name: "SPublicProfil",
    components: { SAvatarPicker, SButton, SInput, SValidator },
    setup() {
        const userStore = User.useStore();

        const username = ref(userStore.username);

        return {
            username,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.public-profil {
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

        .status {
            font-size: 0.9rem;
        }

        .description {
            font-size: 0.8rem;
            color: var(--color-content-softer);
        }

        .soft {
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
