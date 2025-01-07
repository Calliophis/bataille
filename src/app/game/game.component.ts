import { afterNextRender, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InGamePlayer } from '../models/inGamePlayer.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
     MatButtonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  deck: number[] = [];
  players: InGamePlayer[] = [
    {
      id: 1,
      cards: [],
      activeCard: null
    },
    {
      id: 2,
      cards: [],
      activeCard: null
    }
  ];

  constructor() {
    afterNextRender(() => {
      this.generateDeck();
      this.shuffleDeck(this.deck);
      this.dealCards();
    })
  }

  generateDeck() {
    for (let i = 1; i < 53; i++) {
      this.deck.push(i);
    }
  }

  shuffleDeck(array: number[]): number[] {
    for (let i = array.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

  dealCards() {
    const cardsPerPlayer = this.deck.length/this.players?.length;
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < cardsPerPlayer; j++) {
        this.players[i].cards.push(this.deck[0]);
        this.deck.shift();
      }
      console.log(this.players[i].cards);
    }
  }

}
