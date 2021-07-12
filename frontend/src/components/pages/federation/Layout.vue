<template>
    <SPageHead
        :background="BackgroundFederation"
        title="Fédération"
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
    </SPageHead>
    <SBaseLayout>
        <div class="federation-layout">
            <SFederationSearch />
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SFederationSearch from "@/components/pages/federation/Search.vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundFederation from "@/assets/images/backgrounds/federation.png";
import SBaseLayout from "@/components/pages/BaseLayout.vue";

export default defineComponent({
    name: "SFederationLayout",
    components: { SBaseLayout, SFederationSearch, SPageHead },
    setup() {
        return {
            BackgroundFederation
        };
    }
});
</script>

<style scoped lang="scss">

</style>
