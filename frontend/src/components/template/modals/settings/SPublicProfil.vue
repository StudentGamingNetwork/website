<template>
    <SModalContent class="public-profil">
        <SModalSectionTitle>
            {{ $t("components.template.modals.settings.public.title") }}
        </SModalSectionTitle>
        <SModalSection>
            <SAvatarPicker
                :title="$t('components.template.modals.settings.public.avatar')"
                :url="avatarUrl"
                @file-change="uploadAvatar"
            />
            <SInput
                v-model="username"
                autocomplete="false"
                :modified="username !== userStore.username"
                required
                :title="$t('components.template.modals.settings.public.username')"
                :validators="[InputValidators.NotEmpty()]"
                @enter="sendUpdate"
            />
            <SInput
                disabled
                :model-value="userStore.mail"
                :title="$t('components.template.modals.settings.public.mail')"
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
                :title="$t('components.template.modals.settings.public.status.title')"
                @enter="sendUpdate"
            />
            <!--<template v-if="associationStore._id">
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
            </template> -->
            <SInput
                v-model="student.schoolName"
                autocomplete="false"
                :modified="student.schoolName !== userStore.student.schoolName"
                :title="$t('components.template.modals.settings.public.status.school')"
                @enter="sendUpdate"
            />
            <div class="certificate">
                <SCertificatePicker
                    :url="certificateUrl"
                    @file-change="uploadCertificate"
                />
            </div>
            <div class="status">
                <span class="soft">{{ $t("components.template.modals.settings.public.status.state") }}</span>
                <span
                    v-if="userStore.student.status === 'processing'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'eye']" /> {{ $t("components.template.modals.settings.public.status.processing") }}</span>
                <span
                    v-else-if="userStore.student.status === 'validated'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'check']" /> {{ $t("components.template.modals.settings.public.status.validated") }}</span>
                <span
                    v-else-if="userStore.student.status === 'rejected'"
                    class="main error"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> {{ $t("components.template.modals.settings.public.status.rejected") }}
                    <span
                        v-if="userStore.student.rejectReason.length !== 0"
                        class="link"
                        @click="showCertificateRejectionReason"
                    >{{ $t("components.template.modals.settings.public.status.showReason") }}</span>
                </span>
                <span
                    v-else
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> {{ $t("components.template.modals.settings.public.status.none") }}</span>
            </div>
            <i18n-t
                keypath="components.template.modals.settings.public.status.description"
                :tag="SModalSectionDescription"
            >
                <template #certificate>
                    <u> {{ $t("components.template.modals.settings.public.status.certificat") }}</u>
                </template>
                <template #card>
                    <u> {{ $t("components.template.modals.settings.public.status.card") }}</u>
                </template>
                <template #not>
                    <span><strong>{{ $t("components.template.modals.settings.public.status.not") }}</strong></span>
                </template>
            </i18n-t>
        </SModalSection>
        <SModalSeparator />
        <SButton
            :disabled="!hasUpdate"
            primary
            @click="sendUpdate"
        >
            {{ $t("components.template.modals.settings.public.save") }}
        </SButton>
    </SModalContent>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { cloneDeep } from "lodash";
import SInput from "@/components/design/forms/SInput.vue";
import { User, Association } from "@/modules";
import SAvatarPicker from "@/components/design/forms/SAvatarPicker.vue";
import SButton from "@/components/design/forms/SButton.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import SModalContent from "@/components/design/modal/SModalContent.vue";
import * as InputValidators from "@/utils/validators";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";
import SCertificatePicker from "@/components/design/forms/SCertificatePicker.vue";


  
const userStore = User.useStore();
const associationStore = Association.useStore();

const username = ref(userStore.username);
const student = reactive(cloneDeep(userStore.student));

const hasUpdate = computed(() => {
    return username.value !== userStore.username
                || student.name !== userStore.student.name
                || student.schoolName !== userStore.student.schoolName;
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

    await userStore.init();
};

const uploadAvatar = async(file: File) => {
    await userStore.uploadAvatar(file);
};

const uploadCertificate = async(file: File) => {
    await userStore.uploadCertificate(file);
};

function showCertificateRejectionReason() {
    alert(userStore.student.rejectReason);
}

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

            &.error {
                color: var(--color-error-content);
            }
        }
    }

    .certificate {
        display: flex;
        gap: var(--length-gap-m);

        @media (max-width: 1099px) {
            flex-direction: column;
        }
    }

    .certificate-input {
        width: 320px;
        max-width: 100%;
        text-align: left;
    }
    .link {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
