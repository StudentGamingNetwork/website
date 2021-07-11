<template>
    <SCard class="tournament">
        <img
            alt="logo"
            class="logo"
            :src="tournament.game.logoUrl"
        >
        <div class="content">
            <h2>
                {{ tournament.title }}
            </h2>
            <div class="game">
                {{ tournament.game.title }}
            </div>
            <ul class="description">
                <li v-html="markdownProcess(tournament.description.prizes)" />
                <li v-html="markdownProcess(tournament.description.team)" />
                <li><strong>{{ tournament.description.registeredTeams }} équipes</strong> inscrites</li>
                <li><a href="#">Afficher le règlement</a></li>
            </ul>
            <ul class="dates">
                <li>
                    <span class="type">Fin des inscriptions :</span>
                    {{ tournament.dates.subscriptionClose }}
                </li>
                <li>
                    <span class="type">Début :</span>
                    {{ tournament.dates.start }}
                </li>
                <li>
                    <span class="type">Jours de matchs :</span>
                    {{ tournament.dates.playDays }}
                </li>
                <li>
                    <span class="type">Finale :</span>
                    {{ tournament.dates.final }}
                </li>
            </ul>
        </div>
    </SCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SCard from "@/components/design/Card.vue";
import { Markdown, Tournament } from "@/modules";

export default defineComponent({
    name: "STournament",
    components: { SCard },
    props: {
        tournament: {
            required: true,
            type: Object as PropType<Tournament.TTournament>
        }
    },
    setup() {
        return {
            markdownProcess: Markdown.process
        };
    }
});
</script>

<style scoped lang="scss">
.tournament {
    width: 960px;
    position: relative;
    padding: var(--length-padding-m);
    box-sizing: border-box;
    display: flex;
    gap: var(--length-gap-l);
    align-items: center;

    .logo {
        inset: 0;
        object-fit: contain;
        opacity: 0.5;
        height: 128px;
        width: 192px;
    }

    .content {
        flex-grow: 1;
        display: grid;
        column-gap: var(--length-gap-l);
        grid-template-columns: 1fr 1fr;
        grid-template:
        "title       title"
        "game        game"
        "description dates";

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
