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
            <SSectionTitle>Le Student Gaming Network</SSectionTitle>
            <br><br>
            <p>
                Le <strong>Student Gaming Network</strong> est la fédération des associations esport étudiantes des
                écoles et universités de France. Le SGN a pour but de promouvoir le jeu vidéo et l’esport étudiant sous
                toutes ses formes.
                Fier de ses 60 associations membres, le SGN veut pouvoir faire entendre la voix des étudiants dans
                l’esport, et porter les projets créés par les étudiants et pour les étudiants !
            </p>
            <p>
                Ces objectifs s’articulent autour de 3 axes majeurs au SGN :
            </p>
            <ul>
                <li>Développer la scène esportive étudiante</li>
                <li>Accompagner la vie associative en France et sur les campus</li>
                <li>Rapprocher les étudiants du monde professionnel de l’esport et du jeu vidéo</li>
            </ul>

            <br><br>
            <SSectionTitle>Recrutements</SSectionTitle>
            <br><br>
            <p>
                Le <strong>Student Gaming Network</strong> est toujours à la recherche de nouveaux talents pour
                rejoindre l'équipe, pour cela tu peux consulter les <a
                    href="https://drive.google.com/drive/folders/1jLqGvmcxbGHl4OZaxnl6YaGxdjFTSBis?usp=sharing"
                    target="_blank"
                >fiches des postes ouverts actuellement</a> et voir si tu as envie de travailler avec nous.
            </p>
            <p>
                Tu peux ensuite remplir ce <a
                    href="https://forms.gle/uD9maAE7gnMiqWbv5"
                    target="_blank"
                >formulaire de candidature</a>, et nous te recontacterons pour en discuter un peu plus avec toi !
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

    strong {
        font-weight: 600;
    }

    a {
        color: var(--color-primary);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
