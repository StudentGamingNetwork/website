<template>
    <SCard class="management-team-card">
        <div class="team-head">
            <div class="logo">
                <img
                    v-if="team.settings.logo"
                    alt="avatar"
                    :src="TeamService.getLogoUrl({id:team._id, logo:team.settings.logo})"
                >
                <FontAwesomeIcon
                    v-else
                    class="icon"
                    :icon="['fas', 'people-group']"
                />
            </div>
            <div class="name">
                <span
                    v-if="team.settings.tag"
                    class="tag"
                >
                    <span class="gradient">{{ team.settings.tag }}</span>
                </span> {{ team.settings.name }}
            </div>
            <div class="status">
                <div
                    v-if="team.state.validated"
                    class="chip validated"
                    @click.stop="updateTeam({_id: team._id, validated:!team.state.validated})"
                >
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'check']"
                    />
                    {{ $t("components.pages.tournaments.management.pages.validated") }}
                </div>
                <div
                    v-else
                    class="chip verification"
                    @click.stop="updateTeam({_id: team._id, validated:!team.state.validated})"
                >
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'eye']"
                    />
                    {{ $t("components.pages.tournaments.management.pages.verification") }}
                </div>
                <div
                    class="chip export"
                    @click="exportTeam({_id: team._id})"
                >
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'upload']"
                    />
                    {{ $t("components.pages.tournaments.management.pages.export") }}
                </div>
            </div>
        </div>
        <table class="members-table">
            <tr>
                <td
                    class="title"
                    colspan="5"
                >
                    {{ $t("components.pages.tournaments.player",2) }}
                </td>
            </tr>
            <tr
                v-for="member of team.members"
                :key="member.user._id"
            >
                <td>
                    <div class="avatar">
                        <img
                            v-if="member.user.avatar"
                            alt="avatar"
                            :src="UserService.getAvatarUrl({id:member.user._id, avatar:member.user.avatar})"
                        >
                        <FontAwesomeIcon
                            v-else
                            class="icon"
                            :icon="['fas', 'user']"
                        />
                    </div>
                </td>
                <td>
                    <router-link
                        v-if="member.user.association?.tag"
                        class="tag"
                        :to="'/association/' + (member.user.association.settings?.slug || member.user.association._id)"
                    >
                        <span class="gradient">{{ member.user.association.tag }}</span>
                    </router-link>
                    {{ member.user.username }}
                    <span class="info">
                        (<span :class="{error: !member.username}">{{ member.username || $t("components.pages.tournaments.noId") }}</span>)
                    </span>
                    <div
                        v-if="isOwner && member.user._id !== team.owner"
                        class="kick"
                        @click="kickMember(memberIndex)"
                    >
                        {{ $t("components.pages.tournaments.kick") }}
                    </div>
                </td>
                <td>
                    {{ member.user.student.name }}
                    <span class="info">(<span
                        :class="{error: !(member.user.student.schoolName)}"
                    >{{
                        schoolName(member.user)
                    }}</span>)</span>
                </td>
                <td>
                    <div class="contact">
                        <a
                            class="certificate"
                            :class="{error: member.user.student.status === 'undefined',rejected: member.user.student.status === 'rejected', warning: member.user.student.status === 'processing'}"
                            :href="'/admin/certificates/'+member.user._id"
                            target="_blank"
                            :title="$t('components.pages.tournaments.certificate')+` (${member.user.student.status})`"
                        >
                            <FontAwesomeIcon :icon="['fas', 'id-card']" />
                        </a>
                        <SCopier
                            class="button"
                            :content="member.user.mail"
                        >
                            <FontAwesomeIcon :icon="['fas', 'envelope']" />
                        </SCopier>
                        <SCopier
                            class="button"
                            :class="{error: !member.user.platforms.discord}"
                            :content="member.user.platforms.discord"
                        >
                            <FontAwesomeIcon :icon="['fab', 'discord']" />
                        </SCopier>
                    </div>
                </td>
                <td>
                    <template v-if="isMemberReady(member)">
                        <SValidator :valid="true">
                            {{ $t("components.pages.tournaments.ready") }}
                        </SValidator>
                    </template>
                    <template v-else>
                        <SValidator :valid="false">
                            {{ $t("components.pages.tournaments.incomplete") }}
                        </SValidator>
                    </template>
                </td>
            </tr>
            <template v-if="team.staff.coach?.user || team.staff.manager?.user">
                <tr
                    class="title"
                >
                    <td>{{ $t("components.pages.tournaments.staff") }}</td>
                </tr>
                <tr
                    v-for="(staff, staffRole) of team.staff"
                    :key="staffRole"
                >
                    <template v-if="staff?.user">
                        <td>
                            <div class="avatar">
                                <img
                                    v-if="staff.user.avatar"
                                    alt="avatar"
                                    :src="UserService.getAvatarUrl({id:staff.user._id, avatar:staff.user.avatar})"
                                >
                                <FontAwesomeIcon
                                    v-else
                                    class="icon"
                                    :icon="['fas', 'user']"
                                />
                            </div>
                        </td>
                        <td>
                            <router-link
                                v-if="staff.user.association?.tag"
                                class="tag"
                                :to="'/association/' + (staff.user.association.settings?.slug || staff.user.association._id)"
                            >
                                <span class="gradient">{{ staff.user.association.tag }}</span>
                            </router-link>
                            {{ staff.user.username }}
                            <span class="info">
                                (<span :class="{error: !staff.user.username}">{{ staff.username || $t("components.pages.tournaments.noId") }}</span>)
                            </span>
                            <div
                                v-if="isOwner && staff.user._id !== team.owner"
                                class="kick"
                                @click="kickMember(staffRole,'staff')"
                            >
                                {{ $t("components.pages.tournaments.kick") }}
                            </div>
                        </td>
                        <td>
                            {{ staff.user.student.name || staff.username }}
                            <span class="info">({{
                                staffRole
                            }})</span>
                        </td>
                        <td>
                            <div class="contact">
                                <span
                                    class="certificate"
                                    title="Certificat étudiant"
                                >
                                    <FontAwesomeIcon :icon="['fas', 'id-card']" />
                                </span>
                                <SCopier
                                    class="button"
                                    :content="staff.user.mail"
                                >
                                    <FontAwesomeIcon :icon="['fas', 'envelope']" />
                                </SCopier>
                                <SCopier
                                    class="button"
                                    :class="{error: !staff.user.platforms.discord}"
                                    :content="staff.user.platforms.discord"
                                >
                                    <FontAwesomeIcon :icon="['fab', 'discord']" />
                                </SCopier>
                            </div>
                        </td>
                        <td>
                            <template v-if="isMemberReady(staff, true)">
                                <SValidator :valid="true">
                                    {{ $t("components.pages.tournaments.ready") }}
                                </SValidator>
                            </template>
                            <template v-else>
                                <SValidator :valid="false">
                                    {{ $t("components.pages.tournaments.incomplete") }}
                                </SValidator>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
        </table>
    </SCard>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
