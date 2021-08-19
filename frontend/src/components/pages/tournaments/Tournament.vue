<template>
    <SCard class="tournament">
        <img
            v-if="tournament.settings?.logo"
            alt="logo"
            class="logo"
            :src="logoUrl"
        >
        <div
            v-else
            class="empty-logo"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'trophy']"
            />
        </div>
        <div class="content">
            <h2>
                {{ tournament.name }}
            </h2>
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
                <li><strong>Aucune équipe</strong> inscrite</li>
                <li v-if="tournament.informations?.rulesUrl">
                    <a
                        :href="tournament.informations.rulesUrl"
                        target="_blank"
                        @click.stop
                    >Afficher le règlement</a>
                </li>
            </ul>
            <ul class="dates">
                <li v-if="tournament.dates?.subscriptionClose">
                    <span class="type">Fin des inscriptions :</span>
                    {{ subscriptionDateText }}
                </li>
                <li v-if="tournament.dates?.start">
                    <span class="type">Début :</span>
                    {{ tournament.dates?.start }}
                </li>
                <li v-if="tournament.dates?.playDays">
                    <span class="type">Jours de matchs :</span>
                    {{ tournament.dates?.playDays }}
                </li>
                <li v-if="tournament.dates?.final">
                    <span class="type">Finale :</span>
                    {{ tournament.dates?.final }}
                </li>
            </ul>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/Card.vue";
import { Markdown, Tournament } from "@/modules";
import * as TournamentService from "@/services/tournament";

export default defineComponent({
    name: "STournament",
    components: { FontAwesomeIcon, SCard },
    props: {
        tournament: {
            required: true,
            type: Object as PropType<Tournament.TTournament>
        }
    },
    setup(props) {
        const makePlural = (value: number, name: string) => {
            return (value > 1) ? `${ value } ${ name }s` : `${ value } ${ name }`;
        };

        const team = computed(() => {
            if (!props.tournament.game || !props.tournament.game.team.playersNumber) {
                return "";
            }

            let string = `*${ makePlural(props.tournament.game.team.playersNumber, "joueur") }* par équipes`;

            if (props.tournament.game.team.substitutesNumber) {
                string += ` + *${ makePlural(props.tournament.game.team.substitutesNumber, "remplaçant") }*`;
            }

            return string;
        });

        const logoUrl = computed(() => {
            return TournamentService.getLogoUrl({ id: props.tournament._id, logo: props.tournament.settings.logo });
        });

        const subscriptionDateText = computed(() => {
            if (!props.tournament.dates?.subscriptionClose) {
                return "";
            }

            const date = new Date(props.tournament.dates.subscriptionClose);

            const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            return `${ days[date.getDay()] } ${ date.getDate() } ${ months[date.getMonth()] }`;
        });

        return {
            logoUrl,
            markdownProcess: Markdown.process,
            subscriptionDateText,
            team
        };
    }
});
</script>

<style scoped lang="scss">
.tournament {
    width: 100%;
    position: relative;
    padding: var(--length-padding-m);
    box-sizing: border-box;
    display: flex;
    gap: var(--length-gap-l);
    align-items: center;

    @media (max-width: 899px) {
        flex-direction: column;
    }

    .logo {
        object-fit: contain;
        height: 128px;
        width: 192px;
    }

    .empty-logo {
        height: 128px;
        width: 192px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: var(--color-content-litest);
            width: 96px;
            height: 96px;
        }
    }

    .content {
        flex-grow: 1;
        display: grid;
        column-gap: var(--length-gap-l);
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
        "title       title"
        "game        game"
        "description dates";

        @media (max-width: 899px) {
            width: 100%;
        }

        @media (max-width: 699px) {
            width: 100%;
            grid-template-columns: 1fr;
            grid-template-areas:
            "title"
            "game"
            "description"
            "dates";
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

            @media (max-width: 1099px) {
                margin-bottom: var(--length-margin-s);
            }

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

        .dates {
            grid-area: dates;
            font-weight: 600;

            .type {
                font-weight: 400;
                color: var(--color-content-softer);
            }
        }
    }
}
</style>
