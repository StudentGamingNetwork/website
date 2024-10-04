<template>
    <SCard class="team-card">
        <div
            v-if="!isConnected"
            class="empty"
        >
            <div>Pour participer à ce tournoi, vous devez d'abord vous inscrire ou vous connecter.</div>
            <div class="buttons">
                <SButton
                    primary
                    @click="stateStore.modalOpen('signup')"
                >
                    Inscription
                </SButton>
                <SButton
                    outlined
                    @click="stateStore.modalOpen('login')"
                >
                    Connexion
                </SButton>
            </div>
        </div>
        <div
            v-else-if="!hasTeam"
            class="empty"
        >
            <div>Prêt à rejoindre l'arène ?</div>
            <div class="buttons">
                <template v-if="isTeamBased || !isCoachingStaffFull || !isManagingStaffFull">
                    <SButton
                        primary
                        @click="createTeam"
                    >
                        Créer une équipe
                    </SButton>
                    <SButton
                        outlined
                        @click="joinTeam"
                    >
                        Rejoindre une équipe
                    </SButton>
                </template>
                <SButton
                    v-else
                    primary
                    @click="createTeam"
                >
                    Participer au tournoi
                </SButton>
            </div>
        </div>
        <div
            v-else
            class="team"
        >
            <SSectionTitle>Votre équipe</SSectionTitle>
            <SModalSection class="settings">
                <SModalSectionTitle>Paramètre de l'équipe</SModalSectionTitle>
                <SAvatarPicker
                    :icon="['fas', 'trophy']"
                    title="Logo"
                    :url="logoUrl"
                    @file-change="uploadLogo"
                />
                <SInput
                    v-if="isTeamBased"
                    v-model="team.settings.name"
                    :disabled="!isOwner"
                    :modified="team.settings.name !== savedTeam.settings.name"
                    title="Nom d'équipe"
                    @enter="sendUpdate"
                />
                <SInput
                    v-if="isTeamBased"
                    v-model="team.settings.tag"
                    :disabled="!isOwner"
                    :modified="team.settings.tag !== savedTeam.settings.tag"
                    title="TAG d'équipe"
                    :validators="[InputValidators.Length({min:3, max:4}), InputValidators.OnlyLettersAndNumbers()]"
                    @enter="sendUpdate"
                />
                <SInput
                    v-if="isStaff"
                    v-model="team.staff[staffType].username"
                    :modified="team.staff[staffType].username !== savedTeam.staff[staffType].username"
                    :title="tournament.game.username"
                    @enter="sendUpdate"
                />
                <SInput
                    v-else
                    v-model="team.members[playerIndex].username"
                    :modified="team.members[playerIndex].username !== savedTeam.members[playerIndex].username"
                    :title="tournament.game.username"
                    @enter="sendUpdate"
                />
                <div class="buttons">
                    <SButton
                        class="button"
                        :disabled="!hasChanged"
                        primary
                        @click="sendUpdate"
                    >
                        Sauvegarder
                    </SButton>
                    <SButton
                        v-if="!team.state.ready"
                        class="button"
                        :disabled="!isTeamReady"
                        outlined
                        @click="markReady"
                    >
                        Marquer prêt
                    </SButton>
                    <SButton
                        v-else-if="!team.state.validated"
                        class="button"
                        outlined
                        @click="markUnready"
                    >
                        En attente
                    </SButton>
                    <SButton
                        v-else
                        class="button"
                        disabled
                        outlined
                    >
                        Équipe validée
                    </SButton>
                </div>
                <SModalSectionDescription>
                    Une fois que tout est en ordre, cliquez sur "Marquer prêt" pour que les admins valident votre
                    équipe.
                </SModalSectionDescription>
            </SModalSection>
            <SModalSection class="checklist">
                <SModalSectionTitle>Checklist</SModalSectionTitle>
                <div class="validators">
                    <div class="validators-column">
                        <SValidator
                            v-if="isTeamBased"
                            :valid="!!savedTeam.settings.name"
                        >
                            Nom d'équipe
                        </SValidator>
                        <SValidator
                            v-if="isTeamBased"
                            :valid="!!savedTeam.settings.tag"
                        >
                            TAG d'équipe
                        </SValidator>
                        <SValidator
                            v-if="!isStaff"
                            :valid="!!savedTeam.members[playerIndex].username"
                        >
                            Identifiant de jeu
                        </SValidator>
                        <SValidator
                            v-else
                            :valid="!!savedTeam.staff[staffType].username"
                        >
                            Identifiant de jeu
                        </SValidator>
                        <SValidator
                            v-if="isTeamBased"
                            :valid="savedTeam.members.length >= tournament.game.team.playersNumber"
                        >
                            Équipe complète
                        </SValidator>
                    </div>
                    <div class="validators-column">
                        <SValidator :valid="!!userStore.platforms.discord">
                            Identifiant Discord*
                        </SValidator>
                        <SValidator
                            v-if="!isStaff"
                            :valid="!!(userStore.association || userStore.student.schoolName)"
                        >
                            Nom d'école*
                        </SValidator>
                        <SValidator :valid="!!userStore.student.name">
                            Nom et prénom*
                        </SValidator>
                        <SValidator
                            v-if="!isStaff"
                            :valid="userStore.student.status === 'validated'"
                        >
                            Certificat étudiant*
                        </SValidator>
                    </div>
                </div>
                <SModalSectionDescription>
                    * Ces éléments peuvent être renseignés dans les <span
                        class="link"
                        @click="stateStore.modalOpen('settings')"
                    >paramètres</span> de votre profil.
                </SModalSectionDescription>
                <div class="validators">
                    <div class="validators-column">
                        <div
                            v-for="(number, index) in Math.max(tournament.game.team.playersNumber, team.members.length)"
                            :key="index"
                        >
                            <template v-if="team.members[index]">
                                <SValidator :valid="isMemberReady(team.members[index])">
                                    Joueur {{ number }} : <strong>{{ team.members[index].user.username }}</strong> ({{ isMemberReady(team.members[index]) ? "prêt" : "incomplet" }})
                                </SValidator>
                            </template>
                            <template v-else>
                                <SValidator :valid="false">
                                    Joueur manquant
                                </SValidator>
                            </template>
                        </div>
                    </div>
                    <div class="validators-column">
                        <div
                            v-for="(staff, staffRole) in team.staff"
                            :key="staffRole"
                        >
                            <SValidator
                                v-if="staff?.user"
                                :valid="isMemberReady(staff, true)"
                            >
                                {{ staffRole }} : <strong>{{ staff.user.username }}</strong> ({{ isMemberReady(staff, true) ? "prêt" : "incomplet" }})
                            </SValidator>
                        </div>
                    </div>
                </div>
            </SModalSection>
            <div class="actions">
                <SInputCopier
                    v-if="isTeamBased"
                    :content="team.settings.invitationCode"
                    title="Code d'invitation joueur"
                />
                <SInputCopier
                    v-if="!isCoachingStaffFull"
                    :content="team.settings.coachInvitationCode"
                    title="Code d'invitation coach"
                />
                <SInputCopier
                    v-if="!isManagingStaffFull"
                    :content="team.settings.managerInvitationCode"
                    title="Code d'invitation manager"
                />
                <SButton
                    danger
                    outlined
                    @click="deleteTeam"
                >
                    {{ isOwner ? (isTeamBased ? "Dissoudre l'équipe" : "Quitter le tournoi") : "Quitter l'équipe" }}
                </SButton>
            </div>
            <div class="members">
                <table class="members-table">
                    <span class="title">Joueurs</span>
                    <tr
                        v-for="(member, index) of team.members"
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
                                (<span :class="{error: !member.username}">{{ member.username || "ID manquant" }}</span>)
                            </span>
                            <div
                                v-if="isOwner && member.user._id !== team.owner"
                                class="kick"
                                @click="kickMember(index)"
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
                                    :class="{error: ['rejected', 'undefined'].includes(member.user.student.status), warning: member.user.student.status === 'processing'}"
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
                    <template v-if="team.staff.coach?.user || team.staff.manager?.user">
                        <span class="title">Staff</span>
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
                                        (<span :class="{error: !staff.user.username}">{{ staff.username || "ID manquant" }}</span>)
                                    </span>
                                    <div
                                        v-if="isOwner && staff.user._id !== team.owner"
                                        class="kick"
                                        @click="kickMember(staffRole,'staff')"
                                    >
                                        Expulser
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
                                    <template v-if="isMemberReady(staff,true)">
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
                            </template>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep, isMatch } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import * as TeamService from "@/services/team";
