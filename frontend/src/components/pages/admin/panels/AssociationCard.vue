<template>
    <SCard
        class="association"
        @click="$router.push('/association/'+ (association.settings?.slug ? association.settings.slug : association._id))"
    >
        <div class="logo">
            <img
                v-if="association.logo"
                alt="logo"
                :src="getLogoUrl({id:association._id, logo:association.logo})"
            >
            <FontAwesomeIcon
                v-else
                class="icon"
                :icon="['fas', 'users']"
            />
        </div>
        <div class="name">
            {{ association.name }}
        </div>
        <div class="status">
            <div
                v-if="association.federation.isValidated"
                class="chip validated"
                @click.stop="updateAssociation({isValidated: false})"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'check']"
                />
                Validée
            </div>
            <div
                v-else
                class="chip verification"
                @click.stop="updateAssociation({isValidated: true})"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'eye']"
                />
                Vérification
            </div>
        </div>
        <div class="school">
            {{ association.school.name }}
            <span
                v-if="association.school.studentsNumber"
                class="students-number"
            >({{ association.school.studentsNumber }} étudiants)</span>
        </div>
        <div class="info">
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'envelope']"
                    />
                    <SCopier
                        class="copier"
                        :content="association.mail"
                    >
                        {{ association.mail }}
                    </SCopier>
                </li>
                <li v-if="association.school.address">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'map-marker']"
                    />
                    <SCopier
                        class="copier"
                        :content="association.school.address"
                    >
                        {{ association.school.address }}
                    </SCopier>
                </li>
            </ul>
        </div>
        <div class="region">
            <SSmallDropdown
                :model-value="association.federation.region"
                :options="regionNames"
                @update:modelValue="updateAssociation({ region: $event })"
            />
        </div>
        <div class="owner">
            {{ association.users.owner.username }}
            <span
                v-if="association.users.owner.name"
                class="name"
            >({{ association.users.owner.name }})</span>
        </div>
        <div class="owner-info">
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'envelope']"
                    />
                    <SCopier
                        class="copier"
                        :content="association.users.owner.mail"
                    >
                        {{ association.users.owner.mail }}
                    </SCopier>
                </li>
                <li v-if="association.users.owner.platforms.discord">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fab', 'discord']"
                    />
                    <SCopier
                        class="copier"
                        :content="association.users.owner.platforms.discord"
                    >
                        {{ association.users.owner.platforms.discord }}
                    </SCopier>
                </li>
            </ul>
        </div>
        <div
            v-if="association.networks"
            class="networks"
        >
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
                title="Website"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'globe']"
                />
            </a>
        </div>
    </SCard>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { isUndefined } from "lodash";
import SCard from "@/components/design/Card.vue";
import * as AssociationService from "@/services/association";
import SSmallDropdown from "@/components/design/forms/SmallDropdown.vue";
import SCopier from "@/components/design/forms/Copier.vue";
import { Toast } from "@/modules";
import * as AdminService from "@/services/admin";

export type TAdminAssociation = {
    _id: string;
    name: string;
    federation: {
        isValidated: boolean;
        region: string;
    };
    logo: string;
    mail: string;
    networks: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
        website: string;
    };
    school: {
        name: string;
        address: string;
        studentsNumber: string;
    };
    settings: {
        slug: string;
    };
    users: {
        owner: {
            name: string;
            mail: string;
            platforms: {
                discord: string;
            };
            username: string;
        };
    };
}

export default defineComponent({
    name: "SAdminAssociationCard",
    components: { FontAwesomeIcon, SCard, SCopier, SSmallDropdown },
    props: {
        modelValue: {
            required: true,
            type: Object as PropType<TAdminAssociation>
        }
    },
    setup(props) {
        const association = ref(props.modelValue);

        async function updateAssociation({ isValidated, region }: { isValidated?: boolean; region?: string }) {
            const response = await Toast.testRequest(async () => {
                return AdminService.associationUpdate({
                    _id: association.value._id,
                    isValidated,
                    region
                });
            });

            if (response?.success) {
                if (!isUndefined(isValidated)) {
                    association.value.federation.isValidated = isValidated;
                }
                if (region) {
                    association.value.federation.region = region;
                }
            }
        }

        return {
            association,
            getLogoUrl: AssociationService.getLogoUrl,
            regionNames: AssociationService.regionNames,
            updateAssociation
        };
    }
});
</script>

<style scoped lang="scss">
.association {
    display: grid;
    column-gap: var(--length-gap-m);
    grid-template-columns: 112px 1fr 1fr minmax(0, 0.75fr);
    grid-template-areas:
        "logo name name status"
        "logo school owner region"
        "logo info owner-info networks";
    padding-right: var(--length-padding-s);
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.25);
    }

    .logo {
        grid-area: logo;
        height: 112px;
        width: 112px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .icon {
            width: 48px;
            height: 48px;
            color: var(--color-content-litest);
        }
    }

    .name {
        grid-area: name;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .status {
        grid-area: status;
        text-align: right;

        .chip {
            font-size: 0.7rem;
            border-radius: var(--lenght-radius-base);
            padding: 0 var(--length-padding-xxs);
            display: inline-block;
            opacity: 0.75;

            &:hover {
                cursor: pointer;
                opacity: 1;
            }

            &.verification {
                background: var(--color-warning-background);
                color: var(--color-warning-content);
                border: 1px solid var(--color-warning);
            }

            &.validated {
                background: var(--color-success-background);
                color: var(--color-success-content);
                border: 1px solid var(--color-success);
            }
        }
    }

    .school {
        grid-area: school;
        font-size: 0.9rem;
        text-transform: uppercase;
        font-weight: 400;
        color: var(--color-content-soft);

        .students-number {
            text-transform: none;
            font-weight: 600;
            font-size: 0.7rem;
        }
    }

    .info {
        grid-area: info;
        font-size: 0.8rem;
    }

    .owner-info {
        grid-area: owner-info;
        font-size: 0.8rem;
    }

    .info ul, .owner-info ul {
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            color: var(--color-content-softer);
            display: flex;
            gap: var(--length-gap-s);
            align-items: center;

            .icon {
                width: 12px;
                height: 12px;
            }

            .copier:hover {
                color: var(--color-primary-lite);
            }
        }
    }

    .region {
        grid-area: region;
        font-size: 0.9rem;
        color: var(--color-content-soft);
    }

    .owner {
        grid-area: owner;
        font-size: 0.9rem;
        color: var(--color-content-soft);

        .name {
            font-size: 0.7rem;
        }
    }

    .networks {
        grid-area: networks;
        display: flex;
        gap: var(--length-gap-s);
        justify-content: right;
        align-items: flex-end;
        color: var(--color-content-litest);

        a:hover {
            color: var(--color-primary-liter);
        }

        .icon {
            width: 16px;
            height: 16px;
        }
    }
}
</style>