import { Team, Toast, User } from "@/modules";
import SCard from "@/components/design/SCard.vue";
import SValidator from "@/components/design/forms/SValidator.vue";
import SCopier from "@/components/design/forms/SCopier.vue";
import * as UserService from "@/services/user";
import * as AdminService from "@/services/admin";
import * as TeamService from "@/services/team";
import i18n from "@/locales";


defineProps<{
    team: Team.TTeam;
}>();

const emit = defineEmits(["update"]);

const schoolName = computed(() => (member: User.TCompleteUser) => {
    if (member?.student?.schoolName) {
        return `${ member.student?.schoolName }${ member.association?.school?.name ? ` - ${ member.association?.school?.name }` : "" }`;
    }
    return i18n.global.t("components.pages.tournaments.noSchool");
});

   
function isMemberReady(member: { user: User.TCompleteUser; username: string }, isStaff = false): boolean {
    if (!member.username && !isStaff) {
        return false;
    }

    if (!member.user.platforms.discord) {
        return false;
    }

    if (!member.user.student.name) {
        return false;
    }

    if (!(member.user.student.schoolName || member.user.association) && !isStaff) {
        return false;
    }

    if (member.user.student.status !== "validated" && !isStaff) {
        return false;
    }

    return true;
}

async function updateTeam(update: { _id: string; validated?: boolean }) {
    const response = await Toast.testRequest(async () => {
        return await AdminService.teamManage(update);
    });

    if (response?.success) {
        emit("update");
    }
}

