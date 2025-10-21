# Bataille

**FRENCH**
Développement d'un jeu de cartes de type Bataille en Angular.

Librairies utilisées : NGXS (state management) et Angular Material.
- On choisit de 2 à 4 joueurs pour s'affronter lors d'une partie.
- Il est possible de créer un nouveau joueur qui rejoindra la base de données.
- Lorsqu'on lance la partie, un paquet de 52 cartes numérotées de 1 à 52 est généré puis mélangé pseudo-aléatoirement et est distribué en nombre égal entre les joueurs.
- Au début de chaque tour, chaque joueur clique sur un bouton pour retourner la première carte de sa pioche.
- Quand tous les joueurs ont retourné leur première carte, celui qui a la carte affichant la valeur la plus élevée marque un point.
- Les cartes retournées sont défaussées et le prochain tour est lancé.
- La partie se termine lorsque les joueurs n'ont plus de carte à retourner.
- Les scores sont affichés et le gagnant est annoncé. En cas d'égalité, les gagnants sont annoncés. Le score de la partie est ensuite ajouté à la base de données et apparait sur la page d'accueil.

Pour le backend, développé en NestJS, voir `https://github.com/Calliophis/bataille-backend`

**ENGLISH**
Development of a card game in Angular.

Libraries used: NGXS (state management) and Angular Material.
- You can choose from 2 to 4 players to compete in a game.
- It is possible to create a new player, who will then be added to the database.
- When the game starts, a deck of 52 cards numbered from 1 to 52 is generated, pseudo-randomly shuffled, and evenly distributed among the players.
- At the beginning of each round, each player clicks a button to flip the first card from their deck.
- Once all players have flipped their cards, the one with the highest card value scores a point.
- The flipped cards are discarded, and the next round begins.
- The game ends when the players have no more cards left to flip.
- The final scores are displayed and the winner is announced. In case of a tie, all winners are announced. The game score is then saved to the database and displayed on the homepage.

For the backend, developed in NestJS, see `https://github.com/Calliophis/bataille-backend`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
