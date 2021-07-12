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
            <SSectionTitle>
                {{ title }}
            </SSectionTitle>
            <p>
                <slot />
            </p>
            <div class="networks">
                <FontAwesomeIcon
                    class="network"
                    :icon="['fas','globe']"
                />
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','facebook']"
                />
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','twitter']"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SSectionTitle from "@/components/design/SectionTitle.vue";

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

    .networks {
        font-size: 1.2rem;
        display: flex;
        gap: var(--length-gap-m);

        .network {
            opacity: 0.5;
        }
    }
}
</style>
