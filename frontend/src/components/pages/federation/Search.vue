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
            <SSort
                ref="regionSort"
                sort_field="Région"
            />
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
        <div class="filter-region-wrapper">
            <SBadge
                v-for="region in regions"
                :key="region"
                ref="filtresRegion"
                :displayed-name="region"
            />
        </div>
        <div
            v-if="regionSort?.sortCount == 1"
            class="search-result"
        >
            <SAssociationCard
                v-for="association in associations.filter((a) =>
                    isRegionActive(a.federation.region)
                )"
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
            >
                <template
                    v-if="isRegionActive(String(region))"
                >
                    <div 
                        :key="region"
                        class="title"
                    >
                        <h2>{{ region }}</h2>
                    </div>
                    <div 
                        :key="region"
                        class="search-result"
                    >
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

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import SSort from "@/components/design/SSort.vue";
import SBadge from "@/components/design/SBadge.vue";
import SAssociationCard from "@/components/pages/federation/AssociationCard.vue";
import * as AssociationService from "@/services/association";
import { TAssociation } from "@/modules/association";

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

export default defineComponent({
    name: "SFederationSearch",
    components: {
        FontAwesomeIcon,
        SAssociationCard,
        SBadge,
        SInput,
        SSort
    },
    setup() {
        const isSearching = ref(true);
        const searchInput = ref("");

        const associations = ref([] as Array<TBasicAssociation>);

        const debounceSearch = debounce(updateSearch, 500);

        // Filtres
        const regions = AssociationService.regionNames;
        delete regions["none"]; // Inutile pour les filtres

        const filtresRegion = ref([] as Array<typeof SBadge>);

        function isRegionActive(region: string): boolean {
            let isActive = false;
            const fullRegion =
        AssociationService.getRegionName(region) === "Aucune région"
            ? region
            : AssociationService.getRegionName(region);
            filtresRegion.value.forEach((filtre) => {
                if (filtre.displayedName === fullRegion) {
                    isActive = filtre.active;
                }
            });
            return isActive;
        }

        // Tri
        const regionSort = ref<null | { sortCount: number }>(null);

        const sortedAssociations = computed(() => {
            if (!regionSort.value) return associations.value; // Si regionSort n'est pas défini, retourne le tableau original

            const sorted = [...associations.value];
            const temp = regionSort.value as { sortCount: number };
            if (temp.sortCount === 0) {
                // Tri décroissant
                sorted.sort((a, b) =>
                    b.federation.region.localeCompare(a.federation.region)
                );
            }
            else if (temp.sortCount === 2) {
                // Tri croissant
                sorted.sort((a, b) =>
                    a.federation.region.localeCompare(b.federation.region)
                );
            }
            // Si regionSort.value === 2, aucun tri n'est appliqué, donc retourne le tableau tel quel
            return sorted;
        });

        const regionSortedAssociations = computed(() => {
            let sorted = {} as { [key: string]: Array<TAssociation> };

            sorted = sortedAssociations.value.reduce((acc, association) => {
                if (
                    !acc[AssociationService.getRegionName(association.federation.region)]
                ) {
                    acc[AssociationService.getRegionName(association.federation.region)] =
            [];
                }
                acc[
                    AssociationService.getRegionName(association.federation.region)
                ].push(association as TAssociation);
                return acc;
            }, {} as { [key: string]: Array<TAssociation> });

            return sorted;
        });

        watch(() => searchInput.value, debounceSearch);

        async function updateSearch() {
            if (associations.value.length === 0) {
                isSearching.value = true;
            }
            const result = await AssociationService.search({
                limit: 50,
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
            filtresRegion,
            isRegionActive,
            isSearching,
            regions,
            regionSort,
            regionSortedAssociations,
            searchInput
        };
    }
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

    .input {
      width: 100%;

      &::v-deep(.input) {
        width: 100%;
      }
    }

    .button {
      background-color: var(--color-content-litest);
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
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--length-gap-m);
    width: 100%;
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
