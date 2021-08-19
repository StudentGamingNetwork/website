<template>
    <Suspense>
        <template #default>
            <STournamentsSingleLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import STournamentsSingleLayout from "@/components/pages/tournaments/SingleLayout.vue";
import SLoading from "@/components/design/Loading.vue";

export default defineComponent({
    name: "Tournament",
    components: { SLoading, STournamentsSingleLayout }
});
</script>

<style scoped lang="scss">

</style>
