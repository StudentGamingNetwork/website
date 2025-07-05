<template>
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
        v-else-if="!team._id"
        class="empty"
    >
        <FontAwesomeIcon
            class="icon"
            :icon="['fas','check']"
        />
        <div class="description">
            {{ $t("components.pages.tournaments.card.team.noWaiting") }}
        </div>
    </div>
    <SCard
        v-else
        class="team-card"
    >
        <div
            class="team"
        >
            <SSectionTitle>{{ team.settings.name }}</SSectionTitle>
            <SModalSection class="settings">
                <SModalSectionTitle>{{ $t("components.pages.tournaments.card.team.settings") }}</SModalSectionTitle>
                <SAvatarPicker
                    class="delete-logo"
                    :icon="['fas', 'trophy']"
                    title="Logo"
                    :url="logoUrl"
                    @click.capture.stop="deleteLogo"
                />
                <SInput
                    v-if="isTeamBased"
                    v-model="team.settings.name"
                    :modified="team.settings.name !== savedTeam.settings.name"
                    :title="$t('components.pages.tournaments.card.team.name')"
                    @enter="sendUpdate"
                />
                <SInput
                    v-if="isTeamBased"
                    v-model="team.settings.tag"
                    :modified="team.settings.tag !== savedTeam.settings.tag"
                    :title="$t('components.pages.tournaments.card.team.tag')"
                    :validators="[InputValidators.Length({min:3, max:4}), InputValidators.OnlyLettersAndNumbers()]"
                    @enter="sendUpdate"
                />

                <div class="buttons">
                    <SButton
                        class="button"
                        :disabled="!hasChanged"
                        primary
                        @click="sendUpdate"
                    >
                        {{ $t('components.pages.tournaments.card.team.save') }}
                    </SButton>
                    <SButton
                        v-if="team.members.length === 1"
                        danger
                        outlined
                        @click="deleteTeam"
                    >
                        {{ $t('components.pages.tournaments.card.action.disband') }}
                    </SButton>
                </div>
                <SModalSectionDescription>
                    {{ $t('components.pages.tournaments.card.team.info') }}
                </SModalSectionDescription>
            </SModalSection>
            <SModalSection class="checklist">
                <SModalSectionTitle> {{ $t('components.pages.tournaments.card.team.checklist.title') }}</SModalSectionTitle>
                <div class="validators">
                    <div class="validators-column">
                        <SValidator
                            v-if="isTeamBased"
                            :valid="!!savedTeam.settings.name"
                        >
                            {{ $t('components.pages.tournaments.card.team.name') }}
                        </SValidator>
                        <SValidator
                            v-if="isTeamBased"
                            :valid="!!savedTeam.settings.tag"
                        >
                            {{ $t('components.pages.tournaments.card.team.tag') }}
                        </SValidator>
                        <SValidator
                            v-if="isTeamBased"
                            :valid="team.members.length >= tournament.game.team.playersNumber"
                        >
                            {{ $t('components.pages.tournaments.card.team.checklist.complete') }}
                        </SValidator>
                    </div>
                </div>
                <i18n-t
                    keypath="components.pages.tournaments.card.team.description"
                    :tag="SModalSectionDescription"
                >
                    <template #settings>
                        <span
                            class="link"
                            @click="stateStore.modalOpen('settings')"
                        >{{ $t("components.pages.tournaments.card.team.settingsLink") }}</span> 
                    </template>
                </i18n-t>
                <div class="validators-column">
                    <div
                        v-for="(number, index) in Math.max(tournament.game.team.playersNumber, team.members.length)"
                        :key="index"
                    >
                        <template v-if="team.members[index]">
                            <SValidator :valid="isMemberReady(team.members[index])">
                                {{ $t("components.pages.tournaments.player") }} {{ number }} : <strong>{{ team.members[index].user.username }}</strong> ({{ isMemberReady(team.members[index]) ? i18n.global.t("components.pages.tournaments.ready").toLowerCase() : i18n.global.t("components.pages.tournaments.incomplete").toLowerCase() }})
                            </SValidator>
                        </template>
                        <template v-else>
                            <SValidator :valid="false">
                                {{ $t("components.pages.tournaments.player",0) }}
                            </SValidator>
                        </template>
                    </div>
                </div>
            </SModalSection>
            <div class="actions">
                <SButton
                    v-if="team.members.length < tournament.game.team.playersNumber+tournament.game.team.substitutesNumber"
                    class="button"
                    outlined
                    @click="addTeamMember('player')"
                >
                    {{ $t('components.pages.tournaments.management.addPlayer') }}
                </SButton>
                <SButton
                    v-if="tournament.game.team.coachEnabled && !team.staff.coach?.user"
                    class="button"
                    outlined
                    @click="addTeamMember('coach')"
                >
                    {{ $t('components.pages.tournaments.management.addCoach') }}
                </SButton>
                <SButton
                    v-if="tournament.game.team.managerEnabled && !team.staff.manager?.user"
                    class="button"
                    outlined
                    @click="addTeamMember('manager')"
                >
                    {{ $t('components.pages.tournaments.management.addManager') }}
                </SButton>
            </div>
            <div class="members">
                <table class="members-table">
                    <span class="title">{{ $t("components.pages.tournaments.player",2) }}-</span>
                    <tr
                        v-for="(member, memberIndex) of team.members"
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
                                v-if="member.user._id !== team.owner"
                                class="kick"
                                @click="kickMember(memberIndex)"
                            >
                                {{ $t("components.pages.tournaments.kick") }}
                            </div>
                        </td>
                        <td>
                            {{ member.user.student.name }}
                            <span class="info">(<span :class="{error: !(member.user.student.schoolName)}">{{
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
                                    <span
                                        class="certificate"
                                        :class="{error: ['rejected', 'undefined'].includes(member.user.student.status), warning: member.user.student.status === 'processing'}"
                                        :title="$t('components.pages.tournaments.certificate')"
                                    >
                                        <FontAwesomeIcon :icon="['fas', 'id-card']" />
                                    </span>
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
                                    {{ $t('components.pages.tournaments.ready') }}
                                </SValidator>
                            </template>
                            <template v-else>
                                <SValidator :valid="false">
                                    {{ $t('components.pages.tournaments.incomplete') }}
                                </SValidator>
                            </template>
                        </td>
                    </tr>
                    <template v-if="team.staff.coach?.user || team.staff.manager?.user">
                        <span class="title">{{ $t('components.pages.tournaments.staff') }}</span>
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
                                        (<span :class="{error: !staff.user.username}">{{ staff.username || $t('components.pages.tournaments.noId') }}</span>)
                                    </span>
                                    <div
                                        class="kick"
                                        @click="kickMember(staffRole,'staff')"
                                    >
                                        {{ $t('components.pages.tournaments.kick') }}
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
                                            :title="$t('components.pages.tournaments.certificate')"
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
                                    <template v-if="isMemberReady(staff,true)">
                                        <SValidator :valid="true">
                                            {{ $t('components.pages.tournaments.ready') }}
                                        </SValidator>
                                    </template>
                                    <template v-else>
                                        <SValidator :valid="false">
                                            {{ $t('components.pages.tournaments.incomplete') }}
                                        </SValidator>
                                    </template>
                                </td>
                            </template>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep, isMatch } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/SCard.vue";
import * as TeamService from "@/services/team";
import { User, Toast, Team, Tournament } from "@/modules";
import SButton from "@/components/design/forms/SButton.vue";
import SInput from "@/components/design/forms/SInput.vue";
import SModalSection from "@/components/design/modal/SModalSection.vue";
import SValidator from "@/components/design/forms/SValidator.vue";
import SModalSectionTitle from "@/components/design/modal/SModalSectionTitle.vue";
import SModalSectionDescription from "@/components/design/modal/SModalSectionDescription.vue";
import SSectionTitle from "@/components/design/SSectionTitle.vue";
import * as InputValidators from "@/utils/validators";
import SCopier from "@/components/design/forms/SCopier.vue";
import * as UserService from "@/services/user";
import SAvatarPicker from "@/components/design/forms/SAvatarPicker.vue";
import i18n from "@/locales";


const props = defineProps<{
    tournament: Tournament.TTournament;
}>();

const isSearching = ref(true);
const router = useRouter();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
const teamId = ref(router.currentRoute.value.params.management as string);

const userStore = User.useStore();

const savedTeam = reactive(Team.Lib.makeObject({}));
const team = reactive<Team.TTeam>(cloneDeep(savedTeam));


const isConnected = computed(() => {
    return !!userStore._id;
});


onMounted(async () => {
    if (!teamId.value){
        await updateTeam();
    }
    
    const response = await TeamService.details(tournamentSlug.value, teamId.value);
    if (response.success){
        Object.assign(savedTeam, response.team);
        assign(team, cloneDeep(savedTeam));
    }
    
    isSearching.value = false;
});

const schoolName = computed(() => (member: User.TCompleteUser) => {
    if (member?.student?.schoolName) {
        return `${ member.student?.schoolName }${ member.association?.school?.name ? ` - ${ member.association?.school?.name }` : "" }`;
    }
    return i18n.global.t("components.pages.tournaments.noSchool");
});

const logoUrl = computed(() => {
    if (!team.settings?.logo) {
        return "";
    }
    return TeamService.getLogoUrl({ id: team._id, logo: team.settings.logo });
});


const hasChanged = computed(() => {
    return !isMatch(savedTeam, team);
});


const sendUpdate = async () => {
    if (!hasChanged.value) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await TeamService.update(team);
    });

    if (response?.success) {
        await updateTeam();
    }
};

