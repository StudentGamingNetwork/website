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
    maxZoom: number
    scrollWheelZoom: "center" | boolean,
    zoomControl: boolean
}>();

const element = ref<HTMLElement | null>(null);

const map = useLeafletMap(element, { attributionControl: false, center: props.center || [47.03, 2.52], dragging: props.dragging, scrollWheelZoom: "center", zoom: 6, zoomControl: props.zoomControl });

const tileLayer = useLeafletTileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: props.maxZoom || 19 }
);

useLeafletDisplayLayer(map, tileLayer);


onMounted(() => {
    emit("map", map);
}); 

</script>

<style lang="css">

.map-wrapper {
    #map {
        width: 100%;
        height: 100%;
    }
}

.leaflet-pane {
    transition: none;
}
</style>
