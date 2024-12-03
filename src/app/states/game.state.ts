import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetGamesFromService } from './game.actions';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { tap } from 'rxjs';

export interface GameStateModel {
  games: Game[] | null;
  loading: boolean;
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: {
    games: null,
    loading: false
  }
})

@Injectable()
export class GameState {

  @Selector()
  static getState(state: GameStateModel) {
    return state;
  }

  @Selector()
  static getGamesFromState(state: GameStateModel) {
    return state.games;
  }

  @Selector()
  static getLoading(state: GameStateModel) {
    return state.loading;
  }

  private gameService = inject(GameService)

  @Action(GetGamesFromService)
  add(ctx: StateContext<GameStateModel>, action: GetGamesFromService) {
    ctx.patchState({loading: true});
    return this.gameService.getGames().pipe(
      tap(res => {
        ctx.patchState({games: res, loading: false});
      })
    );
  }
}
