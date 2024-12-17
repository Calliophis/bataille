import { Component, inject, input } from '@angular/core';
import { Game } from '../models/game.model';
import { Store } from '@ngxs/store';
import { playerNamePipe } from '../pipes/playerName.pipe';

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
  
}
