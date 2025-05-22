<template>
    <SPageHead
        :background="BackgroundAbout"
        title="Mentions légales"
    >
        En application de <strong>l’article 6 de la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique</strong>, il est précisé aux utilisateurs du site<router-link to="/">
            www.sgnw.fr
        </router-link> l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi
    </SPageHead>
    <SBaseLayout>
        <div class="about-layout">
            <SSectionTitle>Éditeur du site</SSectionTitle>
            <br><br>
            <p>
                Le site  <router-link to="/">
                    www.sgnw.fr
                </router-link> est édité par: 
            </p>
            <p>
                L’association Student Gaming Network SGN, association loi 1901, immatriculée en Isère sous le numéro W943004443, ayant son siège social au 16 rue Berthe de Boissieux, 38 000 GRENOBLE. 
            </p>
            <p>
                N° TVA intracommunautaire: FR61841728348
            </p>
            <p>
                Directeur de la publication: Monsieur Jules BÉAL, en sa qualité de président de l’Association 
            </p>
            <p>
                Adresse mail: <a href="mailto:contact@sgnw.fr">contact@sgnw.fr</a>.
            </p>

            <br><br>
            <SSectionTitle>Hébergeur du site</SSectionTitle>
            <p>
                Le site  <router-link to="/">
                    www.sgnw.fr
                </router-link> est hébergé par: 
            </p>
            <p>
                La société OVH SAS, immatriculé au RCS sous le numéro 537 407 926, dont le siège social est situé  2, rue Kellermann, 59100 Roubaix. 
            </p>
            <p>
                Code APE 2620Z
                <br>
                N° TVA : FR 22 424 761 419
            </p>
            <p>
                Site web: <a
                    href="https://www.ovhcloud.com/fr/"
                    target="_blank"
                >https://www.ovhcloud.com/fr/</a>.
            </p>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import BackgroundAbout from "@/assets/images/backgrounds/about.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SSectionTitle from "@/components/design/SSectionTitle.vue";


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
