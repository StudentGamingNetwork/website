<template>
    <div class="federation">
        <SPageHead
            :background="BackgroundFederation"
            title="Fédération"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
        </SPageHead>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundFederation from "@/assets/images/backgrounds/federation.png";

export default defineComponent({
    name: "Federation",
    components: { SPageHead },
    setup() {
        return {
            BackgroundFederation
        };
    }
});
</script>

<style scoped lang="scss">

</style>
