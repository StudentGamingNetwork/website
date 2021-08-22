<template>
    <SCard
        class="user"
    >
        <div class="avatar">
            <img
                v-if="user.avatar"
                alt="avatar"
                :src="avatarUrl"
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
                    />{{ user.mail }}
                </li>
                <li v-if="user.platforms.discord">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fab', 'discord']"
                    />{{ user.platforms.discord }}
                </li>
            </ul>
        </div>
        <div class="association">
            <ul>
                <li v-if="user.association">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'users']"
                    />{{ user.association.name }}
                </li>
                <li v-if="user.association || user.student.schoolName">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'graduation-cap']"
                    />{{ user.association ? user.association.school.name : user.student.schoolName }}
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
                    <template v-if="user.student.certificate">
                        <a
                            :href="certificateUrl"
                            target="_blank"
                        >
                            Certificat ({{ certificateType }})
                        </a>
                    </template>
                    <template v-else>
                        Aucun certificat
                    </template>
                </li>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'user-check']"
                    />
                    {{ studentStatus }}
                </li>
            </ul>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import * as UserService from "@/services/user";
import { TCompleteUser } from "@/modules/user";

export default defineComponent({
    name: "SAdminUserCard",
    components: { FontAwesomeIcon, SCard },
    props: {
        user: {
            required: true,
            type: Object as PropType<TCompleteUser>
        }
    },
    setup(props) {
        const certificateType = computed(() => {
            const certificate = props.user.student.certificate;

            if (certificate.endsWith(".webp")) {
                return "webp";
            }

            if (certificate.endsWith(".pdf")) {
                return "pdf";
            }

            return "unknown";
        });

        const certificateUrl = computed(() => {
            return UserService.getCertificateUrl({ id: props.user._id, certificate: props.user.student.certificate });
        });

        const studentStatus = computed(() => {
            switch (props.user.student.status) {
            case "undefined":
                return "Aucun certificat";
            case "processing":
                return "En cours de validation";
            case "validated":
                return "Validé";
            case "rejected":
                return "Rejeté";
            }
        });

        const avatarUrl = computed(() => {
            return UserService.getAvatarUrl({ id: props.user._id, avatar: props.user.avatar });
        });

        return {
            avatarUrl,
            certificateType,
            certificateUrl,
            studentStatus
        };
    }
});
</script>

<style scoped lang="scss">
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
            justify-content: flex-end;

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
                display: flex;
                gap: var(--length-gap-s);
                align-items: center;
            }
        }

        .icon {
            width: 12px;
            height: 12px;
        }

        a:hover {
            color: var(--color-content);
        }
    }
}
</style>