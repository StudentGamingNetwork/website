<template>
    <SModalContent class="association">
        <template
            v-if="associationStore._id"
            class="details"
        >
            <template v-if="isOwner">
                <SModalSectionTitle> {{ $t('components.template.modals.settings.association.title') }} </SModalSectionTitle>
                <SModalSection>
                    <SAvatarPicker
                        title="Logo"
                        :url="logoUrl"
                        @file-change="uploadLogo"
                    />
                    <SInput
                        v-model="association.name"
                        :modified="association.name !== associationStore.name"
                        required
                        :title="$t('components.template.modals.settings.association.name')"
                        :validators="[InputValidators.NotEmpty()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.mail"
                        :modified="association.mail !== associationStore.mail"
                        required
                        :title="$t('components.template.modals.settings.association.mail')"
                        type="email"
                        :validators="[InputValidators.Mail()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.tag"
                        :modified="association.tag !== associationStore.tag"
                        title="TAG"
                        :validators="[
                            InputValidators.Length({ min: 2, max: 4 }),
                            InputValidators.OnlyLettersAndNumbers(),
                        ]"
                        @enter="sendUpdate"
                    />
                    <SModalSectionDescription>
                        {{ $t('components.template.modals.settings.association.tagDescription') }}
                    </SModalSectionDescription>
                </SModalSection>
                <SModalSectionTitle> {{ $t('components.template.modals.settings.association.school') }} </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.school.name"
                        :modified="association.school.name !== associationStore.school.name"
                        required
                        :title="$t('components.template.modals.settings.association.schoolName')"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.school.address"
                        :modified="
                            association.school.address !== associationStore.school.address
                        "
                        :title="$t('components.template.modals.settings.association.schoolAddress')"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.school.studentsNumber"
                        :modified="
                            association.school.studentsNumber !==
                                associationStore.school.studentsNumber
                        "
                        :title="$t('components.template.modals.settings.association.studentNumber')"
                        type="number"
                        @enter="sendUpdate"
                    />
               
                    <SInput
                        v-model="association.position.latitude"
                        :max="90"
                        :min="-90"
                        :modified="
                            association.position.latitude !==
                                associationStore.position.latitude
                        "
                        :step="0.001"
                        title="Latitude"
                        type="number"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.position.longitude"
                        :max="180"
                        :min="-180"
                        :modified="
                            association.position.longitude !==
                                associationStore.position.longitude
                        "
                        :step="0.001"
                        title="Longitude"
                        type="number"
                        @enter="sendUpdate"
                    />
                </SModalSection>
                <SModalSectionTitle> {{ $t("components.template.modals.settings.association.network") }} </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.networks.facebook"
                        :modified="
                            association.networks.facebook !==
                                associationStore.networks.facebook
                        "
                        title="Facebook"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.twitter"
                        :modified="
                            association.networks.twitter !== associationStore.networks.twitter
                        "
                        title="Twitter"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.twitch"
                        :modified="
                            association.networks.twitch !== associationStore.networks.twitch
                        "
                        title="Twitch"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.instagram"
                        :modified="
                            association.networks.instagram !==
                                associationStore.networks.instagram
                        "
                        title="Instagram"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.website"
                        :modified="
                            association.networks.website !== associationStore.networks.website
                        "
                        title="Website"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.discord"
                        :modified="
                            association.networks.discord !== associationStore.networks.discord
                        "
                        title="Discord"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                </SModalSection>
                <SModalSectionTitle> {{ $t("components.template.modals.settings.association.parameters.title") }} </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.settings.slug"
                        :modified="
                            association.settings.slug !== associationStore.settings.slug
                        "
                        title="Slug"
                        :validators="[InputValidators.Slug()]"
                        @enter="sendUpdate"
                    />
                    <SModalSectionDescription>
                        {{ $t("components.template.modals.settings.association.parameters.description") }}<br><em>
                            <SCopier
                                class="copier"
                                :content="slugUrl"
                            >{{ slugUrl }}</SCopier>
                        </em>
                    </SModalSectionDescription>
                    <SInputCopier
                        :content="association.settings.invitationCode"
                        :title="$t('components.template.modals.settings.association.parameters.invitation')"
                    />
                    <SModalSectionDescription>
                        {{ $t("components.template.modals.settings.association.parameters.invitationDescription") }}
                    </SModalSectionDescription>
                </SModalSection>
                <SModalSeparator />
                <SButton
                    :disabled="!hasChanged"
                    primary
                    @click="sendUpdate"
                >
                    {{ $t("components.template.modals.settings.association.save") }}
                </SButton>
                <SModalSectionTitle> Danger zone </SModalSectionTitle>
                <SModalSection>
                    <div class="buttons">
                        <SButton
                            danger
                            :disabled="associationStore.users.members.length === 1"
                            outlined
                            @click="openTransferOwnershipAssociationModal"
                        >
                            {{ $t("components.template.modals.settings.association.transfer") }}
                        </SButton>
                        <SButton
                            danger
                            :disabled="associationStore.users.members.length > 1"
                            outlined
                            @click="deleteAssociation"
                        >
                            {{ $t("components.template.modals.settings.association.delete") }}
                        </SButton>
                    </div>
                    <SModalSectionDescription>
                        {{ $t("components.template.modals.settings.association.transferDescription") }}
                    </SModalSectionDescription>
                </SModalSection>
            </template>
            <template v-else>
                <div class="current">
                    <img
                        v-if="associationStore.logo"
                        alt="logo"
                        class="logo"
                        :src="logoUrl"
                    >
                    <FontAwesomeIcon
                        v-else
                        class="icon"
                        :icon="['fas', 'users']"
                    />
                    <div class="description">
                        {{ $t("components.template.modals.settings.association.notMember") }}<br>
                        <strong>{{ associationStore.name }}</strong>
                    </div>
                </div>
                <SModalSectionTitle> Danger zone </SModalSectionTitle>
                <SModalSection>
                    <SButton
                        danger
                        outlined
                        @click="leaveAssociation"
                    >
                        {{ $t("components.template.modals.settings.association.leave") }}
                    </SButton>
                </SModalSection>
            </template>
        </template>
        <template v-else-if="isCreating">
            <SModalSectionTitle>
                {{ $t("components.template.modals.settings.association.creation.title") }}
            </SModalSectionTitle>
            <SModalSection>
                <SInput
                    v-model="creation.name"
                    :title="$t('components.template.modals.settings.association.creation.name')"
                    @enter="createAssociation"
                />
                <SInput
                    v-model="creation.mail"
                    :title="$t('components.template.modals.settings.association.creation.mail')"
                    :validators="[InputValidators.Mail()]"
                    @enter="createAssociation"
                />
                <SInput
                    v-model="creation.school"
                    :title="$t('components.template.modals.settings.association.creation.school')"
                    @enter="createAssociation"
                />
            </SModalSection>
            <SModalSeparator />
            <SButton
                :disabled="!canCreate"
                primary
                @click="createAssociation"
            >
                {{ $t("components.template.modals.settings.association.creation.create") }}
            </SButton>
        </template>
        <template v-else>
            <div class="empty">
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'frown']"
                />
                <div class="description">
                    {{ $t("components.template.modals.settings.association.none") }}
                </div>
                <i18n-t
                    class="action"
                    keypath="components.template.modals.settings.association.join.base"
                    tag="div"
                >
                    <template
                        #join
                    >
                        <span
                            class="link"
                            @click="join"
                        >{{ $t("components.template.modals.settings.association.join.join") }} </span>
                    </template>
                    <template
                        #create
                    >
                        <span
                            class="link"
                            @click="startCreating"
                        >{{ $t("components.template.modals.settings.association.join.create") }}</span>
                    </template>
                </i18n-t>
            </div>
        </template>
    </SModalContent>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { cloneDeep, isMatch, merge, pick } from "lodash";
