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
        <SAdminAssociationCard
            v-for="association in associations"
            v-else
            :key="association._id"
            :model-value="association"
        />
    </div>
    <SPagination
        v-model="currentPage"
        :displayed="displayed"
        :length="numberOfAssociations"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import SInput from "@/components/design/forms/Input.vue";
import * as AdminService from "@/services/admin";
import SCard from "@/components/design/Card.vue";
import SCopier from "@/components/design/forms/Copier.vue";
import SSmallDropdown from "@/components/design/forms/SmallDropdown.vue";
import SAdminAssociationCard, { TAdminAssociation } from "@/components/pages/admin/panels/AssociationCard.vue";
import SPagination from "@/components/design/SPagination.vue";


export default defineComponent({
    name: "SAdminPanelAssociations",
    components: { FontAwesomeIcon, SAdminAssociationCard, SCard, SCopier, SInput, SPagination,SSmallDropdown },
    setup() {
        const searchInput = ref("");
        const isSearching = ref(true);
        const associations = ref([] as Array<TAdminAssociation>);
        const numberOfAssociations = ref(0);
        const displayed = ref(64);
        const debounceSearch = debounce(updateSearch, 500);
        const currentPage = ref<number>(1);

        watch(
            () => searchInput.value,
            debounceSearch
        );

        watch(
            () => currentPage.value,
            updateSearch
        );

        async function updateSearch() {
            if (associations.value.length === 0) {
                isSearching.value = true;
            }

        
            const result = await AdminService.associationSearch({
                limit: 64,
                search: searchInput.value,
                skip: searchInput.value === "" ? (currentPage.value - 1) * displayed.value : 0
            });

            associations.value = result.associations;
            numberOfAssociations.value = result.total;
            displayed.value = result.displayed;

            isSearching.value = false;
        }

        onMounted(async () => {
            await updateSearch();
        });

        return {
            associations,
            currentPage,
            displayed,
            isSearching,
            numberOfAssociations,
            searchInput,
            updateSearch
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


}
</style>
