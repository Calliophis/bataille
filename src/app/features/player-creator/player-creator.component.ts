import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NewPlayerValidator } from '../../shared/directives/new-player/new-player-validator.directive';
import { select } from '@ngxs/store';
import { PlayerState } from '../../shared/states/player.state';

@Component({
  selector: 'app-player-creator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './player-creator.component.html',
  styleUrl: './player-creator.component.scss'
})
export class PlayerCreatorComponent {

  private dialogRef = inject(MatDialogRef);

  players = select(PlayerState.getPlayersFromState);

  newPlayer = new FormControl('', [NewPlayerValidator(this.players()), Validators.required]);

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newPlayer.value?.trim().replace(/\s\s+/g, ' '));
  }

  getErrorText(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Champ requis';
    }
    if (control.hasError('nameAlreadyTaken')) {
      return 'Ce nom existe déjà';
    }
    if (control.hasError('isOnlyWhiteSpace')) {
      return 'Le nom ne peut pas être un espace';
    }
    else {
      return 'Ce champ contient une erreur';
    }
  }

}