import SModalContent from "@/components/design/modal/SModalContent.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import { Association, State, User } from "@/modules";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SInput from "@/components/design/forms/SInput.vue";
import SModalSeparator from "@/components/design/modal/SModalSeparator.vue";
import SButton from "@/components/design/forms/SButton.vue";
import * as InputValidators from "@/utils/validators";
import SAvatarPicker from "@/components/design/forms/SAvatarPicker.vue";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";
import SCopier from "@/components/design/forms/SCopier.vue";
import SInputCopier from "@/components/design/forms/SInputCopier.vue";

const associationStore = Association.useStore();
const userStore = User.useStore();
const stateStore = State.useStore();
const router = useRouter();
const isCreating = ref(false);

const association = reactive(
    cloneDeep(
        pick(associationStore.$state, [
            "_id",
            "mail",
            "name",
            "school",
            "position",
            "networks",
            "tag",
            "settings",
            "logo"
        ])
    )
) as Partial<Association.TAssociation>;

watch(
    () => associationStore.$state,
    () => {
        merge(
            association,
            cloneDeep(
                pick(associationStore.$state, [
                    "_id",
                    "mail",
                    "name",
                    "school",
                    "position",
                    "networks",
                    "tag",
                    "settings",
                    "logo"
                ])
            )
        );
    },
    { deep: true }
);

