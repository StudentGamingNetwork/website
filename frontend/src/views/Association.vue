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

<script lang="ts">
import { defineComponent } from "vue";
import SAssociationLayout from "@/components/pages/association/Layout.vue";
import SLoading from "@/components/design/Loading.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Association",
    components: { SAssociationLayout, SFooter, SHeader, SLoading }
});
</script>

<style scoped lang="scss">

</style>
