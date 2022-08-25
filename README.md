<p align="center">
<img src="https://user-images.githubusercontent.com/4563971/120888136-049e2880-c5f7-11eb-81bd-25706d1944a2.png" alt="Student Gaming Network" />
</p>

<p align="center">
<b>Student Gaming Network</b>
</p>

---

# Le SGN

Le Student Gaming Network (SGN) est la fédération des associations étudiantes françaises d'esport. À l’initiative des
associations étudiantes de nouvelles technologies et de jeux vidéo, le SGN, association loi 1901 à but non lucratif, a été fondé en 2015.


# La plateforme

La plateforme du SGN est open source, de sorte que n'importe quel étudiant peut voir son code source et y contribuer.
Le but est de pouvoir apprendre et s'améliorer en développement web, tout en contribuant à un projet moderne et fun !


# Organisation

- Le dossier [`backend`](https://github.com/StudentGamingNetwork/website/tree/master/backend) contient le code source du serveur du SGN.
- Le dossier [`frontend`](https://github.com/StudentGamingNetwork/website/tree/master/frontend) contient le code source du client web.


## Développement

Pour pouvoir développer et tester la plateforme chez vous, vous devez avoir [Node.js](https://nodejs.org/en/).

- Pour le frontend
  - Naviguer dans le dossier `frontend` (ex: `cd frontend`)
  - Installer les dépendances avec `npm install`
  - Lancer le serveur de test avec `npm run dev` pour avoir le hot-reload
- Pour le backend
  - Naviguer dans le dossier `backend` (ex: `cd backend`)
  - Installer les dépendances avec `pnpm install`
  - Lancer le serveur de test avec `pnpm run dev` pour avoir le hot-reload


## Contribution

Pour pouvoir contribuer au développement, vous devez faire partie de l'équipe technique du SGN.

Voici les étapes pour développer une feature ou régler un bug:
- Créer une issue décrivant le problème/la fonctionnalité de façon précise mais concise
- Créer une branche nommée `dev-[numéro de l'issue]` et faites vos commit dessus
- Créer une pull request en mettant au début de la description `resolve #[numéro de l'issue]`
- Une fois la review effectuée, merger votre branche en faisant un "Squash and merge"
