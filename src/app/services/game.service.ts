import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('https://localhost/api/v1/docs/players)');
  }
}
