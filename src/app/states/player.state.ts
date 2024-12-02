import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
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

  @Selector()
  static getLoading(state: PlayerStateModel) {
    return state.loading
  }

  private gameService = inject(GameService); 

  @Action(GetPlayersFromService)
  add(ctx: StateContext<PlayerStateModel>, action: GetPlayersFromService) {
    ctx.patchState({loading: true})
    return this.gameService.getPlayers().pipe(
      tap(res => {
        ctx.patchState({players: res, loading: false});
        console.log('patchState');
    })
    );
  }
}
