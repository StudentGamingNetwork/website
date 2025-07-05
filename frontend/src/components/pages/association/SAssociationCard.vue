<template>
    <SCard class="association-card">
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
        <div class="head">
            <span
                v-if="association.tag"
                class="tag"
            >{{ association.tag }}</span>
            <h2>{{ association.name }}</h2>
            <div class="region">
                {{ regionName }}
            </div>
        </div>
        <div class="school">
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'school']"
                    /> {{ association.school.name }}
                </li>
                <li v-if="association.school.address">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'map-marker']"
                    /> {{ association.school.address }}
                </li>
                <li v-if="association.school.studentsNumber">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'user-graduate']"
                    /> {{ $t("components.pages.association.studentNumber", Number(association.school.studentsNumber)) }}
                </li>
            </ul>
        </div>
        <div
            v-if="association.users?.owner"
            class="owner"
        >
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'user']"
                    /> {{ association.users.owner.username }}
                    <template v-if="association.users.owner.student.name">
                        ({{ association.users.owner.student.name }})
                    </template>
                </li>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'envelope']"
                    /> {{ association.users.owner.mail }}
                </li>
                <li v-if="association.users.owner.platforms?.discord">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fab', 'discord']"
                    /> {{ association.users.owner.platforms.discord }}
                </li>
            </ul>
        </div>
        <div
            v-if="association.networks"
            class="networks"
        >
            <a
                v-if="association.networks.discord"
                :href="association.networks.discord"
                target="_blank"
                title="Discord"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fab', 'discord']"
                />
            </a>
            <a
                v-if="association.networks.facebook"
                :href="association.networks.facebook"
                target="_blank"
                title="Facebook"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fab', 'facebook']"
                />
            </a>
            <a
                v-if="association.networks.twitter"
                :href="association.networks.twitter"
                target="_blank"
                title="Twitter"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fab', 'twitter']"
                />
            </a>
            <a
                v-if="association.networks.twitch"
                :href="association.networks.twitch"
                target="_blank"
                title="Twitch"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fab', 'twitch']"
                />
            </a>
            <a
                v-if="association.networks.instagram"
                :href="association.networks.instagram"
                target="_blank"
                title="Instagram"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fab', 'instagram']"
                />
            </a>
            <a
                v-if="association.networks.website"
                :href="association.networks.website"
                target="_blank"
                title="website"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'globe']"
                />
            </a>
        </div>
        <SMap
            v-if="association.position && association.position.latitude !== 0 && association.position.longitude !== 0"
            :center="[association.position.latitude, association.position.longitude]"
            class="map"
            :dragging="false"
            :keybord="false"
            :max-zoom="19"
            :scroll-wheel-zoom="'center'"
            :zoom-control="false"
            @map="defineMap"
        />
    </SCard>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useLeafletDisplayLayer, useLeafletDivIcon, useLeafletIcon, UseLeafletMapReturn, useLeafletMarker } from "vue-use-leaflet";
import { Association } from "@/modules";
import * as AssociationService from "@/services/association";
import SCard from "@/components/design/SCard.vue";
import SMap from "@/components/design/SMap.vue";

const props = defineProps<{
    association: Association.TAssociation;
}>();

 
const logoUrl = computed(() => {
    return AssociationService.getLogoUrl({ id: props.association._id, logo: props.association.logo });
});
const regionName = computed(() => {
    return AssociationService.getRegionName(props.association.federation.region);
});

function defineMap(map: UseLeafletMapReturn) {
    if (!props.association.position) return;
    const marker = useLeafletMarker([props.association.position.latitude, props.association.position.longitude],{
        draggable: false,
        icon: createIcon()
    });
    useLeafletDisplayLayer(map, marker);
}

function createIcon() {
    if (!props.association.logo){
        return useLeafletDivIcon(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
            {
                className: "leaflet-default-marker",
                iconAnchor: [13, 13],
                iconSize: [26, 26]
            }
        );
    }

    return useLeafletIcon(
        AssociationService.getLogoUrl({
            id: props.association._id,
            logo: props.association.logo
        }),
        {
            className: "leaflet-logo-border",
            iconSize: [30, 30]
        }
    );
}

</script>

<style scoped lang="css">
.association-card {
    max-width: 1200px;
    margin: auto;
    display: grid;
    column-gap: var(--length-gap-l);
    row-gap: var(--length-gap-m);
    grid-template-columns: 192px 1fr 1fr;
    grid-template-areas:
        "logo head head map"
        "logo school owner map"
        "logo networks networks map";

    .logo {
        grid-area: logo;
        width: 192px;
        height: 192px;
        object-fit: contain;
    }

    .map {
        grid-area: map;
        width: 192px;
        height: 192px;
        object-fit: contain;
    }

    .empty-logo {
        grid-area: logo;
        width: 192px;
        height: 192px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: var(--color-content-litest);
            width: 96px;
            height: 96px;
        }
    }

    .head {
        grid-area: head;
        display: flex;
        gap: var(--length-gap-s);
        padding-top: var(--length-padding-m);
        padding-right: var(--length-padding-m);

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

        .tag {
            font-size: 1.5rem;
            font-weight: 600;

            &::before {
                content: "[";
                color: var(--color-content-softer);
            }

            &::after {
                content: "]";
                color: var(--color-content-softer);
            }
        }

        .region {
            flex-grow: 1;
            text-align: right;
            text-transform: uppercase;
            font-size: 0.8rem;
            font-weight: 200;
            color: var(--color-content-softer);
        }
    }

    .school {
        grid-area: school;
    }

    .owner {
        grid-area: owner;
    }

    .school ul, .owner ul {
        margin: 0;
        padding: 0;
        font-size: 0.9rem;

        li {
            list-style: none;
            color: var(--color-content-softer);

            .icon {
                width: 16px;
                height: 16px;
            }

            .copier:hover {
                color: var(--color-primary-lite);
            }
        }
    }

    .networks {
        grid-area: networks;
        display: flex;
        gap: var(--length-gap-s);
        justify-content: right;
        align-items: flex-end;
        color: var(--color-content-litest);
        padding-right: var(--length-padding-m);
        padding-bottom: var(--length-padding-xs);

        a:hover {
            color: var(--color-primary-liter);
        }

        .icon {
            width: 24px;
            height: 24px;
        }
    }
}
</style>

<style lang="css">
.leaflet-logo-border {
    object-fit: cover;
    background-color: var(--color-primary);
    border: 2px solid var(--color-content-softer);
    border-radius: 50%;
}


.leaflet-default-marker {
    fill: var(--color-primary);
    svg {
        filter: drop-shadow(1px 1px 1px var(--color-background-0));
    }       
}
</style>