import { User, State, Toast, Team, Tournament } from "@/modules";
import SButton from "@/components/design/forms/Button.vue";
import SInput from "@/components/design/forms/Input.vue";
import SModalSection from "@/components/design/modal/Section.vue";
import SValidator from "@/components/design/forms/Validator.vue";
import SModalSectionTitle from "@/components/design/modal/SectionTitle.vue";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import * as InputValidators from "@/utils/validators";
import SCopier from "@/components/design/forms/Copier.vue";
import SInputCopier from "@/components/design/forms/InputCopier.vue";
import * as UserService from "@/services/user";
import SAvatarPicker from "@/components/design/forms/AvatarPicker.vue";

<<<<<<< HEAD

=======
>>>>>>> 03d2f695cb00737b0c2ee543cfac0d13284241dd
const props = defineProps({
    tournament: {
        required: true,
        type: Object as PropType<Tournament.TTournament>
    }
});

<<<<<<< HEAD
=======

>>>>>>> 03d2f695cb00737b0c2ee543cfac0d13284241dd
const router = useRouter();
const userStore = User.useStore();
const stateStore = State.useStore();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);

const savedTeam = reactive(Team.Lib.makeObject({}));
const team = reactive<Team.TTeam>(cloneDeep(savedTeam));

const isConnected = computed(() => !!userStore._id);

