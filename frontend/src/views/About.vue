<template>
    <div class="about">
        <SPageHead
            :background="BackgroundAbout"
            title="À propos"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget feugiat sem. Sed commodo dolor vel semper semper. Donec pretium massa at enim tincidunt laoreet.
        </SPageHead>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageHead from "@/components/template/PageHead.vue";
import BackgroundAbout from "@/assets/images/backgrounds/about.png";

export default defineComponent({
    name: "About",
    components: { SPageHead },
    setup() {
        return {
            BackgroundAbout
        };
    }
});
</script>

<style scoped lang="scss">

</style>
