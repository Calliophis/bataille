import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';  
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

  players = select(PlayerState.getPlayersFromState);
  isLoading = select(PlayerState.getLoading);

  form: FormGroup = this.formBuilder.group({
    playersToPick: this.formBuilder.array([this.formBuilder.control('', Validators.required)], 
    DifferentPlayersValidator())  
  })

  get playersToPick(): FormArray {
    return this.form.get('playersToPick') as FormArray;
  }

  addPlayerToPick(): void {
    this.playersToPick.push(this.formBuilder.control('', Validators.required));
  }

  removePlayerToPick(): void {
    this.playersToPick.removeAt(this.playersToPick.length-1);
  }

  onCreatePlayer(): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;

    const playerCreator = this.dialog.open(PlayerCreatorComponent, dialogConfig);
    playerCreator.afterClosed().subscribe(res => {
      console.log(res);
      
    })
  }

  onSubmit(): void {
    this.store.dispatch(new AddInGamePlayers(this.playersToPick.value));
    this.router.navigateByUrl('/game');
  }

}
