<template>
    <div class="map-wrapper">
        <div
            id="map"
            ref="element"
        />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits, onMounted } from "vue";
import { useLeafletMap, useLeafletTileLayer, useLeafletDisplayLayer, useLeafletDisplayControl, useLeafletLayersControl } from "vue-use-leaflet";

import "leaflet/dist/leaflet.css";

const emit = defineEmits(["map"]);

const props = defineProps<{
    center?: [number, number]
    dragging: boolean
    layerControl: boolean
    maxZoom: number,
    scrollWheelZoom: "center" | boolean,
    zoomControl: boolean
}>();

const element = ref<HTMLElement | null>(null);

const map = useLeafletMap(element, { attributionControl: false, center: props.center || [47.03, 2.52], dragging: props.dragging, scrollWheelZoom: "center", zoom: 6, zoomControl: props.zoomControl });

function createTileLayer(url: string, options: Record<string, unknown>) {
    return useLeafletTileLayer(url, { maxZoom: props.maxZoom || 20, ...options });
}

const tileLayers = [
    {
        name: "Open Street Map",
        options: {},
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    {
        name: "Stadia Maps satellite",
        options: { ext: "jpg", maxZoom: 20 },
        url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
    },
    {
        name: "Geoportail France",
        options: { format: "image/png", style: "normal" },
        url: "https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
    }
];



const createdTileLayers = tileLayers.map(({ options, url }) => createTileLayer(url, options));

const layersControl = useLeafletLayersControl(
    tileLayers.map((layer, index) => ({
        name: layer.name,
        layer: createdTileLayers[index]
    }))
);


useLeafletDisplayControl(map, layersControl, {
    controls: true,
    initialValue: props.layerControl
});


useLeafletDisplayLayer(map, createdTileLayers[0]);


onMounted(() => {
    emit("map", map);
}); 

</script>

<style lang="css">

.map-wrapper {
    #map {
        z-index: 1;
        width: 100%;
        height: 100%;
    }
}

.leaflet-pane {
    transition: none;
}

.leaflet-control-layers {
    transition: none;
}
</style>
