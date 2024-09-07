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
                <template v-if="isTeamBased">
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
                        <SValidator :valid="!!savedTeam.members[playerIndex].username">
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
                        <SValidator :valid="!!(userStore.association || userStore.student.schoolName)">
                            Nom d'école*
                        </SValidator>
                        <SValidator :valid="!!userStore.student.name">
                            Nom et prénom*
                        </SValidator>
                        <SValidator :valid="userStore.student.status === 'validated'">
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
                <div
                    v-if="isTeamBased"
                    class="validators-column"
                >
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
            </SModalSection>
            <div class="actions">
                <SInputCopier
                    v-if="isTeamBased"
                    :content="team.settings.invitationCode"
                    title="Code d'invitation joueur"
                />
                <SInputCopier
                    v-if="isTeamBased"
                    :content="team.settings.coachInvitationCode"
                    title="Code d'invitation coach"
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
                    <tr
                        v-for="(member, memberIndex) of team.members"
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
                            <span
                                v-if="member.role === 'Player'"
                                class="info"
                            >
                                (<span :class="{error: !member.username}">{{ member.username || "ID manquant" }}</span>)
                            </span>
                            <span
                                v-else
                                class="info"
                            >
                                ({{ member.role }})
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
                </table>
            </div>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { assign, cloneDeep, findIndex, isMatch } from "lodash";
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

export default defineComponent({
    name: "STeamCard",
    components: {
        FontAwesomeIcon,
        SAvatarPicker,
        SButton,
        SCard,
        SCopier,
        SInput,
        SInputCopier,
        SModalSection,
        SModalSectionDescription,
        SModalSectionTitle,
        SSectionTitle,
        SValidator
    },
    props: {
        tournament: {
            required: true,
            type: Object as PropType<Tournament.TTournament>
        }
    },
    async setup(props) {
        const router = useRouter();
        const userStore = User.useStore();
        const stateStore = State.useStore();
        const tournamentSlug = ref(router.currentRoute.value.params.slug as string);

        const savedTeam = reactive(Team.Lib.makeObject({}));
        const team = reactive<Team.TTeam>(cloneDeep(savedTeam));

        const isConnected = computed(() => {
            return !!userStore._id;
        });

        const hasTeam = computed(() => {
            return !!team._id;
        });

        const isOwner = computed(() => {
            return userStore._id === team.owner;
        });

        const playerIndex = computed(() => {
            return findIndex(team.members, ["user._id", userStore._id]);
        });

        const logoUrl = computed(() => {
            if (!team.settings?.logo) {
                return "";
            }
            return TeamService.getLogoUrl({ id: team._id, logo: team.settings.logo });
        });

        await updateTeam();

        const hasChanged = computed(() => {
            return !isMatch(savedTeam, team);
        });

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

        const uploadLogo = async (file: File) => {
            const response = await Toast.testRequest(async () => {
                return await TeamService.uploadLogo({ file }, team._id);
            });

            if (response?.success) {
                team.settings.logo = response.logo;
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

        const isTeamBased = computed(() => {
            return props.tournament.game.team.playersNumber > 1;
        });

        function isMemberReady(member: { role: string; user: User.TCompleteUser; username: string }): boolean {
            if (!member.username) {
                return false;
            }

            if (!member.user.platforms.discord && member.role === "Player") {
                return false;
            }

            if (!member.user.student.name && member.role === "Player") {
                return false;
            }

            if (!(member.user.student.schoolName || member.user.association) && member.role === "Player") {
                return false;
            }

            if (member.user.student.status !== "validated" && member.role === "Player") {
                return false;
            }

            return true;
        }

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

        async function kickMember(memberIndex: number) {
            if (!confirm("Êtes-vous sûr de vouloir expulser ce membre de votre équipe ?")) {
                return;
            }

            team.members[memberIndex].kick = true;

            const response = await Toast.testRequest(async () => {
                return await TeamService.update(team);
            });

            if (response?.success) {
                await updateTeam();
            }
        }

        return {
            createTeam,
            deleteTeam,
            getUserAvatarUrl: UserService.getAvatarUrl,
            hasChanged,
            hasTeam,
            InputValidators,
            isConnected,
            isMemberReady,
            isOwner,
            isTeamBased,
            isTeamReady,
            joinTeam,
            kickMember,
            logoUrl,
            markReady,
            markUnready,
            playerIndex,
            savedTeam,
            sendUpdate,
            stateStore,
            team,
            uploadLogo,
            userStore
        };
    }
});
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
        }
    }
}
</style>
