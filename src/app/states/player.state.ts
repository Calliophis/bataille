import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { GetPlayersFromService } from './player.actions';
import { Player } from '../models/player.model';
import { GameService } from '../services/game.service';
import { tap } from 'rxjs';

export interface PlayerStateModel {
  players: Player[] | null;
  loading: boolean;
}

@State<PlayerStateModel>({
  name: 'playerState',
  defaults: {
    players: null,
    loading: false
  }
})
@Injectable()
export class PlayerState {

  @Selector()
  static getState(state: PlayerStateModel) {
    return state;
  }

  @Selector()
  static getPlayersFromState(state: PlayerStateModel) {
    return state.players;
  }

  static getPlayersById(id: number) {
    return createSelector([PlayerState], (state: PlayerStateModel) => {
      return state.players?.find(player => player.id === id)?.name
    });
  }

  @Selector()
  static getLoading(state: PlayerStateModel) {
    return state.loading;
  }

  private gameService = inject(GameService); 

  @Action(GetPlayersFromService)
  add(ctx: StateContext<PlayerStateModel>, action: GetPlayersFromService) {
    ctx.patchState({loading: true})
    return this.gameService.getPlayers().pipe(
      tap(res => {
        ctx.patchState({players: res, loading: false});
      })
    );
  }
}
