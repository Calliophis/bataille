import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GameAction } from './game.actions';
import { Game } from '../models/game.model';

export interface GameStateModel {
  games: Game[];
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: {
    games: []
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

  // @Action(GameAction)
  // add(ctx: StateContext<GameStateModel>, { payload }: GameAction) {
  //   const stateModel = ctx.getState();
  //   stateModel.items = [...stateModel.items, payload];
  //   ctx.setState(stateModel);
  // }
}
