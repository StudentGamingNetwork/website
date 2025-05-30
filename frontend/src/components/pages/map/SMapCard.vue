<template>
    <SCard class="wrapper-map">
        <SMap
            v-model="map"
            class="map"
            :dragging="true"
            :keybord="true"
            :max-zoom="19"
            :scroll-wheel-zoom="'center'"
            :zoom-control="true"
            @map="defineMap"
        />
        <div class="dashboard">
            <div class="section-wrapper">
                <h2>{{ $t("components.pages.map.federation.title") }}</h2>
                <h3>{{ $t("components.pages.map.federation.regions") }}</h3>
                <div class="filter-wrapper">
                    <SToggle
                        v-for="key in Object.keys(visibleRegions)"
                        :key="key"
                        v-model="visibleRegions[key]"
                    >
                        {{ getRegionName(key) }}
                    </SToggle>
                </div>
            </div>
            <div class="section-wrapper">
                <h2>{{ $t("components.pages.map.tournament.title",2) }}</h2>
                <h3>{{ $t("components.pages.map.tournament.status") }}</h3>
                <div class="filter-wrapper">
                    <SToggle
                        v-for="status in Object.keys(visibleTournamentStatuses)"
                        :key="status"
                        v-model="visibleTournamentStatuses[status]"
                    >
                        {{ $t(`components.pages.map.tournament.${status}`) }}
                    </SToggle>
                </div>
                <h3>{{ $t("components.pages.map.tournament.games") }}</h3>
                <div class="filter-wrapper">
                    <SToggle
                        v-for="game in Object.keys(visibleGames)"
                        :key="game"
                        v-model="visibleGames[game]"
                    >
                        {{ game }}
                    </SToggle>
                </div>
            </div>
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import {
    useLeafletDisplayLayer,
    useLeafletLayerPopup,
    UseLeafletMapReturn,
    useLeafletMarker,
    UseLeafletMarkerReturn,
    useLeafletIcon,
    useLeafletDivIcon,
    useLeafletRemoveLayer
} from "vue-use-leaflet";
import { useRouter } from "vue-router";
import SCard from "@/components/design/SCard.vue";
import SMap from "@/components/design/SMap.vue";
import * as AssociationService from "@/services/association";
import * as TournamentService from "@/services/tournament";
import { TAssociation } from "@/modules/association";
import { getRegionName } from "@/services/association";
import SToggle from "@/components/design/SToggle.vue";
import { ETournamentType } from "@/services/tournament";
import { TTournament } from "@/modules/tournament";
import i18n from "@/locales";

const iconAssociation = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`;
const iconTournament = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>`;

const router = useRouter();

const map = ref<UseLeafletMapReturn>();

const associations = ref<TAssociation[]>([]);
const tournaments = ref<TTournament[]>([]);
const visibleGames = reactive<Record<string, boolean>>({});

const associationMarkers = ref<UseLeafletMarkerReturn[]>([]);

const visibleRegions = reactive<Record<string, boolean>>(
    Object.fromEntries(
        Object.keys(AssociationService.regionNames)
            .filter((key) => key !== "none")
            .map((key) => [key, true])
    )
);

const visibleTournamentStatuses = reactive<Record<string, boolean>>({
    coming: true,
    current: true,
    past: true
});


const previousFilteredAssociations = ref<TAssociation[]>([]);

const filteredAssociations = computed<TAssociation[]>(() =>
    associations.value.filter(
        (association) => visibleRegions[association.federation.region]
    )
);

const filteredTournaments = computed<TTournament[]>(() =>
    tournaments.value.filter((tournament) => {
        const state = getTournamentState(tournament);
        return (
            visibleTournamentStatuses[state] && visibleGames[tournament.game.name]
        );
    })
);


onMounted(async () => {
    associations.value = (
        await AssociationService.search({
            limit: 128,
            search: "",
            skip: 0
        })
    ).associations;

    previousFilteredAssociations.value = filteredAssociations.value;

    for (const association of filteredAssociations.value) {
        displayMarkerAssociation(association);
    }


    tournaments.value = await TournamentService.list(ETournamentType.Coming);
    tournaments.value.push(
        ...(await TournamentService.list(ETournamentType.Current))
    );
    tournaments.value.push(
        ...(await TournamentService.list(ETournamentType.Past))
    );

    for (const tournament of filteredTournaments.value) {
        displayMarkerTournament(tournament);
    }


    const games = new Set(tournaments.value.filter((tournament) => tournament.position && tournament.position?.latitude !== 0 && tournament.position?.longitude !== 0).map((tournament) => tournament.game));
    
    games.forEach((game) => {
        visibleGames[game.name] = true;
    });
});

