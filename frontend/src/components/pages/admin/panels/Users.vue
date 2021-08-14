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
            <SCard
                v-for="user of users"
                :key="user._id"
                class="user"
            >
                <div class="avatar">
                    <img
                        v-if="user.avatar"
                        alt="avatar"
                        :src="getUserAvatarUrl({id:user._id, avatar:user.avatar})"
                    >
                    <FontAwesomeIcon
                        v-else
                        class="icon"
                        :icon="['fas', 'user']"
                    />
                </div>
                <div class="username">
                    {{ user.username }}
                    <span
                        v-if="user.student.name"
                        class="name"
                    >
                        ({{ user.student.name }})
                    </span>
                </div>
                <div class="roles">
                    <ul>
                        <li
                            v-for="role in user.roles"
                            :key="role"
                        >
                            {{ role }}
                        </li>
                    </ul>
                </div>
                <div class="informations">
                    <ul>
                        <li>
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fas', 'envelope']"
                            />
                            {{ user.mail }}
                        </li>
                        <li v-if="user.platforms.discord">
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fab', 'discord']"
                            />
                            {{ user.platforms.discord }}
                        </li>
                    </ul>
                </div>
                <div class="association">
                    <ul v-if="user.association">
                        <li>
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fas', 'users']"
                            />
                            {{ user.association.name }}
                        </li>
                        <li>
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fas', 'graduation-cap']"
                            />
                            {{ user.association.school.name }}
                        </li>
                    </ul>
                </div>
                <div class="student">
                    <ul v-if="user.student">
                        <li>
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fas', 'id-card']"
                            />
                            Aucun certificat
                        </li>
                        <li>
                            <FontAwesomeIcon
                                class="icon"
                                :icon="['fas', 'user-check']"
                            />
                            Aucun certificat
                        </li>
                    </ul>
                </div>
            </SCard>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { debounce } from "lodash";
import * as AdminService from "@/services/admin";
import * as UserService from "@/services/user";
import SInput from "@/components/design/forms/Input.vue";
import SCard from "@/components/design/Card.vue";

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
    components: { FontAwesomeIcon, SCard, SInput },
    setup() {
        const searchInput = ref("");
        const isSearching = ref(true);
        const users = ref([] as Array<TAdminUser>);

        const debounceSearch = debounce(updateSearch, 500);

        watch(
            () => searchInput.value,
            debounceSearch
        );

        async function updateSearch() {
            if (users.value.length === 0) {
                isSearching.value = true;
            }
            const result = await AdminService.userSearch({
                limit: 20,
                search: searchInput.value,
                skip: 0
            });

            users.value = result.users;
            isSearching.value = false;
        }

        onMounted(async () => {
            await updateSearch();
        });

        return {
            getUserAvatarUrl: UserService.getAvatarUrl,
            isSearching,
            searchInput,
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


    .user {
        display: grid;
        column-gap: var(--length-gap-m);
        grid-template-columns: 96px 1fr 1fr 1fr;
        grid-template-areas:
        "avatar username username roles"
        "avatar informations association student";

        .avatar {
            grid-area: avatar;
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

        .username {
            grid-area: username;
            font-size: 1.5rem;
            font-weight: 600;

            .name {
                font-size: 1rem;
                text-transform: uppercase;
                font-weight: 400;
                color: var(--color-content-softer);
            }
        }

        .roles {
            font-size: 0.7rem;
            padding: var(--length-padding-xs);

            ul {
                display: flex;
                margin: 0;
                padding: 0;
                gap: var(--length-gap-s);
                justify-content:end;

                li {
                    list-style: none;
                    background: var(--color-info-background);
                    color: var(--color-info-content);
                    border: 1px solid var(--color-info);
                    border-radius: var(--lenght-radius-base);
                    padding: 0 var(--length-padding-xxs);
                    text-transform: capitalize;
                }
            }
        }

        .informations {
            grid-area: informations;
        }

        .association {
            grid-area: association;
        }

        .student {
            grid-area: student;
        }

        .informations, .association, .student {

            color: var(--color-content-softer);
            font-size: 0.8rem;

            ul {
                padding: 0;
                margin: 0;

                li {
                    list-style: none;
                }
            }

            .icon {
                width: 12px;
                height: 12px;
            }
        }
    }
}
</style>
