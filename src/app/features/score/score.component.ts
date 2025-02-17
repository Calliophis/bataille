import { Component, computed, input } from '@angular/core';
import { playerNamePipe } from '../../shared/pipes/playerName.pipe';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    playerNamePipe
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  game = input<Game | null>(null);
  sortedScores = computed(() => this.game()?.scores.sort((a, b) => b.score - a.score));
}