const hasTeam = computed(() => !!team._id);

const isOwner = computed(() => userStore._id === team.owner);

const staffType = computed(() => {
    if (team.staff.coach?.user?._id === userStore._id) {
        return "coach";
    }
    if (team.staff.manager?.user?._id === userStore._id) {
        return "manager";
    }
    return "";
});

const isStaff = computed(() => staffType.value !== "");

const playerIndex = computed(() => {       
    for (const [index, player] of team.members.entries()) {
        if (player.user._id === userStore._id) {
            return index;
        }
    }
    return -1;
});

await updateTeam();

const hasChanged = computed(() => !isMatch(savedTeam, team));

const markReady = async() => {
    team.state.ready = true;
    await sendUpdate();
};

const markUnready = async() => {
    team.state.ready = false;
    await sendUpdate();
};

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

const isTeamReady = computed(() => {

    if (team.members.length < props.tournament.game.team.playersNumber) {
        return false;
    }

    for (const member of team.members) {
        if (!isMemberReady(member)) {
            return false;
        }
    }

    if (isTeamBased.value && !savedTeam.settings.name) {
        return false;
    }

    if (isTeamBased.value && !savedTeam.settings.tag) {
        return false;
    }

    return true;
});

const isTeamBased = computed(() => props.tournament.game.team.playersNumber > 1);

const isCoachingStaffFull = computed(() => team.staff.coach?.user || !props.tournament.game.team.coachEnabled);

const isManagingStaffFull = computed(() => team.staff.manager?.user || !props.tournament.game.team.managerEnabled);

function isMemberReady(member: { user: User.TCompleteUser; username: string }, isStaff = false): boolean {
    if (!member.username) {
        return false;
    }

    if (!member.user.platforms.discord) {
        return false;
    }

    if (!member.user.student.name && !isStaff) {
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

const uploadLogo = async (file: File) => {
    const response = await Toast.testRequest(async () => {
        return await TeamService.uploadLogo({ file }, team._id);
    });

    if (response?.success) {
        team.settings.logo = response.logo;
    }
};

const logoUrl = computed(() => {
    if (!team.settings?.logo) {
        return "";
    }
    return TeamService.getLogoUrl({ id: team._id, logo: team.settings.logo });
});

async function updateTeam() {
    if (!isConnected.value) {
        return;
    }
    const teamApi = await TeamService.get(tournamentSlug.value);
    assign(savedTeam, teamApi);
    assign(team, cloneDeep(savedTeam));

    if (!teamApi._id) {
        team._id = "";
    }
}

async function joinTeam() {
    const invitationCode = prompt("Entrez le code d'invitation de l'équipe. Vous pouvez le demander au chef d'équipe, il est de la forme XXXX-XXXX-XXXX-XXXX.");

    if (!invitationCode) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await TeamService.join(tournamentSlug.value, invitationCode || "");
    });

    if (response?.success) {
        await updateTeam();
    }
}

async function createTeam() {
    const response = await Toast.testRequest(async () => {
        return await TeamService.create(tournamentSlug.value);
    });

    if (response?.success) {
        await updateTeam();
    }
}

async function deleteTeam() {
    const message = isOwner.value ?
        "Êtes-vous sûr de vouloir supprimer l'équipe ? Les membres invités en seront exclus." :
        "Êtes-vous sûr de vouloir quitter cette équipe ?";

    if (!confirm(message)) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await TeamService.remove(tournamentSlug.value);
    });

    if (response?.success) {
        await updateTeam();
    }
}

async function kickMember(memberIndex: number, type: "staff" | "members" = "members") {
    if (!confirm("Êtes-vous sûr de vouloir expulser ce membre de votre équipe ?")) {
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

<style scoped lang="scss">
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
            flex-wrap: wrap;
            

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
            width: 318px;

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
