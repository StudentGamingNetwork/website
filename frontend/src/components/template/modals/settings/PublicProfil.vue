<template>
    <SModalContent class="public-profil">
        <SModalSectionTitle>
            Profil
        </SModalSectionTitle>
        <SModalSection>
            <SAvatarPicker
                title="Photo de profil"
                :url="avatarUrl"
                @fileChange="uploadAvatar"
            />
            <SInput
                v-model="username"
                :modified="username !== userStore.username"
                required
                title="Pseudo"
                :validators="[InputValidators.NotEmpty()]"
                @enter="sendUpdate"
            />
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
                title="Ancien mot de passe"
                type="password"
            />
            <SInput
                v-model="password.new"
                title="Nouveau mot de passe"
                type="password"
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
import SInput from "@/components/design/forms/Input.vue";
import { User } from "@/modules";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import * as InputValidators from "@/utils/validators";

export default defineComponent({
    name: "SPublicProfil",
    components: {
        SAvatarPicker,
        SButton,
        SInput,
        SModalContent,
        SModalSection,
        SModalSectionTitle,
        SModalSeparator
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

        const avatarUrl = computed(() => {
            return userStore.avatar ? userStore.getAvatarUrl : "";
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

        const uploadAvatar = async(file: File) => {
            await userStore.uploadAvatar(file);
        };

        return {
            name,
            avatarUrl,
            hasUpdate,
            InputValidators,
            password,
            sendUpdate,
            uploadAvatar,
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
        max-width: 100%;
        text-align: left;
    }
}
</style>