<template>
    <div class="search-layout">
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
        <div class="search-result">
            <SAssociationCard
                v-for="association in associations"
                :key="association._id"
                :association="association"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import SAssociationCard from "@/components/pages/federation/AssociationCard.vue";
import * as AssociationService from "@/services/association";

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
}

export default defineComponent({
    name: "SFederationSearch",
    components: { FontAwesomeIcon, SAssociationCard, SInput },
    setup() {
        const isSearching = ref(true);
        const searchInput = ref("");

        const associations = ref([] as Array<TBasicAssociation>);

        const debounceSearch = debounce(updateSearch, 500);

        watch(
            () => searchInput.value,
            debounceSearch
        );

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

        return {
            associations,
            isSearching,
            searchInput
        };
    }
});
</script>

<style scoped lang="scss">
.search-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 64px;

    .search-input-wrapper {
        max-width: 512px;
        width: 100%;

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

    .search-result {
        display: grid;
        gap: var(--length-gap-xl);
        width: 100%;
        grid-template-columns: repeat(auto-fill, 256px);
        justify-content: center;
    }
}
</style>
