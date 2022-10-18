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

export default defineComponent({
    name: "SAdminPanelAssociations",
    components: { FontAwesomeIcon, SAdminAssociationCard, SCard, SCopier, SInput, SSmallDropdown },
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
                limit: 100,
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
