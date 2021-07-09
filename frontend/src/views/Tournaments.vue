<template>
    <div class="tournaments">
        <SPageHead
            :background="BackgroundTournaments"
            title="Tournois"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
        </SPageHead>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundTournaments from "@/assets/images/backgrounds/tournaments.png";

export default defineComponent({
    name: "Tournaments",
    components: { SPageHead },
    setup() {
        return {
            BackgroundTournaments
        };
    }
});
</script>

<style scoped lang="scss">

</style>
