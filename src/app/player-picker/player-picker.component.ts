import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';  
import { select, Store } from '@ngxs/store';
import { PlayerState } from '../states/player.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AddInGamePlayers } from '../states/game.actions';
import {FormBuilder} from '@angular/forms';
import {FormArray} from '@angular/forms';
import { DifferentPlayersValidator } from '../directives/different-players-validator.directive';

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
    MatButtonModule
  ],
  templateUrl: './player-picker.component.html',
  styleUrl: './player-picker.component.scss'
})
export class PlayerPickerComponent {

  private store = inject(Store);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<PlayerPickerComponent>);
  private formBuilder = inject(FormBuilder);

  players = select(PlayerState.getPlayersFromState);
  isLoading = select(PlayerState.getLoading);

  form: FormGroup = this.formBuilder.group({
    playersToPick: this.formBuilder.array([this.formBuilder.control('', Validators.required)], 
    DifferentPlayersValidator())
  })

  get playersToPick(): FormArray {
    return this.form.get('playersToPick') as FormArray;
  }

  onChange(): void {
    console.log(this.playersToPick.value);
  }

  addPlayerToPick(): void {
    this.playersToPick.push(this.formBuilder.control('', Validators.required));
  }

  removePlayerToPick(): void {
    this.playersToPick.removeAt(this.playersToPick.length-1);
  }

  onSubmit(): void {
    this.dialogRef.close(this.playersToPick.value);
    this.dialogRef.afterClosed().subscribe(res => {
      this.store.dispatch(new AddInGamePlayers(res));
    })
    this.router.navigateByUrl('/game');
  }

}
