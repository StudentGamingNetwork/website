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
                <SAvatarPicker title="Logo" />
                <SInput
                    v-model="association.name"
                    :modified="association.name !== associationStore.name"
                    required
                    title="Nom"
                    :validators="[InputValidators.NotEmpty()]"
                />
                <SInput
                    v-model="association.mail"
                    :modified="association.mail !== associationStore.mail"
                    required
                    title="Mail"
                    type="email"
                />
                <SInput
                    v-model="association.tag"
                    :modified="association.tag !== associationStore.tag"
                    title="TAG"
                    :validators="[InputValidators.Length({min:3, max:4}), InputValidators.OnlyLettersAndNumbers()]"
                />
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
                />
                <SInput
                    title="Nombre d'étudiants de l'école"
                    type="number"
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
                />
                <SInput
                    v-model="association.networks.twitter"
                    :modified="association.networks.twitter !== associationStore.networks.twitter"
                    title="Twitter"
                    type="url"
                />
                <SInput
                    v-model="association.networks.twitch"
                    :modified="association.networks.twitch !== associationStore.networks.twitch"
                    title="Twitch"
                    type="url"
                />
                <SInput
                    v-model="association.networks.instagram"
                    :modified="association.networks.instagram !== associationStore.networks.instagram"
                    title="Instagram"
                    type="url"
                />
            </SModalSection>
            <SModalSeparator />
            <SButton primary>
                Sauvegarder
            </SButton>
        </template>
        <template v-else-if="isCreating">
            <SModalSectionTitle>
                Création d'une nouvelle association
            </SModalSectionTitle>
            <SModalSection>
                <SInput
                    v-model="creation.name"
                    title="Nom de l'association"
                />
                <SInput
                    v-model="creation.mail"
                    title="Mail de l'association"
                />
                <SInput
                    v-model="creation.school"
                    title="Nom de l'école"
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
import { computed, defineComponent, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { cloneDeep } from "lodash";
import SModalContent from "@/components/design/modal/Content.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import { Association, State } from "@/modules";
import SModalSection from "@/components/design/modal/Section.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalSeparator from "@/components/design/modal/Separator.vue";
import SButton from "@/components/design/forms/Button.vue";
import * as InputValidators from "@/utils/validators";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";

export default defineComponent({
    name: "SAssociation",
    components: { FontAwesomeIcon, SAvatarPicker, SButton, SInput, SModalContent, SModalSection, SModalSectionTitle, SModalSeparator },
    setup() {
        const associationStore = Association.useStore();
        const stateStore = State.useStore();
        const router = useRouter();
        const isCreating = ref(false);

        const association = reactive(cloneDeep(associationStore.$state));

        const join = () => {
            router.push("federation");
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
            await associationStore.create({
                name: creation.name,
                mail: creation.mail,
                school: creation.school
            });
        };

        return {
            association,
            associationStore,
            canCreate,
            create,
            creation,
            InputValidators,
            isCreating,
            join,
            startCreating
        };
    }
});
</script>

<style scoped lang="scss">
.association {
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
