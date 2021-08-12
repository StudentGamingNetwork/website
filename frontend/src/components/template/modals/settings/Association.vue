<template>
    <SModalContent class="association">
        <template
            v-if="associationStore._id"
            class="details"
        >
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
                    @enter="sendUpdate"
                />
                <SModalSectionDescription>
                    Le slug est l'identifiant unique de votre association. Votre page d'association sera disponible à
                    cette adresse :<br><em>https://sgnw.fr/association/{votre slug}</em>
                </SModalSectionDescription>
                <SInput
                    disabled
                    model-value="https://sgnw.fr/"
                    title="Lien d'invitation"
                />
                <SModalSectionDescription>
                    Vous devez partager ce lien aux membres qui souhaitent rejoindre votre association.
                </SModalSectionDescription>
            </SModalSection>
            <SModalSeparator />
            <div class="buttons">
                <SButton
                    :disabled="!hasChanged"
                    primary
                    @click="sendUpdate"
                >
                    Sauvegarder
                </SButton>
                <SButton
                    danger
                    outlined
                >
                    Céder l'association
                </SButton>
            </div>
        </template>
        <template v-else-if="isCreating">
            <SModalSectionTitle>
                Création d'une nouvelle association
            </SModalSectionTitle>
            <SModalSection>
                <SInput
                    v-model="creation.name"
                    title="Nom de l'association"
                    @enter="create"
                />
                <SInput
                    v-model="creation.mail"
                    title="Mail de l'association"
                    @enter="create"
                />
                <SInput
                    v-model="creation.school"
                    title="Nom de l'école"
                    @enter="create"
                />
            </SModalSection>
            <SModalSeparator />
            <SButton
                :disabled="!canCreate"
                primary
                @click="create"
            >
                Créer l'association
            </SButton>
        </template>
        <div
            v-else
            class="empty"
        >
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
                >rejoindre la vôtre</span> (sur la page Fédération)<br>ou en <span
                    class="link"
                    @click="startCreating"
                >créer une</span> si vous la représentez.
            </div>
        </div>
    </SModalContent>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { cloneDeep, isMatch, merge, pick } from "lodash";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import { Association, State } from "@/modules";
import SModalSection from "@/components/design/modal/Section.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SButton from "@/components/design/forms/Button.vue";
import * as InputValidators from "@/utils/validators";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";

export default defineComponent({
    name: "SAssociation",
    components: {
        FontAwesomeIcon,
        SAvatarPicker,
        SButton,
        SInput,
        SModalContent,
        SModalSection,
        SModalSectionDescription,
        SModalSectionTitle,
        SModalSeparator
    },
    setup() {
        const associationStore = Association.useStore();
        const stateStore = State.useStore();
        const router = useRouter();
        const isCreating = ref(false);

        const association = reactive(cloneDeep(pick(
            associationStore.$state,
            ["_id", "mail", "name", "school", "networks", "tag", "settings", "logo"]
        ))) as Association.TAssociation;

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

        const join = () => {
            router.push("/federation");
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

        const create = async () => {
            if (!canCreate.value) {
                return;
            }

            await associationStore.create({
                name: creation.name,
                mail: creation.mail,
                school: creation.school
            });
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

        return {
            association,
            associationStore,
            canCreate,
            create,
            creation,
            hasChanged,
            InputValidators,
            isCreating,
            join,
            logoUrl,
            sendUpdate,
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

    .empty {
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

        .description {
            text-align: center;
            color: var(--color-content-liter);
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
