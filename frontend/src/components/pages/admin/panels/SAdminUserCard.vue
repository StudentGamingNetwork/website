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
                    v-if="user.student.status === 'validated'"
                    class="certificat"
                >
                    {{ $t("components.pages.admin.user.certificate") }}
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'times']"
                        @click="unvalidateCertificate()"
                    />
                </li>
                <li
                    v-for="role in user.roles"
                    :key="role"
                >
                    {{ roles[role] }}
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'times']"
                        @click="userUpdate({_id: user._id, role: {name: role, modification: 'remove'}})"
                    />
                </li>
            </ul>
            <SSmallDropdown
                class="dropdown"
                model-value="none"
                :options="roles"
                @update:model-value="userUpdate({_id: user._id, role: {name: $event, modification: 'add'}})"
            />
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
                            {{ $t("components.pages.admin.user.certificateType",certificateType) }} 
                        </a>
                    </template>
                    <template v-else>
                        {{ $t("components.pages.admin.user.noCertificate") }} 
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

<script lang="ts" setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/SCard.vue";
import * as UserService from "@/services/user";
import { TCompleteUser } from "@/modules/user";
import SSmallDropdown from "@/components/design/forms/SSmallDropdown.vue";
import * as AdminService from "@/services/admin";
import { ERoles } from "@/services/user";
import { Toast } from "@/modules";
import i18n from "@/locales";

const props = defineProps<{ user: TCompleteUser }>();
const emit = defineEmits(["update"]);

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
        case "processing":
            return i18n.global.t("components.pages.admin.user.status.processing");
        case "validated":
            return i18n.global.t("components.pages.admin.user.status.validated");
        case "rejected":
            return i18n.global.t("components.pages.admin.user.status.rejected");
    }
    return i18n.global.t("components.pages.admin.user.noCertificate");
});

const avatarUrl = computed(() => {
    return UserService.getAvatarUrl({ id: props.user._id, avatar: props.user.avatar });
});

const roles = {
    none: i18n.global.t("components.pages.admin.user.roles.none"),
    admin: i18n.global.t("components.pages.admin.user.roles.admin"),
    council: i18n.global.t("components.pages.admin.user.roles.council"),
    federation: i18n.global.t("components.pages.admin.user.roles.federation"),
    member: i18n.global.t("components.pages.admin.user.roles.member"),
    office: i18n.global.t("components.pages.admin.user.roles.office"),
    partnership: i18n.global.t("components.pages.admin.user.roles.partnership"),
    tournament: i18n.global.t("components.pages.admin.user.roles.tournament")
};

async function unvalidateCertificate() {
    const response = await Toast.testRequest(async () => {
        return await AdminService.userCertificate({ _id: props.user._id, status: "processing" });
    });

    if (response?.success && response.user){
        props.user.student.status = "processing";
    }
}

async function userUpdate(update: { _id: string; role: { name: ERoles; modification: "add" | "remove" } }) {
    if (update.role.name.toString() === "none") {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await AdminService.userUpdate(update);
    });

    if (response?.success) {
        emit("update");
    }

    return {
        avatarUrl,
        certificateType,
        certificateUrl,
        roles,
        studentStatus,
        unvalidateCertificate,
        userUpdate
    };
}
</script>

<style scoped lang="css">
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
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        gap: var(--length-gap-s);
        grid-area: roles;
        flex-wrap: wrap;

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
                padding: 0 var(--length-padding-xs);
                display: flex;
                align-items: center;
                gap: var(--length-gap-xs);
                text-wrap: nowrap;

                .icon {
                    cursor: pointer;

                    &:hover {
                        color: var(--color-content);
                    }
                }

                &.certificat {
                    background: var(--color-success-background);
                    color: var(--color-success-content);
                    border-color: var(--color-success);
                }
            }

        }

        .dropdown {
            color: var(--color-content-softer);
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
