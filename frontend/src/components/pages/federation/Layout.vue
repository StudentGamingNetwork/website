<template>
    <div class="federation-layout">
        <SFederationSearch />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SFederationSearch from "@/components/pages/federation/Search.vue";

export default defineComponent({
    name: "SFederationLayout",
    components: { SFederationSearch }
});
</script>

<style scoped lang="scss">

</style>
