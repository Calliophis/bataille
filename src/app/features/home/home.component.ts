import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { select, Store } from '@ngxs/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScoreComponent } from '../score/score.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayerState } from '../../shared/states/player.state';
import { GameState } from '../../shared/states/game.state';
import { GetPlayersFromService } from '../../shared/states/player.actions';
import { GetGamesFromService } from '../../shared/states/game.actions';
import { PlayerPickerComponent } from '../player-picker/player-picker.component';

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
  private dialog = inject(MatDialog);

  players = select(PlayerState.getPlayersFromState);
  games = select(GameState.getGamesFromState);
  gameIsLoading = select(GameState.getLoading);
  playerIsLoading = select(PlayerState.getLoading);
  
  constructor() {
    afterNextRender(() => {
      this.store.dispatch(new GetPlayersFromService());
      this.store.dispatch(new GetGamesFromService());
    })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    
    this.dialog.open(PlayerPickerComponent, dialogConfig);
  }

  onPlay() {
    this.openDialog();
  }
  
}
