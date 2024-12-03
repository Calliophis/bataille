import { Component, inject, input } from '@angular/core';
import { Game } from '../models/game.model';
import { select, Store } from '@ngxs/store';
import { PlayerState } from '../states/player.state';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {

  private store = inject(Store)

  game = input<Game | null>(null);

  getPlayerName(id: number) {
    return select(PlayerState.getPlayersById(id))
  }
}
