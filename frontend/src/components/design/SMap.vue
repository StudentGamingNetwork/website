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
import { useLeafletMap, useLeafletTileLayer, useLeafletDisplayLayer } from "vue-use-leaflet";

import "leaflet/dist/leaflet.css";

const emit = defineEmits(["map"]);

const props = defineProps<{
    center?: [number, number]
    dragging: boolean
    keybord: boolean,
    maxZoom: number,
    scrollWheelZoom: "center" | boolean
    zoomControl: boolean
}>();

const element = ref<HTMLElement | null>(null);

const map = useLeafletMap(element, { attributionControl: false, center: props.center || [47.03, 2.52], dragging: props.dragging, keyboard: props.keybord, scrollWheelZoom: "center", zoom: 6, zoomControl: props.zoomControl });

const layerTile = useLeafletTileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 20 });


useLeafletDisplayLayer(map, layerTile);


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
