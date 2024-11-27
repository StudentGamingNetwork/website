<template>
    <SCard class="wrapper-map">
        <SMap   
            v-model="map"
            class="map"
            :dragging="true"
            :max-zoom="19"
            :scroll-wheel-zoom="'center'"
            :zoom-control="true"
        />
        <div class="dashboard">
            Dashboard
        </div>
    </SCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SCard from "@/components/design/Card.vue";
import SMap from "@/components/design/SMap.vue";

const map = ref();

</script>

<style scoped lang="css">
    .wrapper-map {
        display: flex;
        margin: auto;
        
        .map {
            width: 960px;
            aspect-ratio: 16 / 10;
            height: 100%;
        }

        .dashboard {
            display: grid;
        }
    }
</style>
