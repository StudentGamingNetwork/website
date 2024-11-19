<template>
    <div class="map-wrapper">
        <div id="map" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps } from "vue";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { EScrollWheelZoom } from "@/modules/map";


const props = defineProps<{
    dragging: boolean
    lat: number
    lon: number
    maxZoom: number
    scrollWheelZoom: EScrollWheelZoom,
    zoomControl: boolean
}>();


let map: leaflet.Map;

onMounted(() => {
    map = leaflet.map("map",{ dragging: props.dragging, scrollWheelZoom: props.scrollWheelZoom, zoomControl: props.zoomControl }).setView([props.lat,props.lon], 13);
    map.attributionControl.setPrefix("");

    leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: props.maxZoom || 19
    }).addTo(map);

    leaflet.marker([props.lat,props.lon]).addTo(map);

});

</script>

<style lang="css" scoped>
.map-wrapper {

    #map {
        width: 100%;
        height: 100%;
    }
}
</style>
