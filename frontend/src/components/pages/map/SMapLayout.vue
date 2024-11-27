<template>
    <SPageHead
        :background="BackgroundFederation"
        title="La carte"
    >
        Nous fédérons un réseau de nombreuses associations étudiantes de gaming et d'esport, partout en France.
        Nous maintenons un contact régulier avec ces dernières pour les accompagner dans leurs projets.
    </SPageHead>
    <SBaseLayout>
        <SMapCard />
    </SBaseLayout>
</template>

<script lang="ts" setup>
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundFederation from "@/assets/images/backgrounds/federation.png";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SMapCard from "@/components/pages/map/SMapCard.vue";


</script>

<style scoped lang="css">

</style>