const join = async () => {
    await router.push("/federation");
    stateStore.modalClose();
};

const startCreating = () => {
    isCreating.value = true;
};

const creation = reactive({
    name: ref(""),
    mail: ref(""),
    school: ref("")
});

const canCreate = computed(() => {
    return creation.name && creation.mail && creation.school;
});

const createAssociation = async () => {
    if (!canCreate.value) {
        return;
    }

    await associationStore.create({
        name: creation.name,
        mail: creation.mail,
        school: creation.school
    });
};

const deleteAssociation = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer l'association ?")) {
        await associationStore.delete();
    }
};
const openTransferOwnershipAssociationModal = async () => {
    const targetOwnership = prompt(
        "Entrez l'email de l'utilisateur à qui transférer cette association (cet utilisateur doit être membre de l'association)"
    );

    if (!targetOwnership) {
        return;
    }

    if (
        !confirm(
            `Êtes-vous sûr de vouloir transférer l'association à ${ targetOwnership } ?`
        )
    ) {
        return;
    }

    await associationStore.transferOwnership(targetOwnership);
};

const leaveAssociation = async () => {
    if (confirm("Êtes-vous sûr de vouloir quitter l'association ?")) {
        await associationStore.leave();
    }
};

const uploadLogo = async (file: File) => {
    await associationStore.uploadLogo(file);
};

const logoUrl = computed(() => {
    return associationStore.logo ? associationStore.getLogoUrl : "";
});

const hasChanged = computed(() => {
    return !isMatch(associationStore.$state, association);
});

const sendUpdate = async () => {
    if (!hasChanged.value) {
        return;
    }
    await associationStore.update(association);
};

const slugUrl = computed(() => {
    return `${ window.location.origin }/association/${
        association.settings?.slug || "{votre slug}"
    }`;
});

const invitationCode = computed(() => {
    return `${ window.location.origin }/association/${
        association.settings?.slug || association._id
    }/join/${ association.settings?.invitationCode || "" }`;
});

const isOwner = computed(() => {
    return associationStore.users.owner === userStore._id;
});

</script>

<style scoped lang="scss">
.association {
  .buttons {
    display: flex;
    gap: var(--length-gap-m);
  }

  .copier:hover {
    color: var(--color-primary-lite);
  }

  .empty,
  .current {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: var(--length-gap-m);
    margin-top: var(--length-margin-l);

    .icon {
      width: 64px;
      height: 64px;
      color: var(--color-content-litest);
    }

    .logo {
      width: 192px;
      height: 192px;
      object-fit: contain;
    }

    .description {
      text-align: center;
      color: var(--color-content-liter);

      strong {
        color: var(--color-content);
        font-weight: 600;
      }
    }

    .action {
      text-align: center;
      font-size: 0.8rem;
      color: var(--color-content-liter);

      .link {
        color: var(--color-content);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
