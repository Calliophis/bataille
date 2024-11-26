import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetPlayers } from './history.actions';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { tap } from 'rxjs';

export interface HistoryStateModel {
  players: Player[];
  games: Game[];
}

@State<HistoryStateModel>({
  name: 'history',
  defaults: {
    players: [],
    games: []
  }
})
@Injectable()
export class HistoryState {

  @Selector()
  static getState(state: HistoryStateModel) {
    return state;
  }

  @Selector()
  static getPlayers(state: HistoryStateModel) {
    return state.players;
  }

  @Selector()
  static getGames(state: HistoryStateModel) {
    return state.games;
  }

  constructor(
    private gameService: GameService
  ) {}

  @Action(GetPlayers)
  add(ctx: StateContext<HistoryStateModel>, action: GetPlayers) {
    return this.gameService.getPlayers().pipe(
      tap(res => ctx.patchState({players: res}))
    );
  }
}
