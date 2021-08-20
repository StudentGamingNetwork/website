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
            </div>
        </div>
        <div
            v-else
            class="team"
        >
            <SSectionTitle>Votre équipe</SSectionTitle>
            <SModalSection class="settings">
                <SModalSectionTitle>Paramètre de l'équipe</SModalSectionTitle>
                <SInput
                    v-model="team.settings.name"
                    :disabled="!isOwner"
                    :modified="team.settings.name !== savedTeam.settings.name"
                    title="Nom d'équipe"
                    @enter="sendUpdate"
                />
                <SInput
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
                    title="Identifiant ingame"
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
                        class="button"
                        disabled
                        outlined
                    >
                        Marquer prêt
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
                        <SValidator :valid="!!savedTeam.settings.name">
                            Nom d'équipe
                        </SValidator>
                        <SValidator :valid="!!savedTeam.settings.tag">
                            TAG d'équipe
                        </SValidator>
                        <SValidator :valid="!!savedTeam.members[playerIndex].username">
                            Identifiant de jeu
                        </SValidator>
                        <SValidator :valid="savedTeam.members.length >= tournament.game.team.playersNumber">
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
                <div class="validators-column">
                    <div
                        v-for="(number, index) in Math.max(tournament.game.team.playersNumber, team.members.length)"
                        :key="index"
                    >
                        <template v-if="team.members[index]">
                            <SValidator :valid="isMemberReady(team.members[index])">
                                Joueur {{ number }} : {{ team.members[index].user.username }}
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
                    :content="team.settings.invitationCode"
                    title="Code d'invitation"
                />
                <template v-if="isOwner">
                    <SButton
                        danger
                        outlined
                    >
                        Dissoudre l'équipe
                    </SButton>
                </template>
                <template v-else>
                    <SButton
                        danger
                        outlined
                    >
                        Quitter l'équipe
                    </SButton>
                </template>
            </div>
            <div class="members">
                <table class="members-table">
                    <tr>
                        <th>Joueur</th>
                        <th>Étudiant</th>
                        <th>Contact</th>
                        <th>Statut</th>
                    </tr>
                    <tr
                        v-for="member of team.members"
                        :key="member.user._id"
                    >
                        <td>
                            {{ member.user.username }} <span class="info">(IG: {{ member.username }})</span>
                        </td>
                        <td>
                            {{ member.user.student.name }} <span class="info">({{
                                member.user.association?.school.name || member.user.student.schoolName
                            }})</span>
                        </td>
                        <td>
                            <div class="contact">
                                <FontAwesomeIcon :icon="['fab', 'discord']" />
                                <FontAwesomeIcon :icon="['fas', 'envelope']" />
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
import { cloneDeep, findIndex, isMatch, merge } from "lodash";
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

export default defineComponent({
    name: "STeamCard",
    components: {
        FontAwesomeIcon,
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
    async setup() {
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

        await updateTeam();

        const hasChanged = computed(() => {
            return !isMatch(savedTeam, team);
        });

        const sendUpdate = async () => {
            if (!hasChanged.value) {
                return;
            }

            const response = await Toast.testRequest(async () => {
                return await TeamService.update(team, team._id);
            });

            if (response?.success) {
                await updateTeam();
            }
        };

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

        async function updateTeam() {
            if (!isConnected.value) {
                return;
            }
            const teamApi = await TeamService.get(tournamentSlug.value);
            merge(savedTeam, teamApi);
            merge(team, cloneDeep(savedTeam));
        }

        async function joinTeam() {
            const invitationCode = prompt("Entrez le code d'invitation de l'équipe. Vous pouvez le demander au chef d'équipe, il est de la forme XXXX-XXXX-XXXX-XXXX.");
        }

        async function createTeam() {
            const response = await Toast.testRequest(async () => {
                return await TeamService.create(tournamentSlug.value);
            });

            if (response?.success) {
                await updateTeam();
            }
        }

        return {
            createTeam,
            hasChanged,
            hasTeam,
            InputValidators,
            isConnected,
            isMemberReady,
            isOwner,
            joinTeam,
            playerIndex,
            savedTeam,
            sendUpdate,
            stateStore,
            team,
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

            th {
                text-align: left;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.8rem;
                color: var(--color-content-softer);
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
            }

            td {
                padding: var(--length-padding-m) 0;

                &:nth-child(1) {
                    width: 40%;
                }

                &:nth-child(2) {
                    width: 40%;
                }

                &:nth-child(3) {
                    width: 10%;
                }

                &:nth-child(4) {
                    width: 10%;
                }
            }
        }
    }
}
</style>
