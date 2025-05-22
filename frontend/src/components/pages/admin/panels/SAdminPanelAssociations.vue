<template>
    <div class="admin-associations">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                class="input"
                :title="$t('components.pages.admin.association.searchInput')"
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
                {{ $t("components.pages.admin.association.noAssociation") }}
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
        :total="Math.ceil(numberOfAssociations/MAX_ROWS_PER_PAGE)"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import SInput from "@/components/design/forms/SInput.vue";
import * as AdminService from "@/services/admin";
import SAdminAssociationCard, { TAdminAssociation } from "@/components/pages/admin/panels/SAdminAssociationCard.vue";
import SPagination from "@/components/design/SPagination.vue";

const MAX_ROWS_PER_PAGE = 64;

const searchInput = ref("");
const isSearching = ref(true);
const associations = ref([] as Array<TAdminAssociation>);
const numberOfAssociations = ref(0);
const debounceSearch = debounce(updateSearch, 500);
const currentPage = ref<number>(1);

watch(
    () => searchInput.value,
    () => {
        debounceSearch();
        currentPage.value = 1;
    }
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
        limit: MAX_ROWS_PER_PAGE,
        search: searchInput.value,
        skip: (currentPage.value - 1) * MAX_ROWS_PER_PAGE
    });

    associations.value = result.associations;
    numberOfAssociations.value = result.total;

    isSearching.value = false;
}

onMounted(async () => {
    await updateSearch();
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
