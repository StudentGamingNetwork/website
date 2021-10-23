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

<script lang="ts">
import { defineComponent } from "vue";
import SPartnersLayout from "@/components/pages/partners/Layout.vue";
import SLoading from "@/components/design/Loading.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "Partners",
    components: { SFooter, SHeader, SLoading, SPartnersLayout }
});
</script>

<style scoped lang="scss">

</style>
