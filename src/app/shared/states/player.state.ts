import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { CreateNewPlayer, GetPlayersFromService, SendPlayerToService } from './player.actions';
import { Player } from '../models/player.model';
import { tap } from 'rxjs';
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
      id: 0,
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
  static getPlayersById(id: number) {
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
      tap(res => {
        ctx.patchState({players: res, loading: false});
      })
    );
  }

  @Action(CreateNewPlayer)
  createNewPlayer(ctx: StateContext<PlayerStateModel>, action: CreateNewPlayer) {
    const state = ctx.getState();
    const players = state.players;
    let newPlayer = state.newPlayer;

    let newPlayers: Player[] = [];
    
    if (players) {
      let maxId = players[0].id;

      for (let i = 0; i < players.length; i++) {
        const playerId = players[i].id;
        if (playerId > maxId) {
          maxId = playerId;
        }
      };

      newPlayer = {
        id: maxId + 1,
        name: action.name
      };
  
      newPlayers = [... players, newPlayer];
    }
     
    ctx.patchState({ players: newPlayers, newPlayer: newPlayer });
    ctx.dispatch(new SendPlayerToService(newPlayer));
  }

  @Action(SendPlayerToService)
  sendPlayerToService(ctx: StateContext<PlayerStateModel>, action: SendPlayerToService) {
    ctx.patchState({loading: true});
    return this.gameService.addPlayer(action.player).pipe(
      tap(() => ctx.patchState({loading: false}))
    );
  }
  
}
