import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';  
import { select } from '@ngxs/store';
import { PlayerState } from '../states/player.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<PlayerPickerComponent>);

  players = select(PlayerState.getPlayersFromState);
  isLoading = select(PlayerState.getLoading);

  form = new FormGroup({
    firstPlayer: new FormControl(''),
    secondPlayer: new FormControl('')
  })

  save() {
    this.dialogRef.close(this.form.value);
    this.dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
    this.router.navigateByUrl('/game');
  }

}
