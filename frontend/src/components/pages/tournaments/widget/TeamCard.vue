<template>
    <template v-if="!hasTeam">
        <SCard class="join">
            <div class="title">
                Prêt à rejoindre l'arène ?
            </div>
            <div class="join">
                <SInput
                    v-model="student.name"
                    autocomplete="false"
                    :modified="student.name !== userStore.student.name"
                    title="Prénom et nom"
                    @enter="sendUpdate"
                />
                <SInput
                    v-if="associationStore?.school?.name"
                    disabled
                    :model-value="associationStore?.school?.name"
                    title="École"
                />
                <div
                    v-else
                    class="school"
                >
                    <SInput
                        v-model="student.schoolName"
                        autocomplete="false"
                        :modified="student.schoolName !== userStore.student.schoolName"
                        title="École"
                        @enter="sendUpdate"
                    />
                    <SCard
                        v-if="schools.length > 0 || searchLoading"
                        class="suggestion"
                    >
                        <SLoading
                            v-if="searchLoading"
                            class="loading"
                        />
                        <ul v-else>
                            <li
                                v-for="school of schools"
                                :key="school.name"
                                tabindex="-1"
                                @click="student.schoolName = school.name"
                            >
                                {{ school.name }}
                            </li>
                        </ul>
                    </SCard>
                </div>
                <SModalSectionDescription>
                    <strong>Note :</strong> Si votre école n'est pas suggérée, ce n'est pas grave, inscrivez-la quand même.
                </SModalSectionDescription>
                <SInput
                    v-model="username"
                    :modified="username !== ''"
                    :title="tournament.game.username"
                    @enter="sendUpdate"
                />
            </div>
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
        </SCard>
    </template>
    <template v-else>
        <SCard class="join">
            <div class="message">
                <div class="header">
                    Les inscriptions sont terminées 🏆 !
                </div>
                <SModalSectionDescription class="description">
                    <br>
                    <template v-if="team.state.validated">
                        <template v-if="isTeamReady">
                            Vous êtes correctement inscrit au tournoi 🥳 ! Pensez à mettre à jour vos informations manquantes s'il y en a.<br><br>
                            Pour participer, merci de rejoindre le serveur Discord à l'adresse suivante : <a href="https://discord.gg/YePmUx2E5a">https://discord.gg/YePmUx2E5a</a>
                        </template>
                        <template v-else>
                            Les inscriptions sont maintenant terminées et votre équipe est bien inscrite au tournoi.<br><br>
                            Attention! Il vous reste des informations à remplir ci-dessous. Merci de compléter ces informations afin de ne pas être exclus du tournoi.<br><br>
                            Pour participer, merci de rejoindre le serveur Discord à l'adresse suivante : <a href="https://discord.gg/YePmUx2E5a">https://discord.gg/YePmUx2E5a</a>
                        </template>
                    </template>
                    <template v-else>
                        Votre équipe n'a pas été validée pour participer au tournoi l'Académie 2.<br><br>
                        Les inscriptions au tournoi sont terminées et les informations de votre équipe étaient incomplètes ou invalides.<br><br>
                        Si vous pensez qu'il s'agit d'une erreur, vous pouvez nous contacter sur Discord avant le début du tournoi le mardi 16/11.<br>
                        <a href="https://discord.gg/YePmUx2E5a">https://discord.gg/YePmUx2E5a</a>
                    </template>
                </SModalSectionDescription>
            </div>
            <template v-if="isTeamBased">
                <h2>Équipe</h2>
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
                <SInputCopier
                    :content="team.settings.invitationCode"
                    title="Code d'invitation"
                />
                <SButton
                    class="delete-button"
                    danger
                    outlined
                    @click="deleteTeam"
                >
                    {{ isOwner ? "Dissoudre l'équipe" : "Quitter l'équipe" }}
                </SButton>
            </template>
            <h2>Joueur</h2>
            <SInput
                v-model="team.members[playerIndex].username"
                :modified="team.members[playerIndex].username !== savedTeam.members[playerIndex].username"
                :title="tournament.game.username"
                @enter="sendUpdate"
            />
            <SInput
                v-model="platforms.discord"
                :modified="platforms.discord !== userStore.platforms.discord"
                title="Identifiant Discord"
                :validators="[InputValidators.Discord()]"
                @enter="sendUpdate"
            />
            <SModalSectionDescription>
                <strong>Attention : </strong> Vous devez <a
                    href="https://discord.gg/YePmUx2E5a"
                    target="_blank"
                >rejoindre le Discord</a> pour participer !
            </SModalSectionDescription>
            <h2>Statut étudiant</h2>
            <SInput
                v-model="student.name"
                autocomplete="false"
                :modified="student.name !== userStore.student.name"
                title="Prénom et nom"
                @enter="sendUpdate"
            />
            <SInput
                v-if="associationStore?.school?.name"
                disabled
                :model-value="associationStore?.school?.name"
                title="École"
            />
            <div
                v-else
                class="school"
            >
                <SInput
                    v-model="student.schoolName"
                    autocomplete="false"
                    :modified="student.schoolName !== userStore.student.schoolName"
                    title="École"
                    @enter="sendUpdate"
                />
                <SCard
                    v-if="schools.length > 0 || searchLoading"
                    class="suggestion"
                >
                    <SLoading
                        v-if="searchLoading"
                        class="loading"
                    />
                    <ul v-else>
                        <li
                            v-for="school of schools"
                            :key="school.name"
                            tabindex="-1"
                            @click="student.schoolName = school.name"
                        >
                            {{ school.name }}
                        </li>
                    </ul>
                </SCard>
            </div>
            <SCertificatePicker
                :url="certificateUrl"
                @file-change="uploadCertificate"
            />
            <div class="status">
                <span class="soft">État :</span>
                <span
                    v-if="userStore.student.status === 'processing'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'eye']" /> Vérification en cours</span>
                <span
                    v-else-if="userStore.student.status === 'validated'"
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'check']" /> Certificat validé jusqu'en Septembre</span>
                <span
                    v-else-if="userStore.student.status === 'rejected'"
                    class="main error"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> Certificat rejeté (veuillez en fournir un autre)</span>
                <span
                    v-else
                    class="main"
                ><FontAwesomeIcon :icon="['fas', 'times']" /> Aucun certificat fourni</span>
            </div>
            <div class="buttons">
                <SButton
                    class="button"
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
                <SButton
                    v-if="!isTeamBased"
                    class="delete-button"
                    danger
                    outlined
                    @click="deleteTeam"
                >
                    Quitter le tournoi
                </SButton>
            </div>
            <SModalSectionDescription>
                Une fois que tout est en ordre, cliquez sur "Marquer prêt" pour que les admins valident votre
                équipe.
            </SModalSectionDescription>
        </SCard>
        <SCard class="members">
            <h2>Joueurs</h2>
            <div
                v-for="(member, memberIndex) of team.members"
                :key="member.user._id"
                class="member"
            >
                <div class="user">
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
                </div>
                <div class="user">
                    {{ member.user.student.name }}
                    <span class="info">(<span
                        :class="{error: !(member.user.association || member.user.student.schoolName)}"
                    >{{
                        member.user.association?.school.name || member.user.student.schoolName || "École manquante"
                    }}</span>)</span>
                </div>
                <div class="actions">
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
                </div>
            </div>
        </SCard>
    </template>
