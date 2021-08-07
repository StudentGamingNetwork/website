<template>
    <SPageHead
        :background="BackgroundFederation"
        title="Fédération"
    >
        Nous fédérons un réseau de nombreuses associations étudiantes de gaming et d'esport, partout en France.
        Nous maintenons un contact régulier avec ces dernières pour les accompagner dans leurs projets.
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
