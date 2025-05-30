<template>
    <SHeader />
    <Suspense>
        <template #default>
            <STournamentsLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
    <SFooter />
</template>

<script lang="ts" setup>
import STournamentsLayout from "@/components/pages/tournaments/STournamentsLayout.vue";
import SLoading from "@/components/design/SLoading.vue";
import SHeader from "@/components/template/SHeader.vue";
import SFooter from "@/components/template/SFooter.vue";
</script>

<style scoped lang="css">

</style>
