<template>
    <div class="tournament">
        <SCard class="card">
            <div class="logo">
                <img
                    v-if="tournament.settings?.logo"
                    :alt="$t('tournaments.widget.tournament.logo')"
                    :src="logoUrl"
                >
            </div>
            <div class="content">
                <div class="topsection"> 
                    <h2>
                        {{ tournament.name }}
                    </h2>
                    <SSelect
                        v-model="locale"
                        class="select"
                        :options="langs"
                        @enter="router.go(0)"
                    />
                </div>
                <div class="game">
                    {{ tournament.game?.name }}
                </div>
                <ul class="description">
                    <li
                        v-if="tournament.informations?.prizes"
                        v-html="markdownProcess(tournament.informations?.prizes)"
                    />
                    <li
                        v-if="team"
                        v-html="markdownProcess(team)"
                    />
                    <li>
                        <i18n-t keypath="tournaments.widget.tournament.teamRegistred">
                            <template #strong>
                                <strong>{{ $t("tournaments.widget.tournament.teamNumber",props.tournament.game.team.subscribed) }}</strong>
                            </template>
                        </i18n-t>
                        <template v-if="tournament.game.team.maxTeams > 0">
                            (<strong>{{ tournament.game.team.maxTeams }} >{{ $t("tournaments.widget.tournament.maxTeams") }}</strong>)
                        </template>
                    </li>
                    <li v-if="tournament.informations?.rulesUrl">
                        <a
                            :href="tournament.informations.rulesUrl"
                            target="_blank"
                            @click.stop
                        >>{{ $t("tournaments.widget.tournament.rules") }}</a>
                    </li>
                </ul>
            </div>
        </SCard>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import { TTournament } from "@/modules/tournament";
import SCard from "@/components/design/SCard.vue";
import { process as markdownProcess } from "@/modules/markdown";
import * as TournamentService from "@/services/tournament";
import { langs } from "@/locales";
import SSelect from "@/components/design/forms/SSelect.vue";

const { t } = useI18n(); 

const props = defineProps<{
    tournament: TTournament;
}>();

const router = useRouter();

const locale = useStorage("locale", "fr", localStorage); 


const team = computed(() => {
    if (!props.tournament.game || !props.tournament.game.team.playersNumber) {
        return "";
    }
    let string = `*${ t("tournaments.widget.tournament.teamComposition",{
        players: t("tournaments.widget.tournament.player", props.tournament.game.team.playersNumber)
    }) }*` ;

    if (props.tournament.game.team.substitutesNumber) {
        string += ` + *${ t("tournaments.widget.tournament.subs", props.tournament.game.team.substitutesNumber) }*`;
    }

    return string;
});

const logoUrl = computed(() => {
    return TournamentService.getLogoUrl({ id: props.tournament._id, logo: props.tournament.settings.logo });
});



    
</script>

<style scoped lang="css">
.tournament {
    display: grid;

    .card {
        padding: var(--length-padding-m);
        display: flex;
        gap: var(--length-gap-l);
        align-items: center;

        img {
            width: 128px;
            height: 128px;
            object-fit: contain;
        }

        .content {
            .topsection {
                display: flex;
                justify-content: space-around;
                align-items: center;
                gap: var(--length-gap-l);
            }
            h2 {
                grid-area: title;

                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
                padding: 0;

                background: var(--gradient);
                display: inline-block;
                color: transparent;
                -webkit-background-clip: text;
                text-shadow: 0 0 16px var(--color-primary-lite);
            }

            .game {
                grid-area: game;
                text-transform: uppercase;
                font-size: 0.8rem;
                font-weight: 200;
                opacity: 0.5;
                padding-bottom: var(--length-padding-s);
            }

            ul {
                margin: 0;
                padding: 0;
                list-style: none;
                font-size: 0.9rem;
                display: flex;
                flex-direction: column;
                gap: var(--length-gap-xs);
            }

            .description {
                color: var(--color-content-softer);
                grid-area: description;

                &::v-deep(strong) {
                    font-weight: 600;
                    color: var(--color-content);
                }

                a {
                    font-weight: 200;
                    color: var(--color-primary);
                    text-decoration: none;
                    opacity: 0.8;

                    &:hover {
                        opacity: 1;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
