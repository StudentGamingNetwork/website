<template>
    <SModalContent class="public-profil">
        <SModalSectionTitle>
            Profil
        </SModalSectionTitle>
        <SModalSection>
            <SAvatarPicker />
            <div>
                <SInput
                    v-model="username"
                    :modified="username !== userStore.username"
                    title="Pseudo"
                    @enter="sendUpdate"
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
                title="Mail"
            />
        </SModalSection>
        <SModalSectionTitle>
            Statut étudiant
        </SModalSectionTitle>
        <SModalSection>
            <SInput
                v-model="name"
                :modified="name !== userStore.name"
                title="Prénom et nom"
                @enter="sendUpdate"
            />
            <SButton
                class="certificate-input"
                disabled
                outlined
            >
                Certificat étudiant
            </SButton>
            <div class="status">
                <span class="soft">État:</span> Aucun certificat fourni
            </div>
            <div class="description">
                Pour participer aux tournois, vous devez fournir une preuve de votre statut étudiant (<u>certificat
                    étudiant</u> ou <u>carte étudiante</u>).
                Les collégiens et lycéens <strong>ne sont pas</strong> considérés comme "étudiants".
            </div>
        </SModalSection>
        <SModalSectionTitle>
            Changer de mot de passe
        </SModalSectionTitle>
        <SModalSection>
            <SInput
                v-model="password.old"
                password
                title="Ancien mot de passe"
            />
            <SInput
                v-model="password.new"
                password
                title="Nouveau mot de passe"
            />
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            Sauvegarder le profil
        </SButton>
    </SModalContent>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import SInput from "@/components/design/Forms/Input.vue";
import { User } from "@/modules";
import SValidator from "@/components/design/Forms/Validator.vue";
import SAvatarPicker from "@/components/design/Forms/AvatarPicker.vue";
import SButton from "@/components/design/Forms/Button.vue";
import SModalSectionTitle from "@/components/design/Modal/SectionTitle.vue";
import SModalSection from "@/components/design/Modal/Section.vue";
import SModalSeparator from "@/components/design/Modal/Separator.vue";
import SModalContent from "@/components/design/Modal/Content.vue";

export default defineComponent({
    name: "SPublicProfil",
    components: {
        SAvatarPicker,
        SButton,
        SInput,
        SModalContent,
        SModalSection,
        SModalSectionTitle,
        SModalSeparator,
        SValidator
    },
    setup() {
        const userStore = User.useStore();

        const username = ref(userStore.username);
        const name = ref(userStore.name);
        const password = reactive({
            new: ref(""),
            old: ref("")
        });

        const hasUpdate = computed(() => {
            return username.value !== userStore.username
                || name.value !== userStore.name
                || (password.old && password.new);
        });

        const sendUpdate = async () => {
            if (!hasUpdate.value) {
                return;
            }

            await userStore.update({
                name: name.value,
                password: {
                    new: password.new,
                    old: password.old
                },
                username: username.value
            });
        };

        return {
            name,
            hasUpdate,
            password,
            sendUpdate,
            username,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.public-profil {
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

    .certificate-input {
        width: 320px;
        text-align: left;
    }
}
</style>
