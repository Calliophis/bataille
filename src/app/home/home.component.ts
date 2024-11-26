import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { select, Store } from '@ngxs/store';
import { HistoryState } from '../states/history.state';
import { GetPlayers } from '../states/history.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private store = inject(Store);
  private router = inject(Router);

  constructor() {
    afterNextRender(() => this.store.dispatch(new GetPlayers()))
  }

  players = select(HistoryState.getPlayers);

  onPlay() {
    this.router.navigateByUrl('/game');
  }
}
