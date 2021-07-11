<template>
    <SCard class="association-card">
        <img
            alt="association logo"
            :src="logo"
        >
        <h2>{{ title }}</h2>
        <div class="region">
            {{ region }}
        </div>
        <div class="school">
            {{ school }}
        </div>
        <div class="networks">
            <FontAwesomeIcon
                class="network"
                :icon="['fab','facebook']"
            />
            <FontAwesomeIcon
                class="network"
                :icon="['fab','twitter']"
            />
            <FontAwesomeIcon
                class="network"
                :icon="['fab','twitch']"
            />
            <FontAwesomeIcon
                class="network"
                :icon="['fab','instagram']"
            />
        </div>
    </SCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";

export default defineComponent({
    name: "SAssociationCard",
    components: { FontAwesomeIcon, SCard },
    props: {
        title: {
            required: true,
            type: String
        },
        logo: {
            required: true,
            type: String
        },
        region: {
            required: true,
            type: String
        },
        school: {
            required: true,
            type: String
        }
    }
});
</script>

<style scoped lang="scss">
.association-card {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-s);
    width: 256px;
    box-sizing: border-box;
    padding: var(--length-padding-m);

    img {
        width: 100%;
        height: 128px;
        object-fit: contain;
        filter: grayscale(50%);
        opacity: 0.5;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        padding: 0;

        background: var(--gradient);
        display: inline-block;
        color: transparent;
        -webkit-background-clip: text;
        text-shadow: 0 0 16px var(--color-primary-lite);
    }

    .region {
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 200;
        opacity: 0.5;
    }

    .school {
        font-size: 0.8rem;
    }

    .networks {
        margin-top: var(--length-margin-s);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        gap: var(--length-gap-m);

        .network {
            opacity: 0.3;
        }
    }
}
</style>
