<template>
    <Suspense>
        <template #default>
            <STournamentsLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import STournamentsLayout from "@/components/pages/tournaments/Layout.vue";
import SLoading from "@/components/design/Loading.vue";

export default defineComponent({
    name: "Tournaments",
    components: { SLoading, STournamentsLayout }
});
</script>

<style scoped lang="scss">

</style>
