<template>
    <div class="admin-users">
        <div class="search-input-wrapper">
            <SInput
                v-model="searchInput"
                class="input"
                title="Chercher un utilisateur..."
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
                Aucun utilisateur trouvé...
            </div>
        </div>
        <transition-group
            v-else
            name="user-list"
        >
            <SAdminUserCard
                v-for="(user, index) in users.slice(0, displayed)"
                :key="user._id"
                class="user"
                :user="user"
                @update="updateSearch"
            />
        </transition-group>
    </div>
    <SPagination
        :array-length="numberOfUsers"
        :displayed="displayed"
        @offset="updateSearch"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
import * as AdminService from "@/services/admin";
import SInput from "@/components/design/forms/Input.vue";
import SAdminUserCard from "@/components/pages/admin/panels/UserCard.vue";
import SPagination from "@/components/design/SPagination.vue";

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

export default defineComponent({
    name: "SAdminPanelUsers",
    components: { FontAwesomeIcon, SAdminUserCard, SInput, SPagination },
    setup() {
        const router = useRouter();
        const searchInput = ref("");
        const isSearching = ref(true);
        const users = ref([] as Array<TAdminUser>);
        const numberOfUsers = ref(0);
        const displayed = ref(5);
        const debounceSearch = debounce(updateSearch, 500);


        watch(
            () => searchInput.value,
            debounceSearch
        );

        async function updateSearch() {
            if (users.value.length === 0) {
                isSearching.value = true;
            }
            
            const offset = Number.isInteger(Number(router.currentRoute.value.params.page as string)) ? router.currentRoute.value.params.page as string : "0";

            numberOfUsers.value = await AdminService.userSearch({
                limit: 100,
                search: searchInput.value,
                skip: 0
            })
                .then((value) => {
                    return value.users.length;
                });

            const result = await AdminService.userSearch({
                limit: displayed.value,
                search: searchInput.value,
                skip: searchInput.value === "" ? Number(offset) * displayed.value : 0
            });

            users.value = result.users;
            displayed.value = result.displayed;
            isSearching.value = false;
        }

        onMounted(async () => {
            await router.push(`/${ String(router.currentRoute.value.name) }/0`).then(() => {
                updateSearch();
            }); 
        });

        return {
            displayed,
            isSearching,
            numberOfUsers,
            searchInput,
            updateSearch,
            users
        };
    }
});
</script>

<style scoped lang="scss">
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
