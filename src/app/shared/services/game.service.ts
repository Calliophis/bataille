import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';
import { Score } from '../models/score.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  addPlayer(playerName: string): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/players`, { playerName });
  }

  addGame(scores: Score[]): Observable<Score[]> {
    return this.http.post<Score[]>(`${this.apiUrl}/games`, scores);
  }
}
