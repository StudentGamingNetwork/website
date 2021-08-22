import * as path from "path";
import * as fs from "fs";
import * as Fastify from "fastify";
import * as TournamentLib from "@/modules/tournament/lib";
import * as AssociationLib from "@/modules/association/lib";

const pageTemplate = fs.readFileSync(path.join(__dirname, "../../frontend/dist/index.html")).toString();
const origin = process.env.CORS_ORIGIN;

export default async function (server: Fastify.FastifyInstance): Promise<void> {
    server.get("*", async (request, reply) => {
        const page = await generatePage(request.url);

        reply
            .type("text/html")
            .send(page);

    });
}

async function generatePage(url: string): Promise<string> {
    const path = url.split("/");
    const pagePath = path[1];

    const pageInformations = {
        title: "Student Gaming Network",
        description: "Le Student Gaming Network (SGN) est la fédération des associations étudiantes françaises d'esport. Nous organisons de nombreux tournois à l'échelle nationale et promouvons activement l'esport étudiant.",
        image: `${ origin }/static/opengraph.png`
    };


    if (pagePath) {
        switch (pagePath) {
        case "federation":
            pageInformations.title += " - Fédération";
            pageInformations.description = "Nous fédérons un réseau de nombreuses associations étudiantes de gaming et d'esport, partout en France. Nous maintenons un contact régulier avec ces dernières pour les accompagner dans leurs projets.";
            break;
        case "tournaments":
            pageInformations.title += " - Tournois";
            pageInformations.description = "Nous organisons régulièrement des tournois, certains en partenariat avec des grands noms du jeu vidéo. Nous nous assurons que seuls les étudiants français puissent participer à nos tournois. ";
            break;
        case "partners":
            pageInformations.title += " - Partenaires";
            pageInformations.description = "Nous échangeons notre expertise pour l'organisation d'événements esportifs et la promotion auprès des étudiants avec de nombreuses entités. Nous sommes heureux de compter sur leur soutien et leurs compétences.";
            break;
        case "about":
            pageInformations.title += " - À propos";
            pageInformations.description = "Le Student Gaming Network est la fédération des associations esport étudiantes des écoles et universités de France. Le SGN a pour but de promouvoir le jeu vidéo et l’esport étudiant sous toutes ses formes.";
            break;
        case "tournament":
            await fillTournamentData(pageInformations, path[2]);
            break;
        case "association":
            await fillAssociationData(pageInformations, path[2]);
            break;
        }
    }

    const head = `
    <meta property="og:title" content="${ pageInformations.title }"/>
    <meta property="og:site_name" content="Student Gaming Network"/>
    <meta property="og:url" content="${ origin }"/>
    <meta property="og:description" content="${ pageInformations.description }"/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content="${ pageInformations.image }"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="600"/>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@Student_GN">`;

    return pageTemplate
        .replace("{ssr-title}", pageInformations.title)
        .replace("<!--{ssr-head}-->", head);
}

async function fillTournamentData(pageInformations: {title: string; description: string; image: string}, slug: string) {
    const tournament = await TournamentLib.getTournamentFromSlug(slug);

    if (!tournament.state.public || !tournament.dates.subscriptionClose) {
        return;
    }

    const date = new Date(tournament.dates.subscriptionClose);

    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const inscriptionCloseDate = `${ days[date.getDay()] } ${ date.getDate() } ${ months[date.getMonth()] }`;

    pageInformations.title = `${ tournament.name } - Tournoi ${ tournament.game.name }`;
    pageInformations.description = `Les inscriptions sont ouvertes jusqu'au ${ inscriptionCloseDate }. ${ tournament.informations.prizes } à gagner !`;

    if (tournament.settings.logo) {
        pageInformations.image = `${ origin }/upload/tournament/${ tournament.id }/${ tournament.settings.logo }`;
    }
}

async function fillAssociationData(pageInformations: {title: string; description: string; image: string}, slug: string) {
    const association = await AssociationLib.getAssociationFromSlug(slug);

    pageInformations.title = `${ association.name } - ${ association.school.name }`;
    pageInformations.description = `${ association.name } est l'association gaming étudiante de ${ association.school.name }.`;

    if (association.logo) {
        pageInformations.image = `${ origin }/upload/association/${ association.id }/${ association.logo }`;
    }
}
