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


Pour pouvoir développer et tester la plateforme chez vous, vous devez avoir [Node.js](https://nodejs.org/en/) (version 14.18.1).
Il vous faudra aussi [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).
Dans le cas ou MongoDb est déja installer vous aurez besoins de [MongoDB Compass](https://www.mongodb.com/fr-fr/products/compass) pour accéder à la bdd en local.

- Pour le frontend
  - copier le `.env.example` -> `.env`
  - Naviguer dans le dossier `frontend` (ex: `cd frontend`)
  - Installer les dépendances avec `pnpm install`
  - Pour le premier lancement, faire un `npm run build:force`
  - Lancer le serveur de test avec `pnpm run dev` pour avoir le hot-reload
- Pour le backend
  - copier le `.env.example` -> `.env`
  - Naviguer dans le dossier `backend` (ex: `cd backend`)
  - Installer les dépendances avec `pnpm install`
  - Lancer le serveur de test avec `pnpm run dev` pour avoir le hot-reload
  
> pour avoir accès à l'interface en local: http://127.0.0.1:8080/


## Contribution

Pour pouvoir contribuer au développement, vous devez faire partie de l'équipe technique du SGN.

Voici les étapes pour développer une feature ou régler un bug:
- Créer une issue décrivant le problème/la fonctionnalité de façon précise mais concise
- Créer une branche nommée `dev-[numéro de l'issue]` et faites vos commit dessus
- Créer une pull request en mettant au début de la description `resolve #[numéro de l'issue]`
- Une fois la review effectuée, merger votre branche en faisant un "Squash and merge"