function deleteLogo(){
    const answer = confirm(i18n.global.t("components.pages.tournaments.management.deleteLogo"));
  
    if (answer){
        team.settings.logo = "";
        sendUpdate();
    }
}

const isTeamBased = computed(() => {
    return props.tournament.game.team.playersNumber > 1;
});

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

async function addTeamMember(role: string){
    const playerMail = prompt(i18n.global.t("components.pages.tournaments.management.addMemberPrompt", { role: role === "player" ? i18n.global.t("components.pages.tournaments.player").toLowerCase() : role }));

    if (!playerMail) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await TeamService.addTeamMember(props.tournament._id, team._id, playerMail, role);
    });

    if (response?.success){
        await updateTeam();
    }
}

async function updateTeam() {
    if (!isConnected.value) {
        return;
    }

    const result = await TeamService.details(tournamentSlug.value,team?._id);
    const teamApi = result.team; 
   
    assign(savedTeam, teamApi);
    assign(team, cloneDeep(savedTeam));

    if (!teamApi?._id) {
        team._id = "";
    }
}

async function deleteTeam() {

    if (!confirm(i18n.global.t("components.pages.tournaments.deleteTeamPrompt"))) {
        return;
    }
    const response = await Toast.testRequest(async () => {
        return await TeamService.remove(tournamentSlug.value, team._id);
    });

    if (response?.success) {
        await updateTeam();
    }
}

