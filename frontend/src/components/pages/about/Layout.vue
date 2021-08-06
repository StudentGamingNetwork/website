<template>
    <SPageHead
        :background="BackgroundAbout"
        title="À propos"
    >
        Le Student Gaming Network est la fédération des associations esport étudiantes des écoles et universités de
        France. Le SGN a pour but de promouvoir le jeu vidéo et l’esport étudiant sous toutes ses formes.
    </SPageHead>
    <SBaseLayout>
        <div class="about-layout">
            <SSectionTitle>Lorem Ipsum</SSectionTitle>
            <br><br>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id rutrum mi, vitae ornare justo.
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis et congue justo. Quisque purus lorem,
                facilisis quis ultricies hendrerit, aliquam vel lectus. Nunc finibus id ex quis aliquet. Aenean sed eros
                sem. Vestibulum semper diam eget arcu porta, at porta leo porttitor. Sed venenatis tempus porta.
                Vestibulum rhoncus nisl sollicitudin maximus pulvinar.
            </p>
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BackgroundAbout from "@/assets/images/backgrounds/about.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";

export default defineComponent({
    name: "SAboutLayout",
    components: { SBaseLayout, SPageHead, SSectionTitle },
    setup() {
        return {
            BackgroundAbout
        };
    }
});
</script>

<style scoped lang="scss">
.about-layout {
    max-width: 960px;
    margin: auto;
}
</style>
