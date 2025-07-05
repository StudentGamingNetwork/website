<template>
    <SHeader />
    <Suspense>
        <template #default>
            <SAssociationLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
    <SFooter />
</template>

<script lang="ts" setup>
import SAssociationLayout from "@/components/pages/association/Layout.vue";
import SLoading from "@/components/design/SLoading.vue";
import SHeader from "@/components/template/SHeader.vue";
import SFooter from "@/components/template/SFooter.vue";

</script>

<style scoped lang="css">

</style>
