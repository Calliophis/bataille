import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { select } from '@ngxs/store';
import { GameState } from '../../shared/states/game.state';

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
  inGamePlayers = select(GameState.getInGamePlayers);
}
