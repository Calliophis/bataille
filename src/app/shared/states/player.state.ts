import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { GetPlayersFromService, SendPlayerToService } from './player.actions';
import { Player } from '../models/player.model';
import { delay, map, tap } from 'rxjs';
import { GameService } from '../services/game.service';

export interface PlayerStateModel {
  players: Player[] | null;
  loading: boolean;
  newPlayer: Player;
}

@State<PlayerStateModel>({
  name: 'playerState',
  defaults: {
    players: null,
    loading: false,
    newPlayer: {
      id: '',
      name: ''
    }
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
  static getPlayersById(id: string) {
    return createSelector([PlayerState], (state: PlayerStateModel) => {
      return state.players?.find(player => player.id === id)?.name
    });
  }

  @Selector()
  static getLoading(state: PlayerStateModel) {
    return state.loading;
  }

  @Selector()
  static getNewPlayer(state: PlayerStateModel) {
    return state.newPlayer;
  }

  private gameService = inject(GameService); 

  @Action(GetPlayersFromService)
  getPlayersFromService(ctx: StateContext<PlayerStateModel>, action: GetPlayersFromService) {
    ctx.patchState({loading: true})
    return this.gameService.getPlayers().pipe(
      tap(players => {
        ctx.patchState({players: players, loading: false});
      })
    );
  }

  @Action(SendPlayerToService)
  sendPlayerToService(ctx: StateContext<PlayerStateModel>, action: SendPlayerToService) {
    ctx.patchState({loading: true});
    return this.gameService.addPlayer(action.playerName).pipe(
      delay(1000),
      map(player => ctx.patchState({newPlayer: player, loading: false})),
      tap(() => {
        ctx.dispatch(new GetPlayersFromService());
      })
    );
  } 
}
