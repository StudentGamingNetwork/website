<template>
    <SModalContent class="association">
        <template
            v-if="associationStore._id"
            class="details"
        >
            <template v-if="isOwner">
                <SModalSectionTitle>
                    Profil de l'association
                </SModalSectionTitle>
                <SModalSection>
                    <SAvatarPicker
                        title="Logo"
                        :url="logoUrl"
                        @fileChange="uploadLogo"
                    />
                    <SInput
                        v-model="association.name"
                        :modified="association.name !== associationStore.name"
                        required
                        title="Nom"
                        :validators="[InputValidators.NotEmpty()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.mail"
                        :modified="association.mail !== associationStore.mail"
                        required
                        title="Mail"
                        type="email"
                        :validators="[InputValidators.Mail()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.tag"
                        :modified="association.tag !== associationStore.tag"
                        title="TAG"
                        :validators="[InputValidators.Length({min:3, max:4}), InputValidators.OnlyLettersAndNumbers()]"
                        @enter="sendUpdate"
                    />
                    <SModalSectionDescription>
                        Le tag de votre association sera visible devant les pseudos de vos membres participants à des
                        tournois.
                    </SModalSectionDescription>
                </SModalSection>
                <SModalSectionTitle>
                    École
                </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.school.name"
                        :modified="association.school.name !== associationStore.school.name"
                        required
                        title="Nom de l'école"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.school.address"
                        :modified="association.school.address !== associationStore.school.address"
                        title="Adresse de l'école"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.school.studentsNumber"
                        :modified="association.school.studentsNumber !== associationStore.school.studentsNumber"
                        title="Nombre d'étudiants de l'école"
                        type="number"
                        @enter="sendUpdate"
                    />
                </SModalSection>
                <SModalSectionTitle>
                    Réseaux
                </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.networks.facebook"
                        :modified="association.networks.facebook !== associationStore.networks.facebook"
                        title="Facebook"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.twitter"
                        :modified="association.networks.twitter !== associationStore.networks.twitter"
                        title="Twitter"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.twitch"
                        :modified="association.networks.twitch !== associationStore.networks.twitch"
                        title="Twitch"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                    <SInput
                        v-model="association.networks.instagram"
                        :modified="association.networks.instagram !== associationStore.networks.instagram"
                        title="Instagram"
                        type="url"
                        :validators="[InputValidators.Url()]"
                        @enter="sendUpdate"
                    />
                </SModalSection>
                <SModalSectionTitle>
                    Paramètres
                </SModalSectionTitle>
                <SModalSection>
                    <SInput
                        v-model="association.settings.slug"
                        :modified="association.settings.slug !== associationStore.settings.slug"
                        title="Slug"
                        :validators="[InputValidators.OnlyLettersAndDashes()]"
                        @enter="sendUpdate"
                    />
                    <SModalSectionDescription>
                        Le slug est l'identifiant unique de votre association. Votre page d'association sera disponible à
                        cette adresse :<br><em><SCopier
                            class="copier"
                            :content="slugUrl"
                        >{{ slugUrl }}</SCopier></em>
                    </SModalSectionDescription>

                    <SModalSectionDescription>
                        <strong><SCopier :content="invitationCode">Cliquez ici pour copier votre lien d'invitation</SCopier></strong><br>
                        Vous devez partager ce lien aux membres qui souhaitent rejoindre votre association.
                    </SModalSectionDescription>
                </SModalSection>
                <SModalSeparator />
                <SButton
                    :disabled="!hasChanged"
                    primary
                    @click="sendUpdate"
                >
                    Sauvegarder les changements
                </SButton>
                <SModalSectionTitle>
                    Danger zone
                </SModalSectionTitle>
                <SModalSection>
                    <div class="buttons">
                        <SButton
                            danger
                            disabled
                            outlined
                        >
                            Céder l'association
                        </SButton>
                        <SButton
                            danger
                            :disabled="associationStore.users.members.length > 1"
                            outlined
                            @click="deleteAssociation"
                        >
                            Supprimer l'association
                        </SButton>
                    </div>
                    <SModalSectionDescription>
                        Il est préférable de céder l'association à quelqu'un plutôt que de la supprimer.
                        Vous ne pouvez supprimer l'association que si vous êtes seul dans celle-ci, sinon contactez votre responsable de région SGN.
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
                        :icon="['fas','users']"
                    />
                    <div class="description">
                        Vous faites partie de l'association<br>
                        <strong>{{ associationStore.name }}</strong>
                    </div>
                </div>
                <SModalSectionTitle>
                    Danger zone
                </SModalSectionTitle>
                <SModalSection>
                    <SButton
                        danger
                        outlined
                        @click="leaveAssociation"
                    >
                        Quitter l'association
                    </SButton>
                </SModalSection>
            </template>
        </template>
        <template v-else-if="isCreating">
            <SModalSectionTitle>
                Création d'une nouvelle association
            </SModalSectionTitle>
            <SModalSection>
                <SInput
                    v-model="creation.name"
                    title="Nom de l'association"
                    @enter="createAssociation"
                />
                <SInput
                    v-model="creation.mail"
                    title="Mail de l'association"
                    :validators="[InputValidators.Mail()]"
                    @enter="createAssociation"
                />
                <SInput
                    v-model="creation.school"
                    title="Nom de l'école"
                    @enter="createAssociation"
                />
            </SModalSection>
            <SModalSeparator />
            <SButton
                :disabled="!canCreate"
                primary
                @click="createAssociation"
            >
                Créer l'association
            </SButton>
        </template>
        <template v-else>
            <div class="empty">
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas','frown']"
                />
                <div class="description">
                    Vous n'êtes dans aucune association...
                </div>
                <div class="action">
                    Vous pouvez <span
                        class="link"
                        @click="join"
                    >rejoindre la vôtre</span><br>(en demandant le lien d'invitation à son responsable)<br>ou en <span
                        class="link"
                        @click="startCreating"
                    >créer une</span> si vous la représentez.
                </div>
            </div>
        </template>
    </SModalContent>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { cloneDeep, isMatch, merge, pick } from "lodash";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import { Association, State, User } from "@/modules";
import SModalSection from "@/components/design/modal/Section.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SButton from "@/components/design/forms/Button.vue";
import * as InputValidators from "@/utils/validators";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import SCopier from "@/components/design/forms/Copier.vue";

export default defineComponent({
    name: "SAssociation",
    components: {
        FontAwesomeIcon,
        SAvatarPicker,
        SButton,
        SCopier,
        SInput,
        SModalContent,
        SModalSection,
        SModalSectionDescription,
        SModalSectionTitle,
        SModalSeparator
    },
    setup() {
        const associationStore = Association.useStore();
        const userStore = User.useStore();
        const stateStore = State.useStore();
        const router = useRouter();
        const isCreating = ref(false);

        const association = reactive(cloneDeep(pick(
            associationStore.$state,
            ["_id", "mail", "name", "school", "networks", "tag", "settings", "logo"]
        ))) as Partial<Association.TAssociation>;

        watch(
            () => associationStore.$state,
            () => {
                merge(association, cloneDeep(pick(
                    associationStore.$state,
                    ["_id", "mail", "name", "school", "networks", "tag", "settings", "logo"]
                )));
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

        const deleteAssociation = async() => {
            if (confirm("Êtes-vous sûr de vouloir supprimer l'association ?")) {
                await associationStore.delete();
            }
        };

        const leaveAssociation = async() => {
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
            return `${ window.location.origin }/association/${ association.settings?.slug || "{votre slug}" }`;
        });

        const invitationCode = computed(() => {
            return `${ window.location.origin }/association/${ association.settings?.slug || association._id }/join/${ association.settings?.invitationCode || "" }`;
        });

        const isOwner = computed(() => {
            return associationStore.users.owner === userStore._id;
        });

        return {
            association,
            associationStore,
            canCreate,
            createAssociation,
            creation,
            deleteAssociation,
            hasChanged,
            InputValidators,
            invitationCode,
            isCreating,
            isOwner,
            join,
            leaveAssociation,
            logoUrl,
            sendUpdate,
            slugUrl,
            startCreating,
            uploadLogo
        };
    }
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

    .empty, .current {
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
