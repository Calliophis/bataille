import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { AddInGamePlayers, DealCards, GenerateDeck, GetGamesFromService } from './game.actions';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { tap } from 'rxjs';
import { InGamePlayer } from '../models/inGamePlayer.model';

export interface GameStateModel {
  games: Game[] | null;
  loading: boolean;
  inGamePlayers: InGamePlayer[];
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: {
    games: null,
    loading: false,
    inGamePlayers: []
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

  @Selector()
  static getInGamePlayers(state: GameStateModel) {
    return state.inGamePlayers;
  }

  private gameService = inject(GameService)

  @Action(GetGamesFromService)
  getGamesFromService(ctx: StateContext<GameStateModel>, action: GetGamesFromService) {
    ctx.patchState({loading: true});
    return this.gameService.getGames().pipe(
      tap(res => {
        ctx.patchState({games: res, loading: false});
      })
    );
  }

  @Action(GenerateDeck)
  generateDeck(ctx: StateContext<GameStateModel>, action: GenerateDeck) {
    const newDeck: number[] = [];
    for (let i = 1; i < 53; i++) {
      newDeck.push(i);
    };
    for (let i = newDeck.length - 1; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]; 
    };
    ctx.dispatch(new DealCards(newDeck))
  }

  @Action(DealCards)
  dealCards(ctx: StateContext<GameStateModel>, action: DealCards) {
    const state = ctx.getState();
    const deck: number[] = action.deck;
    const players: InGamePlayer[] = state.inGamePlayers;
    let dividedDeck: number[][] = [];
    let newPlayers: InGamePlayer[] = [];
    
    const cardsPerPlayer: number = Math.floor(deck.length/players.length);
    
    for (let i = 0; i < deck.length; i += cardsPerPlayer) {
      const subDeck = deck.slice(i, i + cardsPerPlayer);
      dividedDeck = [...dividedDeck, subDeck];
    }

    for (let i = 0; i < players.length; i++) {
      let newPlayer = {...players[i]};
      newPlayer.cards = dividedDeck[i];
      newPlayers = [...newPlayers, newPlayer];
    }
    
    ctx.patchState({inGamePlayers: newPlayers});
  }

  @Action(AddInGamePlayers)
  addInGamePlayers(ctx: StateContext<GameStateModel>, action: AddInGamePlayers) {
    const state = ctx.getState();
    const inGamePlayers = state.inGamePlayers;
    const playersPicked: number[] = action.playersId;
    let newInGamePlayers: InGamePlayer[] = [];    

    for (let i = 0; i < playersPicked.length; i++) {
      let inGamePlayer: InGamePlayer = {
        id: playersPicked[i],
        cards: [],
        activeCard: null
      }
      newInGamePlayers = [...newInGamePlayers, inGamePlayer]
    }

    ctx.patchState({inGamePlayers: newInGamePlayers});
  }

}
