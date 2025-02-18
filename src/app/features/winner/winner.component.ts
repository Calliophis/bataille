import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngxs/store';
import { GameState } from '../../shared/states/game.state';
import { playerNamePipe } from '../../shared/pipes/playerName.pipe';
import { Router } from '@angular/router';
import { ResetWinners } from '../../shared/states/game.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    playerNamePipe
  ],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.scss'
})
export class WinnerComponent {

  private dialogRef = inject(MatDialogRef);
  private store = inject(Store)
  private router = inject(Router);

  winners = select(GameState.getWinners);
  inGamePlayers = select(GameState.getInGamePlayers);

  onClose() {
    this.dialogRef.close();
    this.store.dispatch(new ResetWinners());
    this.router.navigateByUrl('/home');
  }
}
