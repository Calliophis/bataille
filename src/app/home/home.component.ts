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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
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
      console.log('dispatch')
  })
  }

  players = select(PlayerState.getPlayersFromState);
  isLoading = select(PlayerState.getLoading);

  onPlay() {
    this.router.navigateByUrl('/game');
  }
}
