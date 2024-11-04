<template>
    <SHeader />
    <Suspense>
        <template #default>
            <STournamentsSingleLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import STournamentsSingleLayout from "@/components/pages/tournaments/STournamentsSingleLayout.vue";
import SLoading from "@/components/design/Loading.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Tournament",
    components: { SFooter, SHeader, SLoading, STournamentsSingleLayout }
});
</script>

<style scoped lang="scss">

</style>
