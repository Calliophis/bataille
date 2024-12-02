import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private http = inject(HttpClient);

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('/api/v1/players');
  }
}
