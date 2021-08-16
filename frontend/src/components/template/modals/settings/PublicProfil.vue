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
                autocomplete="false"
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
                v-model="student.name"
                autocomplete="false"
                :modified="student.name !== userStore.student.name"
                title="Prénom et nom"
                @enter="sendUpdate"
            />
            <template v-if="associationStore._id">
                <SInput
                    v-model="associationStore.school.name"
                    disabled
                    title="École"
                />
                <SModalSectionDescription>
                    Votre école est celle fournie par votre association.
                </SModalSectionDescription>
            </template>
            <template v-else>
                <SInput
                    v-model="student.schoolName"
                    autocomplete="false"
                    :modified="student.schoolName !== userStore.student.schoolName"
                    title="École"
                    @enter="sendUpdate"
                />
                <SModalSectionDescription>
                    Il est préférable de rejoindre une association plutôt que de renseigner votre école manuellement.
                </SModalSectionDescription>
            </template>
            <SCertificatePicker
                :url="certificateUrl"
                @fileChange="uploadCertificate"
            />
            <div class="status">
                <span class="soft">État:</span>
                <span
                    v-if="userStore.student.status === 'processing'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'eye']" /> Vérification en cours</span>
                <span
                    v-else-if="userStore.student.status === 'validated'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'check']" /> Certificat validé jusqu'en Septembre</span>
                <span
                    v-else-if="userStore.student.status === 'rejected'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> Certificat rejeté</span>
                <span
                    v-else
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> Aucun certificat fourni</span>
            </div>
            <SModalSectionDescription>
                Pour participer aux tournois, vous devez fournir une preuve de votre statut étudiant (<u>certificat
                    étudiant</u> ou <u>carte étudiante</u>).
                Les collégiens et lycéens <strong>ne sont pas</strong> considérés comme "étudiants".
            </SModalSectionDescription>
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            Sauvegarder les changements
        </SButton>
    </SModalContent>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { cloneDeep } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import { User, Association } from "@/modules";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SButton from "@/components/design/forms/Button.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SModalContent from "@/components/design/modal/Content.vue";
import * as InputValidators from "@/utils/validators";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import SCertificatePicker from "@/components/design/forms/CertificatePicker.vue";

export default defineComponent({
    name: "SPublicProfil",
    components: {
        FontAwesomeIcon,
        SAvatarPicker,
        SButton,
        SCertificatePicker,
        SInput,
        SModalContent,
        SModalSection,
        SModalSectionDescription,
        SModalSectionTitle,
        SModalSeparator
    },
    setup() {
        const userStore = User.useStore();
        const associationStore = Association.useStore();

        const username = ref(userStore.username);
        const student = reactive(cloneDeep(userStore.student));

        const hasUpdate = computed(() => {
            return username.value !== userStore.username
                || student.name !== userStore.student.name;
        });

        const avatarUrl = computed(() => {
            return userStore.avatar ? userStore.getAvatarUrl : "";
        });

        const certificateUrl = computed(() => {
            return userStore.student.certificate ? userStore.getCertificateUrl : "";
        });

        const sendUpdate = async () => {
            if (!hasUpdate.value) {
                return;
            }

            await userStore.update({
                student,
                username: username.value
            });
        };

        const uploadAvatar = async(file: File) => {
            await userStore.uploadAvatar(file);
        };

        const uploadCertificate = async(file: File) => {
            await userStore.uploadCertificate(file);
        };

        return {
            associationStore,
            avatarUrl,
            certificateUrl,
            hasUpdate,
            InputValidators,
            sendUpdate,
            student,
            uploadAvatar,
            uploadCertificate,
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

        .soft {
            color: var(--color-content-softer);
        }

        .main {
            padding-left: var(--length-padding-xxs);
        }
    }

    .certificate-input {
        width: 320px;
        max-width: 100%;
        text-align: left;
    }
}
</style>
