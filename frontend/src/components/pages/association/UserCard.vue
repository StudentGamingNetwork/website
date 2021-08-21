<template>
    <SCard class="user-card">
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
    </SCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import { User } from "@/modules";
import * as UserService from "@/services/user";

export default defineComponent({
    name: "SUserCard",
    components: { FontAwesomeIcon, SCard },
    props: {
        user: {
            required: true,
            type: Object as PropType<User.TUser>
        }
    },
    setup() {
        return {
            getUserAvatarUrl: UserService.getAvatarUrl
        };
    }
});
</script>

<style scoped lang="scss">
.user-card {
    width: 384px;
    display: grid;
    column-gap: var(--length-gap-m);
    grid-template-columns: 96px 1fr;
    grid-template-areas:
        "avatar username"
        "avatar informations";

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
            font-size: 0.9rem;
            text-transform: uppercase;
            font-weight: 400;
            color: var(--color-content-softer);
        }
    }

    .informations {

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
</style>
