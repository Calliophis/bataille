import { afterNextRender, Component, Signal } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

deck: number[] = [];
numberOfPlayers: number = 2;

constructor() {
  afterNextRender(() => {
    this.generateDeck();
    this.shuffleDeck(this.deck);
    console.log(this.deck);
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
  
}



}