watch(visibleRegions, () => {
    const newFilteredAssociations = new Set(filteredAssociations.value);

    previousFilteredAssociations.value.forEach((association) => {
        if (!newFilteredAssociations.has(association)) {
            const markerIndex = associationMarkers.value.findIndex(
                (marker) => marker.value?.options.title === association.name
            );
            if (markerIndex !== -1) {
                useLeafletRemoveLayer(associationMarkers.value[markerIndex])();
                associationMarkers.value.splice(markerIndex, 1);
            }
        }
    });

    filteredAssociations.value.forEach((association) => {
        if (!previousFilteredAssociations.value.includes(association)) {
            displayMarkerAssociation(association);
        }
    });

    previousFilteredAssociations.value = Array.from(newFilteredAssociations);
});

watch([visibleTournamentStatuses, visibleGames], () => {
    const newFilteredTournaments = new Set(filteredTournaments.value);

    associationMarkers.value = associationMarkers.value.filter((marker) => {
        const tournament = tournaments.value.find(
            (t) => t.name === marker.value?.options.title
        );
        if (tournament && !newFilteredTournaments.has(tournament)) {
            useLeafletRemoveLayer(marker)();
            return false;
        }
        return true;
    });

    filteredTournaments.value.forEach((tournament) => {
        if (
            !associationMarkers.value.some(
                (marker) => marker.value?.options.title === tournament.name
            )
        ) {
            displayMarkerTournament(tournament);
        }
    });
});

function defineMap(mapRef: UseLeafletMapReturn) {
    map.value = mapRef;
}

function handleButtonClick(base: string, slug: string) {
    router.push(`/${ base }/${ slug }`);
}

function displayMarkerAssociation(association: TAssociation) {
    if (!association.position?.latitude || !association.position?.longitude) {
        return;
    }

    const icon = createIcon(association._id, association.logo);

    const marker = useLeafletMarker(
        {
            lat: association.position.latitude,
            lng: association.position.longitude
        },
        {
            title: association.name,
            draggable: false,
            icon: icon
        }
    );

    const popupContent = createPopupContentAssociation(association);

    useLeafletLayerPopup(marker, popupContent);
    associationMarkers.value.push(marker);
    useLeafletDisplayLayer(map.value, marker);
}

function displayMarkerTournament(tournament: TTournament) {
    if (!tournament.position?.latitude || !tournament.position?.longitude) {
        return;
    }

    const icon = createIcon(tournament._id, tournament.settings.logo, true);

    const marker = useLeafletMarker(
        {
            lat: tournament.position.latitude,
            lng: tournament.position.longitude
        },
        {
            title: tournament.name,
            draggable: false,
            icon: icon
        }
    );

    const popupContent = createPopupContentTournament(tournament);

    useLeafletLayerPopup(marker, popupContent);
    associationMarkers.value.push(marker);
    useLeafletDisplayLayer(map.value, marker);
}

function createIcon(_id: string, logoURL: string, isTournament = false) {
    if (!logoURL){
        return useLeafletDivIcon(
            isTournament ? iconTournament : iconAssociation,
            {
                className: `leaflet-default-marker ${
                    isTournament ? "tournament" : "association"
                }`,
                iconAnchor: [13, 13],
                iconSize: isTournament ? [30, 30] : [26, 26]
            }
        );
    }

    const logo = isTournament ? TournamentService.getLogoUrl({
        id: _id,
        logo: logoURL
    }) : AssociationService.getLogoUrl({
        id: _id,
        logo: logoURL
    });

    return useLeafletIcon(logo
        ,
        {
            className: "leaflet-logo-border",
            iconSize: [30, 30]
        }
    );
}

function createPopupContentAssociation(association: TAssociation) {
    const popupContent = document.createElement("div");
    popupContent.className = "map-popup-card";
    popupContent.innerHTML = `
        <h2>${ association.name }</h2>
        <span class="subtitle">${ i18n.global.t("components.pages.map.federation.region", { region: AssociationService.getRegionName(
            association.federation.region) }) }</span>
        <span class="description">${ i18n.global.t("components.pages.map.federation.school",{ school: association.school.name }) }</span>
        <button class="outlined">${ i18n.global.t("components.pages.map.access") }</button>
    `;

    const button = popupContent.querySelector("button");
    button?.addEventListener("click", () =>
        handleButtonClick("association", association._id || "")
    );

    return popupContent;
}

