<template>
    <div
        class="partner"
        :class="{mirrored}"
    >
        <img
            :alt="title"
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
                />
                <FontAwesomeIcon
                    v-if="userStore.hasPartnersRight"
                    class="edit"
                    :icon="['fas', 'times']"
                    title="Supprimer"
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import { User } from "@/modules";

export default defineComponent({
    name: "SPartner",
    components: { FontAwesomeIcon, SSectionTitle },
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
    setup() {
        const userStore = User.useStore();

        return {
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.partner {
    display: flex;
    gap: 96px;

    @media (max-width: 1099px) {
        flex-direction: column;
        gap: var(--length-gap-xl);
        align-items: center;
    }

    &.mirrored {
        flex-direction: row-reverse;

        @media (max-width: 1099px) {
            flex-direction: column;
        }
    }

    img {
        height: 128px;
        width: 256px;
        object-fit: contain;

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
