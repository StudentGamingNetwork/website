<template>
    <Suspense>
        <template #default>
            <SAssociationLayout />
        </template>
        <template #fallback>
            <SLoading />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SAssociationLayout from "@/components/pages/association/Layout.vue";
import SLoading from "@/components/design/Loading.vue";

export default defineComponent({
    name: "Association",
    components: { SAssociationLayout, SLoading }
});
</script>

<style scoped lang="scss">

</style>
