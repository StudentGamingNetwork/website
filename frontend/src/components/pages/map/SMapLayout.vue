<template>
    <SPageHead
        :background="BackgroundFederation"
        :title="$t('components.pages.map.title')"
    >
        {{ $t("components.pages.map.head") }}
    </SPageHead>
    <SBaseLayout>
        <SMapCard />
    </SBaseLayout>
</template>

<script lang="ts" setup>
import SPageHead from "@/components/template/SPageHead.vue";
import BackgroundFederation from "@/assets/images/backgrounds/federation.png";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SMapCard from "@/components/pages/map/SMapCard.vue";


</script>

<style scoped lang="css">

</style>
