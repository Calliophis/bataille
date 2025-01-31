import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngxs/store';

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
  private store = inject(Store)

  newPlayer = new FormControl;

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newPlayer.value);
    
  }

}
