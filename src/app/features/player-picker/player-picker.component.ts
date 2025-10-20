import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';  
import { select, Store } from '@ngxs/store';
import { PlayerState } from '../../shared/states/player.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AddInGamePlayers } from '../../shared/states/game.actions';
import {FormBuilder} from '@angular/forms';
import {FormArray} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import { PlayerCreatorComponent } from '../player-creator/player-creator.component';
import { DifferentPlayersValidator } from '../../shared/directives/different-players/different-players-validator.directive';
import { SendPlayerToService } from '../../shared/states/player.actions';
import { tap } from 'rxjs';

@Component({
  selector: 'app-player-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './player-picker.component.html',
  styleUrl: './player-picker.component.scss'
})
export class PlayerPickerComponent {

  private store = inject(Store);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef)

  players = select(PlayerState.getPlayersFromState);
  isLoading = select(PlayerState.getLoading);
  newPlayer = select(PlayerState.getNewPlayer);

  form: FormGroup = this.formBuilder.group({
    playersToPick: this.formBuilder.array([this.formBuilder.control('', Validators.required)], 
    DifferentPlayersValidator())  
  })

  get playersToPick(): FormArray {
    return this.form.controls['playersToPick'] as FormArray;
  }

  addPlayerToPick(): void {
    this.playersToPick.push(this.formBuilder.control('', Validators.required));
  }

  removePlayerToPick(): void {
    this.playersToPick.removeAt(this.playersToPick.length-1);
  }

  onChange(event: MatSelectChange, index: number): void {
    if (event.value === 'newPlayer') {
      this.onCreatePlayer(index);
    }
  }

  onCreatePlayer(index: number): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;

    const playerCreator = this.dialog.open(PlayerCreatorComponent, dialogConfig);
    
    playerCreator.afterClosed().subscribe(playerName => {
      if (playerName) {
        this.store.dispatch(new SendPlayerToService(playerName)).pipe(
          tap(() => {
            if (this.newPlayer().id) {
              this.playersToPick.controls[index].setValue(this.newPlayer().id);
            }
          })
        ).subscribe();
      }
    });
  }

  getErrorText(control: AbstractControl) {
    if (control.hasError('soloPlayer')) {
      return 'Minimum 2 joueurs';
    }
    if (control.hasError('samePlayer')) {
      return 'Les joueurs doivent être différents';
    }
    if (control.hasError('tooManyPlayers')) {
      return 'Maximum 4 joueurs';
    }
    else {
      return;
    }
  }

  onSubmit(): void {
    this.store.dispatch(new AddInGamePlayers(this.playersToPick.value)).pipe(
      tap(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/game');
      })
    ).subscribe(); 
  }
}
