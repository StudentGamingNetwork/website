<template>
    <SHeader />
    <Suspense>
        <template #default>
            <SPartnersLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
    <SFooter />
</template>

<script lang="ts" setup>
import SPartnersLayout from "@/components/pages/partners/SPartnersLayout.vue";
import SLoading from "@/components/design/SLoading.vue";
import SHeader from "@/components/template/SHeader.vue";
import SFooter from "@/components/template/SFooter.vue";
</script>

<style scoped lang="scss">

</style>