async function kickMember(memberIndex: number, type: "staff" | "members" = "members") {
    if (!confirm(i18n.global.t("components.pages.tournaments.kickMemberPrompt"))) {
        return;
    }
    
    team[type][memberIndex].kick = true;
        
    const response = await Toast.testRequest(async () => {
        return await TeamService.update(team);
    });

    if (response?.success) {
        await updateTeam();
    }
}
      
</script>

<style scoped lang="css">
.team-card {
    width: 100%;
    box-sizing: border-box;
    padding: var(--length-padding-l);

    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: var(--length-gap-m);

        .buttons {
            display: flex;
            gap: var(--length-gap-l);
        }
    }

    .team {
        display: grid;
        column-gap: var(--length-gap-m);
        row-gap: var(--length-gap-l);
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
        "title title"
        "settings checklist"
        "actions actions"
        "members members";

        @media (max-width: 999px) {
            grid-template-columns: 1fr;
            grid-template-areas:
            "title"
            "settings"
            "checklist"
            "actions"
            "members";
        }

        .settings {
            grid-area: settings;

            .delete-logo {
                cursor: pointer;

                &:hover{
                    filter:grayscale(100%) brightness(0.6);
                }
            }
        }

        .checklist {
            grid-area: checklist;
        }

        .actions {
            grid-area: actions;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: var(--length-gap-m);

            @media (max-width: 999px) {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        .members {
            grid-area: members;
        }

        .settings, .checklist {
            flex-basis: 1px;
            flex-grow: 1;
        }

        .validators {
            display: flex;
            width: 100%;

            .validators-column {
                flex-basis: 1px;
                flex-grow: 1;
            }
        }

        .validators-column {
            display: flex;
            flex-direction: column;
            gap: var(--length-gap-xs);

            strong {
                font-weight: 600;
            }
        }

        .link {
            color: var(--color-content);
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }

        .buttons {
            display: flex;
            gap: var(--length-gap-m);
            width: 400px;

            .button {
                flex-grow: 1;
                flex-basis: 1px;
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

            tr:hover td{
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

                .warning {
                    color: var(--color-warning-lite);
                }
            }

            td {
                padding: var(--length-padding-s) 0;

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
                height: 48px;
                width: 48px;
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

            .kick {
                font-size: 0.7rem;
                border-radius: var(--lenght-radius-base);
                padding: 0 var(--length-padding-xxs);
                display: inline-block;
                cursor: pointer;
                margin-left: var(--length-margin-s);

                background: var(--color-error-background);
                color: var(--color-error-content);
                border: 1px solid var(--color-error);

                opacity: 0.75;

                &:hover {
                    opacity: 1;
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
}
</style>
