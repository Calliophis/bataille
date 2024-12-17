import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { select, Store } from '@ngxs/store';
import { PlayerState } from '../states/player.state';
import { GetPlayersFromService } from '../states/player.actions';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { GetGamesFromService } from '../states/game.actions';
import { GameState } from '../states/game.state';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ScoreComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private store = inject(Store);
  private router = inject(Router);

  constructor() {
    afterNextRender(() => {
      this.store.dispatch(new GetPlayersFromService());
      this.store.dispatch(new GetGamesFromService());
    })
  }

  players = select(PlayerState.getPlayersFromState);
  games = select(GameState.getGamesFromState);
  isLoading = select(GameState.getLoading);


  onPlay() {
    this.router.navigateByUrl('/game');
  }
}
