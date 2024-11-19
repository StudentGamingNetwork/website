<template>
    <div class="search-layout">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                class="input"
                title="Chercher une association..."
            >
                <template #suffix>
                    <FontAwesomeIcon :icon="['fas', 'search']" />
                </template>
            </SInput>
            <SToggle v-model="regionDivide">
                Région
            </SToggle>
        </div>
        <div class="filter-region-wrapper">
            <SToggle
                v-for="key in Object.keys(visibleRegions)"
                :key="key"
                v-model="visibleRegions[key]"
            >
                {{ getRegionName(key) }}
            </SToggle>
        </div>
        <div
            v-if="isSearching"
            class="loading"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'spinner']"
                spin
            />
        </div>
        <div
            v-else-if="associations.length === 0"
            class="empty"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'frown']"
            />
            <div class="description">
                Aucune association trouvée...
            </div>
        </div>
        <div
            v-if="!regionDivide"
            class="search-result"
        >
            <SAssociationCard
                v-for="association in filteredAssociations"
                :key="association._id"
                :association="association"
            />
        </div>
        <div
            v-else
            class="search-result-wrapper"
        >
            <template
                v-for="(associationsEntities, region) in regionSortedAssociations"
                :key="region"
            >
                <div class="title">
                    <h2>{{ AssociationService.getRegionName(region) }}</h2>
                </div>
                <template v-if="visibleRegions[region as string]">
                    <div class="search-result">
                        <SAssociationCard
                            v-for="association in associationsEntities"
                            :key="association._id"
                            :association="association"
                        />
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed, reactive } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import SToggle from "@/components/design/SToggle.vue";
import SAssociationCard from "@/components/pages/federation/SAssociationCard.vue";
import * as AssociationService from "@/services/association";
import { TAssociation } from "@/modules/association";
import { getRegionName } from "@/services/association";

type TBasicAssociation = {
    _id: string;
    name: string;
    federation: {
        region: string;
    };
    logo: string;
    networks: {
        discord: string;
        facebook: string;
        instagram: string;
        twitch: string;
        twitter: string;
        website: string;
    };
    school: {
        name: string;
    };
};

const isSearching = ref(true);
const searchInput = ref("");
const associations = ref<Array<TBasicAssociation>>([]);
const regionDivide = ref(false);

const debounceSearch = debounce(updateSearch, 500);

const visibleRegions = reactive(Object.fromEntries(
    Object.keys(AssociationService.regionNames)
        .filter((key) => key !== "none")
        .map((key) => [key, true])
));

const filteredAssociations = computed(() => associations.value
    .filter((association) => visibleRegions[association.federation.region])
);

const regionSortedAssociations = computed(() => {
    const sorted: Record<string, Array<TAssociation>> = Object.fromEntries(
        Object.keys(AssociationService.regionNames)
            .map((key) => [key, []])
    );

    for (const association of filteredAssociations.value) {
        sorted[association.federation.region].push(association);
    }

    return Object.fromEntries(
        Object.entries(sorted)
            .filter((region) => region[1].length)
    );
});

watch(() => searchInput.value, debounceSearch);

async function updateSearch() {
    if (associations.value.length === 0) {
        isSearching.value = true;
    }
    const result = await AssociationService.search({
        limit: 128,
        search: searchInput.value,
        skip: 0
    });

    associations.value = result.associations;
    isSearching.value = false;
}

onMounted(async () => {
    await updateSearch();
});

</script>

<style scoped lang="scss">
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
        background-clip: text;
        -webkit-background-clip: text;
        text-shadow: 0 0 16px var(--color-primary-lite);
    }
}

.search-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;

    .search-input-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--length-gap-m);
        max-width: 612px;
        width: 100%;
        align-items: flex-end;

        .input {
            width: 100%;

            &::v-deep(.input) {
                width: 100%;
            }
        }

        .button {
            border-color: var(--color-content-liter);
        }
    }

    .empty,
    .loading {
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

    .filter-region-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: var(--length-gap-m);
        max-width: 980px;
        justify-content: center;
    }

    .search-result {
        display: grid;
        gap: var(--length-gap-xl);
        width: 100%;
        grid-template-columns: repeat(auto-fill, 256px);
        justify-content: center;
    }

    .search-result-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-xl);
        width: 100%;
        justify-content: center;
    }
}
</style>
