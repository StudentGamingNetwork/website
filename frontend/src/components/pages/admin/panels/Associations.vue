<template>
    <div class="admin-associations">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                class="input"
                title="Chercher une association..."
            >
                <template #suffix>
                    <FontAwesomeIcon :icon="['fas','search']" />
                </template>
            </SInput>
        </div>
        <div
            v-if="isSearching"
            class="loading"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','spinner']"
                spin
            />
        </div>
        <div
            v-else-if="associations.length === 0"
            class="empty"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','frown']"
            />
            <div class="description">
                Aucune association trouvée...
            </div>
        </div>
        <SCard
            v-for="association in associations"
            v-else
            :key="association._id"
            class="association"
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
                    @click="updateAssociation({association, isValidated: false})"
                >
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'check']"
                    /> Validée
                </div>
                <div
                    v-else
                    class="chip verification"
                    @click="updateAssociation({association, isValidated: true})"
                >
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'eye']"
                    /> Vérification
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
                        /> <SCopier
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
                        /> <SCopier
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
                    @update:modelValue="updateAssociation({association, region: $event})"
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
                        /> <SCopier
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
                        /> <SCopier
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
            </div>
        </SCard>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce, isUndefined } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import * as AdminService from "@/services/admin";
import * as AssociationService from "@/services/association";
import SCard from "@/components/design/Card.vue";
import SCopier from "@/components/design/forms/Copier.vue";
import { Toast } from "@/modules";
import SSmallDropdown from "@/components/design/forms/SmallDropdown.vue";
import { regionNames } from "@/services/association";

type TAdminAssociation = {
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
    };
    school: {
        name: string;
        address: string;
        studentsNumber: string;
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
    name: "SAdminPanelAssociations",
    components: { FontAwesomeIcon, SCard, SCopier, SInput, SSmallDropdown },
    setup() {
        const searchInput = ref("");
        const isSearching = ref(true);
        const associations = ref([] as Array<TAdminAssociation>);

        const debounceSearch = debounce(updateSearch, 500);

        watch(
            () => searchInput.value,
            debounceSearch
        );

        async function updateSearch() {
            if (associations.value.length === 0) {
                isSearching.value = true;
            }
            const result = await AdminService.associationSearch({
                limit: 20,
                search: searchInput.value,
                skip: 0
            });

            associations.value = result.associations;
            isSearching.value = false;
        }

        async function updateAssociation({ association, isValidated, region }: {association: TAdminAssociation; isValidated?: boolean; region?: string }) {
            const response = await Toast.testRequest(async () => {
                return AdminService.associationUpdate({
                    _id: association._id,
                    isValidated,
                    region
                });
            });

            if (response?.success) {
                if (!isUndefined(isValidated)) {
                    association.federation.isValidated = isValidated;
                }
                if (region) {
                    association.federation.region = region;
                }
            }
        }

        onMounted(async () => {
            await updateSearch();
        });

        return {
            associations,
            getLogoUrl: AssociationService.getLogoUrl,
            isSearching,
            regionNames: AssociationService.regionNames,
            searchInput,
            updateAssociation
        };
    }
});
</script>

<style scoped lang="scss">
.admin-associations {
    margin-top: var(--length-margin-m);
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .search-input-wrapper {
        max-width: 512px;
        width: 100%;
        margin: auto;

        .input {
            width: 100%;

            &::v-deep(.input) {
                width: 100%;
            }
        }
    }

    .empty, .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: var(--length-gap-m);
        margin: var(--length-margin-l) 0;

        .icon {
            width: 64px;
            height: 64px;
            color: var(--color-content-litest);
        }

        .description {
            text-align: center;
            color: var(--color-content-liter);
        }
    }

    .association {
        display: grid;
        column-gap: var(--length-gap-m);
        grid-template-columns: 112px 1fr 1fr minmax(0, 0.75fr);
        grid-template-areas:
        "logo name name status"
        "logo school owner region"
        "logo info owner-info networks";
        padding-right: var(--length-padding-s);

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
                transition: padding-right var(--duration-fast);

                &:hover {
                    cursor: pointer;
                    padding-right: var(--length-padding-s);
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

            &:hover {
                color: var(--color-primary-liter);
            }

            .icon {
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>