function createPopupContentTournament(tournament: TTournament) {
    const state = getTournamentState(tournament);
    let inscriptions = "";
    if (state === "coming"){
        inscriptions = `${ i18n.global.t("components.pages.map.tournament.inscription.open", { date: new Date(tournament.dates.subscriptionClose).toLocaleDateString() }) }  `;
    }
    else {
        inscriptions = i18n.global.t("components.pages.map.tournament.inscription.closed");
    }

    const popupContent = document.createElement("div");
    popupContent.className = "map-popup-card";
    popupContent.innerHTML = `
        <h2>${ tournament.name }</h2>
        <span class="subtitle">${ i18n.global.t("components.pages.map.tournament.game", { game: tournament.game.name }) }</span>
        <span class="description">${ inscriptions }</span>
        <button class="outlined">${ i18n.global.t("components.pages.map.access") }</button>
    `;

    const button = popupContent.querySelector("button");
    button?.addEventListener("click", () =>
        handleButtonClick("tournament", tournament._id || "")
    );

    return popupContent;
}

function getTournamentState(tournament: TTournament): string {
    const now = new Date();
    const startDate = new Date(tournament.dates.subscriptionClose);

    if (!tournament.dates.subscriptionClose || now < startDate) {
        return "coming";
    }
    else if (now >= startDate) {
        return "current";
    }
    else {
        return "past";
    }
}
</script>

<style scoped lang="css">
.wrapper-map {
    display: flex;
    margin: auto;

    .map {
        min-width: 960px;
        aspect-ratio: 16 / 12;
        height: 100%;
    }

    .dashboard {
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);
        padding: var(--length-padding-m);

        .section-wrapper {
            height: fit-content;
            display: flex;
            flex-direction: column;
            padding-bottom: var(--length-padding-m);
            border-bottom: 2px solid var(--color-content-softest);
            gap: var(--length-gap-s);

            .filter-wrapper {
                display: flex;
                flex-wrap: wrap;
                gap: var(--length-gap-s);
            }
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
            padding: 0;
            background: var(--gradient);
            display: inline-block;
            color: transparent;
            background-clip: text;
            text-shadow: 0 0 16px var(--color-primary-lite);
        }

        h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0;
            padding: 0;
        }
    }
}
</style>

<style lang="css">
.leaflet-popup {
    .leaflet-popup-content-wrapper {
        width: 256px;
        background: var(--color-background-1);
        border-radius: var(--lenght-radius-base);
        border: 2px solid var(--color-background-2);
        overflow: hidden;
    }
}

.leaflet-popup-close-button span {
    color: var(--color-content);
}

.map-popup-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-s);
    padding: var(--length-padding-xs);

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        padding: 0;
        background: var(--gradient);
        display: inline-block;
        color: transparent;
        background-clip: text;
        text-shadow: 0 0 16px var(--color-primary-lite);
    }

    span {
        color: var(--color-content);

        &.subtitle {
            font-size: 0.8rem;
            font-weight: 600;
            opacity: 0.5;
        }

        &.description {
            font-size: 0.8rem;
        }
    }

    button {
        cursor: pointer;

        height: 36px;
        padding: 0 var(--length-padding-m);
        box-sizing: border-box;
        border: none;
        border-radius: var(--lenght-radius-base);

        background: none;
        color: var(--color-button-content);
        --color-button-content: var(--color-content);
        --color-button-border: var(--color-content-softer);

        font-size: 0.9rem;
        line-height: 32px;
        font-weight: 600;

        &.outlined {
            border: 2px solid var(--color-button-border);
            padding: 0 calc(var(--length-padding-m) - 2px);
        }

        &:hover {
            border-color: var(--color-button-content);
        }
    }
}

.leaflet-popup-tip {
    background: var(--color-background-1);
    border: 2px solid var(--color-background-2);
    border-top: none;
}

.leaflet-logo-border {
    object-fit: cover;
    background-color: var(--color-primary);
    border: 2px solid var(--color-content-softer);
    border-radius: 50%;
}

.leaflet-default-marker {

    svg {
        filter: drop-shadow(1px 1px 1px var(--color-background-0));
    }

    &.association{
        fill: var(--color-primary);
    }

    &.tournament{
        fill: var(--color-info);
    }
}
</style>
