<template>
    <SCard
        class="association-card"
        @click="open"
    >
        <img
            v-if="association.logo"
            alt="association logo"
            class="logo"
            :src="logoUrl"
        >
        <div
            v-else
            class="empty-logo"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'users']"
            />
        </div>
        <div class="title">
            <h2>{{ association.name }}</h2>
        </div>
        <div class="region">
            {{ regionName }}
        </div>
        <div class="school">
            {{ association.school.name }}
        </div>
        <div class="networks">
            <a
                v-if="association.networks?.facebook"
                :href="association.networks?.facebook"
                target="_blank"
                title="Facebook"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','facebook']"
                />
            </a>

            <a
                v-if="association.networks?.twitter"
                :href="association.networks?.twitter"
                target="_blank"
                title="Twitter"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','twitter']"
                />
            </a>
            <a
                v-if="association.networks?.twitch"
                :href="association.networks?.twitch"
                target="_blank"
                title="Twitch"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','twitch']"
                />
            </a>

            <a
                v-if="association.networks?.instagram"
                :href="association.networks?.instagram"
                target="_blank"
                title="Instagram"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','instagram']"
                />
            </a>

            <a
                v-if="association.networks?.website"
                :href="association.networks?.website"
                target="_blank"
                title="website"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fas','globe']"
                />
            </a>
            <a
                v-if="association.networks?.discord"
                :href="association.networks?.discord"
                target="_blank"
                title="Discord"
                @click.stop
            >
                <FontAwesomeIcon
                    class="network"
                    :icon="['fab','discord']"
                />
            </a>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/SCard.vue";
import * as AssociationService from "@/services/association";
import router from "@/router";
import { Association } from "@/modules";


const props = defineProps<{
    association: Association.TAssociation
}>();
   
const logoUrl = computed(() => {
    return AssociationService.getLogoUrl({ id: props.association._id, logo: props.association.logo });
});

const regionName = computed(() => {
    return AssociationService.getRegionName(props.association.federation.region);
});

const open = async () => {
    const slug = props.association.settings?.slug || props.association._id;
    await router.push(`/association/${ slug }`);
};

</script>

<style scoped lang="scss">
.association-card {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-s);
    width: 256px;
    box-sizing: border-box;
    padding: var(--length-padding-m);
    cursor: pointer;
    box-shadow: 0 0 0 hsla(0,0%,0%,0);

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px hsla(0,0%,0%,0.25);
    }

    .logo {
        width: 100%;
        height: 128px;
        object-fit: contain;
    }

    .empty-logo {
        width: 100%;
        height: 128px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: var(--color-content-litest);
            width: 96px;
            height: 96px;
        }
    }

    .title {
        flex-grow: 1;

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

            &:hover {
                color: var(--color-primary);
                opacity: 1;
            }
        }
    }
}
</style>
