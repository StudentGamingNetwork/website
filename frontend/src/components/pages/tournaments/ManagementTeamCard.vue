<template>
    <SCard class="management-team-card">
        <div class="name">
            <span class="tag">
                <span class="gradient">{{ team.settings.tag }}</span>
            </span> {{ team.settings.name }}
        </div>
        <table class="members-table">
            <tr
                v-for="member of team.members"
                :key="member.user._id"
            >
                <td>
                    <div class="avatar">
                        <img
                            v-if="member.user.avatar"
                            alt="avatar"
                            :src="getUserAvatarUrl({id:member.user._id, avatar:member.user.avatar})"
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
                        (<span :class="{error: !member.username}">{{ member.username || "ID manquant" }}</span>)
                    </span>
                    <div
                        v-if="isOwner && member.user._id !== team.owner"
                        class="kick"
                        @click="kickMember(memberIndex)"
                    >
                        Expulser
                    </div>
                </td>
                <td>
                    {{ member.user.student.name }}
                    <span class="info">(<span :class="{error: !(member.user.association || member.user.student.schoolName)}">{{
                        member.user.association?.school.name || member.user.student.schoolName || "École manquante"
                    }}</span>)</span>
                </td>
                <td>
                    <div class="contact">
                        <span
                            class="certificate"
                            :class="{error: member.user.student.status !== 'validated'}"
                            title="Certificat étudiant"
                        >
                            <FontAwesomeIcon :icon="['fas', 'id-card']" />
                        </span>
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
                            Prêt
                        </SValidator>
                    </template>
                    <template v-else>
                        <SValidator :valid="false">
                            Incomplet
                        </SValidator>
                    </template>
                </td>
            </tr>
        </table>
    </SCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Team, User } from "@/modules";
import SCard from "@/components/design/Card.vue";
import SValidator from "@/components/design/forms/Validator.vue";
import SCopier from "@/components/design/forms/Copier.vue";
import * as UserService from "@/services/user";

export default defineComponent({
    name: "STournamentManagementTeamCard",
    components: { FontAwesomeIcon, SCard, SCopier, SValidator },
    props: {
        team: {
            required: true,
            type: Object as PropType<Team.TTeam>
        }
    },
    setup() {


        function isMemberReady(member: { user: User.TCompleteUser; username: string }): boolean {
            if (!member.username) {
                return false;
            }

            if (!member.user.platforms.discord) {
                return false;
            }

            if (!member.user.student.name) {
                return false;
            }

            if (!(member.user.student.schoolName || member.user.association)) {
                return false;
            }

            if (member.user.student.status !== "validated") {
                return false;
            }

            return true;
        }

        return {
            getUserAvatarUrl: UserService.getAvatarUrl,
            isMemberReady
        };
    }
});
</script>

<style scoped lang="scss">
.management-team-card {
    padding: var(--length-padding-s) var(--length-padding-l);
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .name {
        font-size: 1.2rem;
        font-weight: 600;

        .tag {
            .gradient {
                background: var(--gradient);
                display: inline-block;
                color: transparent;
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

                &.error {
                    color: var(--color-error-lite);
                }
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

            &:hover .gradient{
                padding: 0 var(--length-padding-xxs);
            }

            .gradient {
                background: var(--gradient);
                display: inline-block;
                color: transparent;
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
}
</style>
