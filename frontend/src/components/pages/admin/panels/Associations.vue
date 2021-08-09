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
                <div class="chip validated">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'check']"
                    /> Validée
                </div>
            </div>
            <div class="school">
                {{ association.school.name }}
                <span
                    v-if="association.school.studentsNumber"
                    class="students-number"
                >({{ association.school.studentsNumber }} étudiants)</span>
            </div>
            <div class="region">
                {{ getRegionName(association.federation.region) }}
            </div>
            <div class="owner">
                <FontAwesomeIcon :icon="['fas', 'address-book']" /> {{ association.users.owner.username }}
                <span
                    v-if="association.users.owner.name"
                    class="owner-name"
                >({{ association.users.owner.name }})</span>
            </div>
            <div class="networks">
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
import { debounce } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import * as AdminService from "@/services/admin";
import * as AssociationService from "@/services/association";
import SCard from "@/components/design/Card.vue";

type TAdminAssociation = {
    _id: string;
    name: string;
    federation: {
        region: string;
        state: string;
    };
    logo: string;
    networks: {
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
    };
    school: {
        name: string;
        studentsNumber: string;
    };
    users: {
        owner: {
            name: string;
            username: string;
        };
    };
}

export default defineComponent({
    name: "SAdminPanelAssociations",
    components: { FontAwesomeIcon, SCard, SInput },
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

        onMounted(async () => {
            await updateSearch();
        });

        return {
            associations,
            getLogoUrl: AssociationService.getLogoUrl,
            getRegionName: AssociationService.getRegionName,
            isSearching,
            searchInput
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
        grid-template-columns: 96px 2fr 1fr;
        grid-template-areas:
        "logo name status"
        "logo school region"
        "logo owner networks";
        padding-right: var(--length-padding-s);

        .logo {
            grid-area: logo;
            height: 96px;
            width: 96px;
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

                &.validated {
                    background: var(--color-success-background);
                    color: var(--color-success-content);
                    border: 1px solid var(--color-success);
                }
            }
        }

        .school {
            grid-area: school;
            text-transform: uppercase;
            font-weight: 400;
            color: var(--color-content-softer);

            .students-number {
                font-size: 0.8rem;
            }
        }

        .region {
            text-align: right;
            grid-area: region;
            font-size: 0.9rem;
            color: var(--color-content-soft);
        }

        .owner {
            grid-area: owner;
            font-size: 0.9rem;
            color: var(--color-content-soft);
        }

        .networks {
            text-align: right;
            grid-area: networks;
            display: flex;
            gap: var(--length-gap-s);
            justify-content: right;
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
