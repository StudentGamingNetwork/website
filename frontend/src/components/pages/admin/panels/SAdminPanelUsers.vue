<template>
    <div class="admin-users">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                class="input"
                :title="$t('components.pages.admin.user.searchInput')"
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
            v-else-if="users.length === 0"
            class="empty"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','frown']"
            />
            <div class="description">
                {{ $t("components.pages.admin.user.noUser") }}
            </div>
        </div>
        <transition-group
            v-else
            name="user-list"
        >
            <SAdminUserCard
                v-for="user of users"
                :key="user._id"
                class="user"
                :user="user"
                @update="updateSearch"
            />
        </transition-group>
    </div>
    <SPagination
        v-model="currentPage"
        :total="Math.ceil(numberOfUsers/MAX_ROWS_PER_PAGE)"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import * as AdminService from "@/services/admin";
import SInput from "@/components/design/forms/SInput.vue";
import SAdminUserCard from "@/components/pages/admin/panels/SAdminUserCard.vue";
import SPagination from "@/components/design/SPagination.vue";

const MAX_ROWS_PER_PAGE = 64;

type TAdminUser = {
    _id: string;
    association: {
        name: string;
        school: {
            name: string;
        };
    };
    avatar: string;
    mail: string;
    platforms: {
        discord: string;
    };
    roles: Array<string>;
    student: {
        name: string;
    };
    username: string;
}


const searchInput = ref("");
const isSearching = ref(true);
const users = ref([] as Array<TAdminUser>);
const numberOfUsers = ref(0);
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
    if (users.value.length === 0) {
        isSearching.value = true;
    }
    const result = await AdminService.userSearch({
        limit: MAX_ROWS_PER_PAGE,
        search: searchInput.value,
        skip: (currentPage.value - 1) * MAX_ROWS_PER_PAGE
    });

    users.value = result.users;
    numberOfUsers.value = result.total;
           
    isSearching.value = false;
}

onMounted(async () => {
    await updateSearch();
});

</script>

<style scoped lang="css">
.admin-users {
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

    .user-list-enter-active, .user-list-leave-active {
        transition: all var(--duration-medium);
        height: 96px;
        opacity: 1;
    }

    .user-list-enter-from, .user-list-leave-to {
        opacity: 0;
        height: 0;
        transform: translateY(30px);
    }
}
</style>
