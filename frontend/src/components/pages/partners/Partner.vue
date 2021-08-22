<template>
    <div
        class="partner"
        :class="{mirrored}"
    >
        <img
            :alt="title"
            class="logo"
            :src="logo"
        >
        <div class="description">
            <div class="title">
                <SSectionTitle>
                    {{ title }}
                </SSectionTitle>
                <FontAwesomeIcon
                    v-if="userStore.hasPartnersRight"
                    class="edit"
                    :icon="['fas', 'edit']"
                    title="Modifier"
                    @click="editPartner"
                />
            </div>
            <p>
                <slot />
            </p>
            <div class="networks">
                <FontAwesomeIcon
                    class="network"
                    :icon="['fas','globe']"
                    title="Site internet"
                />
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','facebook']"
                    title="Facebook"
                />
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','twitter']"
                    title="Twitter"
                />
            </div>
        </div>
        <SCard
            v-if="isEditing"
            class="edit-card"
        >
            <div class="head">
                <SAvatarPicker
                    title="Logo"
                    :url="logo"
                />
                <SInput title="Nom du partenaire" />
                <SButton
                    outlined
                >
                    Rendre public
                </SButton>
                <SButton
                    danger
                    outlined
                >
                    Supprimer
                </SButton>
            </div>
            <STextarea
                class="textarea"
                title="Description"
            />
            <SButton
                class="button"
                disabled
                primary
            >
                Sauvegarder
            </SButton>
        </SCard>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import { User } from "@/modules";
import SCard from "@/components/design/Card.vue";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";
import SInput from "@/components/design/forms/Input.vue";
import STextarea from "@/components/design/forms/Textarea.vue";
import SButton from "@/components/design/forms/Button.vue";

export default defineComponent({
    name: "SPartner",
    components: { FontAwesomeIcon, SAvatarPicker, SButton, SCard, SInput, SSectionTitle, STextarea },
    props: {
        title: {
            required: true,
            type: String
        },
        logo: {
            required: true,
            type: String
        },
        mirrored: {
            default: false,
            type: Boolean
        }
    },
    setup(props) {
        const userStore = User.useStore();
        const isEditing = ref(false);

        function deletePartner() {
            if (confirm(`Voulez-vous vraiment supprimer le partenaire "${ props.title }" ?`)) {

            }
        }

        function editPartner() {
            isEditing.value = true;
        }

        return {
            deletePartner,
            editPartner,
            isEditing,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.partner {
    display: grid;
    column-gap: 96px;
    row-gap: var(--length-gap-m);
    grid-template-columns: 256px 1fr;
    grid-template-areas:
        "logo description"
        "edit edit";

    @media (max-width: 1099px) {
        flex-direction: column;
        gap: var(--length-gap-xl);
        align-items: center;
    }

    &.mirrored {
        grid-template-columns: 1fr 256px;
        grid-template-areas:
        "description logo"
        "edit edit";

        @media (max-width: 1099px) {
            flex-direction: column;
        }
    }

    .logo {
        height: 128px;
        width: 256px;
        object-fit: contain;
        grid-area: logo;

        @media (max-width: 1099px) {
            height: 64px;
            width: 128px;
        }
    }

    .title {
        display: flex;
        align-items: center;
        gap: var(--length-gap-s);

        .edit {
            opacity: 0;
            width: 24px;
            height: 24px;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
    }

    .description {
        grid-area: description;
    }

    .edit-card {
        grid-area: edit;
        padding: var(--length-padding-m);
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);
        align-items: flex-start;

        .head {
            display: flex;
            gap: var(--length-gap-m);
            align-items: flex-end;
        }

        .textarea {
            width: 100%;
        }
    }

    &:hover {
        .edit {
            opacity: 0.5;
        }
    }

    .networks {
        font-size: 1.2rem;
        display: flex;
        gap: var(--length-gap-m);

        .network {
            opacity: 0.5;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
    }
}
</style>
