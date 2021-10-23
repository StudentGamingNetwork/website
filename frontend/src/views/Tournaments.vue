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

<script lang="ts">
import { defineComponent } from "vue";
import STournamentsLayout from "@/components/pages/tournaments/Layout.vue";
import SLoading from "@/components/design/Loading.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Tournaments",
    components: { SFooter, SHeader, SLoading, STournamentsLayout }
});
</script>

<style scoped lang="scss">

</style>
