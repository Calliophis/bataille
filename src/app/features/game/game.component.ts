import { afterNextRender, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngxs/store';
import { GameState } from '../../shared/states/game.state';
import { playerNamePipe } from '../../shared/pipes/playerName.pipe';
import { GenerateDeck, TurnOverCard } from '../../shared/states/game.actions';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { WinnerComponent } from '../winner/winner.component';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    playerNamePipe,
    CardComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  private store = inject(Store);
  private dialog = inject(MatDialog);

  inGamePlayers = select(GameState.getInGamePlayers);
  winners = select(GameState.getWinners);
  winners$ = toObservable(this.winners);

  constructor() {
    
    afterNextRender(() => this.store.dispatch(new GenerateDeck()));
    
    this.winners$.pipe(
      filter(winners => winners.length > 0),
      tap(() => {
        this.openDialog();
      }),
      takeUntilDestroyed(),
    ).subscribe();
  }

  onTurnOver(id: string) {
    this.store.dispatch(new TurnOverCard(id));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    
    this.dialog.open(WinnerComponent, dialogConfig);
  }
}