</template>

<script lang="ts">
export default {
    name: "STeamCard"
};
</script>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { assign, cloneDeep, debounce, findIndex, isMatch } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import SButton from "@/components/design/forms/Button.vue";
import { Association, Team, Toast, User } from "@/modules";
import * as TeamService from "@/services/team";
import SInput from "@/components/design/forms/Input.vue";
import * as InputValidators from "@/utils/validators";
import { TTournament } from "@/modules/tournament";
import SCertificatePicker from "@/components/design/forms/CertificatePicker.vue";
import SInputCopier from "@/components/design/forms/InputCopier.vue";
import SValidator from "@/components/design/forms/Validator.vue";
import SCopier from "@/components/design/forms/Copier.vue";
import { getAvatarUrl as getUserAvatarUrl } from "@/services/user";
import SModalSectionDescription from "@/components/design/modal/SectionDescription.vue";
import SLoading from "@/components/design/Loading.vue";

const router = useRouter();
const tournamentSlug = ref(router.currentRoute.value.params.slug as string);
const userStore = User.useStore();
const associationStore = Association.useStore();
const toastStore = Toast.useStore();

const savedTeam = reactive(Team.Lib.makeObject({}));
const team = reactive<Team.TTeam>(cloneDeep(savedTeam));
const student = reactive(cloneDeep(userStore.student));
const platforms = reactive(cloneDeep(userStore.platforms));

