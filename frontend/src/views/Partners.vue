<template>
    <Suspense>
        <template #default>
            <SPartnersLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPartnersLayout from "@/components/pages/partners/Layout.vue";
import SLoading from "@/components/design/Loading.vue";

export default defineComponent({
    name: "Partners",
    components: { SLoading, SPartnersLayout }
});
</script>

<style scoped lang="scss">

</style>
