<template>
    <div class="partners">
        <SPageHead
            :background="BackgroundPartners"
            title="Partenaires"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
        </SPageHead>
        <SPartnersLayout />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundPartners from "@/assets/images/backgrounds/partners.png";
import SPartnersLayout from "@/components/pages/partners/Layout.vue";

export default defineComponent({
    name: "Partners",
    components: { SPageHead, SPartnersLayout },
    setup() {
        return {
            BackgroundPartners
        };
    }
});
</script>

<style scoped lang="scss">

</style>
