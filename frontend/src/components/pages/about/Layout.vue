<template>
    <SPageHead
        :background="BackgroundAbout"
        title="À propos"
    >
        Le Student Gaming Network est la fédération des associations esport étudiantes des écoles et universités de France. Le SGN a pour but de promouvoir le jeu vidéo et l’esport étudiant sous toutes ses formes.
    </SPageHead>
    <SBaseLayout>
        <div class="about-layout">
            <p>Fier de ses 60 associations membres, le SGN veut pouvoir faire entendre la voix des étudiants dans l’esport, et porter les projets créés par les étudiants et pour les étudiants !</p>

            <p>Ces objectifs s’articulent autour de 3 axes majeurs au SGN :</p>
            <ul>
                <li>Développer la scène esportive étudiante</li>
                <li>Accompagner la vie associative en France et sur les campus</li>
                <li>Rapprocher les étudiants du monde professionnel de l’esport et du jeu vidéo</li>
            </ul>
            <br>
            <SSectionTitle>Esport étudiant</SSectionTitle>
            <br>
            <br>

            <p>
                Fort de notre expérience accumulée en 4 ans, nous allons continuer d'organiser des compétitions nationales. Nous les répartirons sur toute l'année et sur de nombreux jeux pour satisfaire tous les types d'étudiants. Les meilleures équipes continueront de représenter la France aux University Esport Masters, compétition européenne que nous co-organisons depuis ses débuts, et possiblement à l’International College Cup s’ils triomphent de nos pays voisins, pour représenter l’Europe.
            </p>

            <br>
            <SSectionTitle>Fédération nationale</SSectionTitle>
            <br>
            <br>

            <p>
                Nous allons sortir les gros moyens pour créer une structure qui permettra à chaque association gaming d'être acteur à part entière de la Fédération et de se sentir représentée. La France est répartie en 7 Grandes Régions, en fonction du nombre d'associations présentes dans chaque secteur.
            </p>

            <p>Le SGN donne l'impulsion et laisse la liberté à chaque Grande Région d'organiser elle-même sa structure selon sa vision. Ces instances vont permettre aux associations de négocier à plus grande échelle et d'organiser des événements communs au niveau régional.</p>

            <p>A court terme, le Comité des Assos va être mis en place pour avoir une représentation directe des associations auprès du SGN grâce à des référents régionaux élus par leurs pairs.</p>

            <p>A moyen et long terme, nous comptons construire une structure pyramidale dans laquelle les associations locales influencent et déterminent les missions des structures régionales, qui elles-même influencent la Fédération nationale. Ces relations seront bilatérales et chacun devra rendre compte de ses actions.</p>

            <p>Pour accroître le dynamisme de cette régionalisation, nous lançons la SGN Factory ! Il s'agit d'un accompagnement humain et financier de VOS projets. Pour cette première édition, 3 projets seront accompagnés répartis sur 2 sessions. Pour être sélectionné, envoyez un dossier écrit par mail à marcus.pierrat@sgnw.fr (Marcus sur notre Discord) avec un maximum de détails. Il s'en suivra d'une présentation orale en ligne et un jury composé de membres du SGN prendra la décision finale.</p>

            <p>La première session démarre le 15 septembre et vous avez jusqu'au 23 octobre pour envoyer votre dossier écrit et planifier votre présentation orale. L'annonce du projet sélectionné se fera le 30 octobre à la Paris Games Week. La deuxième session démarrera le 15 janvier.</p>

            <p>Nous lançons également la SGN'TV ! Tout le stream étudiant se rassemblera sur notre chaîne Twitch, donnant l'opportunité à tout le monde de se lancer dans le grand bain et de bénéficier de notre aide technique et de notre portée de communication. Pour participer à un créneau dès le 1er Octobre, contactez Benjamin "Lelariva" Manier directement sur notre Discord ou posez votre question sur Twitter au @StudentGN avec #SGNTV !</p>

            <br>
            <SSectionTitle>Monde professionnel</SSectionTitle>
            <br>
            <br>

            Tous les chiffres prouvent que le monde du jeu vidéo et de l’esport est en expansion. Cela n’échappe pas aux étudiants, qui souhaitent s’en rapprocher dès aujourd’hui via leur expérience associative.

            Pour répondre à ces attentes nous allons mettre en place des rencontres tel que celle qui a eu lieu de 15 septembre dernier avec Riot France, Kykklos, Castersnest, dans les locaux de Shadow. On se donne également rendez-vous, comme chaque année, à la Paris Games Week mais aussi directement dans vos écoles pour des conférences enrichissantes !
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
