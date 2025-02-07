import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private http = inject(HttpClient);

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('/api/v1/players');
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/v1/games');
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/v1/players', player);
  }
}