const username = ref("");

const props = defineProps<{
    tournament: TTournament;
}>();

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

const certificateUrl = computed(() => {
    return userStore.student.certificate ? userStore.getCertificateUrl : "";
});

const isTeamBased = computed(() => {
    return props.tournament.game.team.playersNumber > 1;
});

const debounceSearch = debounce(updateSearch, 500);
const searchLoading = ref(false);

const schools = ref([] as Array<{ name: string }>);

watch(
    () => student.schoolName,
    () => {
        searchLoading.value = true;
        debounceSearch();
    }
);

watch (
    () => platforms.discord,
    () => {
        platforms.discord = platforms.discord.replace(" #", "#");
    }
);

async function updateSearch() {
    schools.value = await TeamService.searchSchools(tournamentSlug.value, student.schoolName);
    searchLoading.value = false;
}

const uploadCertificate = async (file: File) => {
    await userStore.uploadCertificate(file);
    await userStore.init();
};

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

    team.members[playerIndex.value].username = username.value;

    await sendUpdate();
}

async function createTeam() {
    const response = await Toast.testRequest(async () => {
        return await TeamService.create(tournamentSlug.value);
    });

    if (response?.success) {
        await updateTeam();
    }

    team.members[playerIndex.value].username = username.value;

    await sendUpdate();
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

    if (!["validated", "processing"].includes(member.user.student.status)) {
        return false;
    }

    return true;
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

const markReady = async () => {
    if (!isTeamReady.value) {
        return;
    }
    team.state.ready = true;
    await sendUpdate();
};

const markUnready = async () => {
    team.state.ready = false;
    await sendUpdate();
};

const sendUpdate = async () => {
    toastStore.activated = false;

    await userStore.update({ student });
    await userStore.updatePlatforms(platforms);
    await userStore.init();

    toastStore.activated = true;

    const response = await Toast.testRequest(async () => {
        return await TeamService.update(team);
    });

    if (response?.success) {
        await updateTeam();
    }
};

onMounted(async () => {
    await updateTeam();
});
</script>

<style scoped lang="scss">
h2 {
    font-weight: 100;
    background: var(--gradient);
    display: inline-block;
    color: transparent;
    text-transform: uppercase;
    font-size: 1.5rem;
    -webkit-background-clip: text;
    margin: 0;
    text-shadow: 0 0 16px var(--color-primary-lite);
    padding: 0 var(--length-padding-s);
}

.join {
    padding: var(--length-padding-m);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--length-gap-l);

    .message {
        .header {
            font-weight: 600;
            font-size: 1.8rem;
        }

        .description {
            font-size: 1.2rem;

            a:hover {
                text-decoration: none;
            }

            b {
                font-weight: 600;
                color: var(--color-primary);
            }
        }
    }

    .title {
        text-align: center;
    }

    .buttons {
        display: flex;
        gap: var(--length-gap-l);
        justify-content: center;
        flex-wrap: wrap;
    }

    .delete-button {
        max-width: 320px;
    }

    .school {
        position: relative;

        .suggestion {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            box-sizing: border-box;
            max-width: 320px;
            z-index: 10;

            .loading {
                margin: var(--length-margin-m);
            }

            ul {
                padding: 0;
                margin: 0;
                list-style: none;

                li {
                    cursor: pointer;
                    padding: var(--length-padding-xxs) var(--length-padding-s);

                    &:hover {
                        background: var(--color-background-2);
                    }
                }
            }
        }

        &:focus-within {
            .suggestion {
                display: block;
            }
        }
    }

    .status {
        font-size: 0.9rem;

        .soft {
            color: var(--color-content-softer);
        }

        .main {
            padding-left: var(--length-padding-xxs);

            &.error {
                color: var(--color-error-content);
            }
        }
    }
}

.members {
    padding: var(--length-padding-m);
    display: flex;
    gap: var(--length-gap-m);
    flex-direction: column;

    .member {
        display: flex;
        flex-direction: column;

        .user {
            display: flex;
            gap: var(--length-gap-m);
            align-items: center;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--length-gap-m);
            align-items: center;
        }

        &:not(:first-of-type) {
            padding-top: var(--length-padding-s);
            border-top: 1px solid var(--color-content-litest);
        }
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

    .error {
        color: var(--color-error-content);
    }

    .avatar {
        grid-area: avatar;
        height: 32px;
        width: 32px;
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

        &:hover .gradient {
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
</style>