async function exportTeam(team: { _id: string }) {
    await Toast.testRequest(async () => {
        return await AdminService.teamExport(team);
    });
}

</script>

<style scoped lang="css">
.management-team-card {
    padding: var(--length-padding-s) var(--length-padding-l);
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .team-head {
        display: flex;
        justify-content: space-between;

        .logo {
            grid-area: avatar;
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden;
            margin-right: var(--length-margin-s);

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .icon {
                width: 50px;
                height: 50px;
                color: var(--color-content-litest);
            }
        }

        .status {
            display: flex;
            gap: var(--length-gap-m);
            align-items: flex-start;
        }

        .chip {
            font-size: 0.7rem;
            border-radius: var(--lenght-radius-base);
            padding: 0 var(--length-padding-xxs);
            display: inline-block;
            opacity: 0.75;

            &:hover {
                cursor: pointer;
                opacity: 1;
            }

            &.verification {
                background: var(--color-warning-background);
                color: var(--color-warning-content);
                border: 1px solid var(--color-warning);
            }

            &.validated {
                background: var(--color-success-background);
                color: var(--color-success-content);
                border: 1px solid var(--color-success);
            }

            &.export {
                background: var(--color-info-background);
                color: var(--color-info-content);
                border: 1px solid var(--color-info);
            }
        }
    }

    .name {
        font-size: 1.2rem;
        font-weight: 600;

        .tag {
            .gradient {
                background: var(--gradient);
                display: inline-block;
                color: transparent;
                background-clip: text;
                -webkit-background-clip: text;
                text-shadow: 0 0 8px var(--color-primary-lite);
                transition: padding var(--duration-fast);
            }

            &::before {
                content: "[";
                color: var(--color-content-softer);
            }

            &::after {
                content: "]";
                color: var(--color-content-softer);
            }
        }
    }

    .members-table {
        width: 100%;
        border-collapse: collapse;

        td:first-child {
            border-top-left-radius: var(--lenght-radius-base);
            border-bottom-left-radius: var(--lenght-radius-base);
            padding-left: var(--length-padding-s);
        }

        td:last-child {
            border-top-right-radius: var(--lenght-radius-base);
            border-bottom-right-radius: var(--lenght-radius-base);
            padding-right: var(--length-padding-s);
        }

        tr:hover td, tr:hover th {
            overflow: hidden;
            background: var(--color-background-2);
        }

        .info {
            color: var(--color-content-softer);
            font-size: 0.8rem;
        }

        .contact {
            display: flex;
            align-items: center;
            gap: var(--length-gap-s);
            font-size: 1.2rem;

            .button {
                color: var(--color-content-litest);

                &:hover {
                    color: var(--color-content-lite);
                }
            }

            .certificate {
                color: var(--color-content-litest);
            }

            .error {
                color: var(--color-error-lite);
            }

            .rejected {
                color: #ff0000;
            }

            .warning {
                color: var(--color-warning-lite);
            }
        }

        td {
            padding: var(--length-padding-xxs) 0;

            &:nth-child(1) {
                width: 5%;
            }

            &:nth-child(2) {
                width: 35%;
            }

            &:nth-child(3) {
                width: 40%;
            }

            &:nth-child(4) {
                width: 10%;
            }

            &:nth-child(5) {
                width: 10%;
            }
        }

        .error {
            color: var(--color-error-content);
        }

        .avatar {
            grid-area: avatar;
            height: 24px;
            width: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden;
            margin-right: var(--length-margin-s);

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .icon {
                width: 24px;
                height: 24px;
                color: var(--color-content-litest);
            }
        }

        .tag {
            font-weight: 600;
            text-decoration: none;

            &:hover .gradient {
                padding: 0 var(--length-padding-xxs);
            }

            .gradient {
                background: var(--gradient);
                display: inline-block;
                color: transparent;
                background-clip: text;
                -webkit-background-clip: text;
                text-shadow: 0 0 8px var(--color-primary-lite);
                transition: padding var(--duration-fast);
            }

            &::before {
                content: "[";
                color: var(--color-content-softer);
            }

            &::after {
                content: "]";
                color: var(--color-content-softer);
            }
        }

        .title{
            display: flex;
            justify-items: center;
            align-items: center;
            pointer-events: none;
            font-size: 0.9rem;
            opacity: 0.5;
            font-weight: 600;
        }
    }
}
</style>
