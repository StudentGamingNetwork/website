<template>
    <SPageHead
        :background="BackgroundFederation"
        :title="$t('components.pages.federation.title')"
    >
        {{ $t('components.pages.federation.head') }}
    </SPageHead>
    <SBaseLayout>
        <div class="federation-layout">
            <SFederationSearch />
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import SFederationSearch from "@/components/pages/federation/Search.vue";
import SPageHead from "@/components/template/SPageHead.vue";
import BackgroundFederation from "@/assets/images/backgrounds/federation.png";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
</script>

<style scoped lang="css">

</style>
