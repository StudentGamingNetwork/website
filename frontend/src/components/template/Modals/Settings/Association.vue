<template>
    <SModalContent class="association">
        <template
            v-if="userStore.association"
            class="details"
        >
            <SModalSectionTitle>
                Profil de l'association
            </SModalSectionTitle>
            <SModalSection>
                <SInput title="Nom" />
                <SInput title="Mail" />
                <SInput title="TAG" />
            </SModalSection>
            <SModalSectionTitle>
                École
            </SModalSectionTitle>
            <SModalSection>
                <SInput title="Nom de l'école" />
                <SInput title="Nombre d'étudiant de l'école" />
            </SModalSection>
            <SModalSectionTitle>
                Réseaux
            </SModalSectionTitle>
            <SModalSection>
                <SInput title="Facebook" />
                <SInput title="Twitter" />
                <SInput title="Twitch" />
                <SInput title="Instagram" />
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
import SModalContent from "@/components/design/Modal/Content.vue";
import SModalSectionTitle from "@/components/design/Modal/SectionTitle.vue";
import { User, State } from "@/modules";
import SModalSection from "@/components/design/Modal/Section.vue";
import SInput from "@/components/design/Forms/Input.vue";
import SModalSeparator from "@/components/design/Modal/Separator.vue";
import SButton from "@/components/design/Forms/Button.vue";

export default defineComponent({
    name: "SAssociation",
    components: { FontAwesomeIcon, SButton, SInput, SModalContent, SModalSection, SModalSectionTitle, SModalSeparator },
    setup() {
        const userStore = User.useStore();
        const stateStore = State.useStore();
        const router = useRouter();
        const isCreating = ref(false);

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
            await userStore.createAssociation({
                name: creation.name,
                mail: creation.mail,
                school: creation.school
            });
        };

        return {
            canCreate,
            create,
            creation,
            isCreating,
            join,
            startCreating,
            userStore
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
