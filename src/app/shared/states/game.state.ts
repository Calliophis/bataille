import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { AddInGamePlayers, CalculateScore, DealCards, EndGame, GenerateDeck, GetGamesFromService, ResetWinners, SaveGame, SendScoresToService, TakeTurns, TurnOverCard } from './game.actions';
import { Game } from '../models/game.model';
import { tap } from 'rxjs';
import { InGamePlayer } from '../models/inGamePlayer.model';
import { GameService } from '../services/game.service';
import { Score } from '../models/score.model';

export interface GameStateModel {
  games: Game[] | null;
  loading: boolean;
  inGamePlayers: InGamePlayer[];
  winners: InGamePlayer[];
}

@State<GameStateModel>({
  name: 'gameState',
  defaults: {
    games: null,
    loading: false,
    inGamePlayers: [],
    winners : []
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

  @Selector()
  static getWinners(state: GameStateModel) {
    return state.winners;
  }

  private gameService = inject(GameService)

  @Action(GetGamesFromService)
  getGamesFromService(ctx: StateContext<GameStateModel>) {

    ctx.patchState({loading: true});
    
    return this.gameService.getGames().pipe(
      tap(res => {
        ctx.patchState({games: res, loading: false});
      })
    );
  }

  @Action(AddInGamePlayers)
  addInGamePlayers(ctx: StateContext<GameStateModel>, action: AddInGamePlayers) {
    const playersPicked: string[] = action.playersId;
    let newInGamePlayers: InGamePlayer[] = [];    

    for (const playerPicked of playersPicked) {
      const inGamePlayer: InGamePlayer = {
        id: playerPicked,
        cards: [],
        activeCard: null,
        hasPlayed: false,
        score: 0
      }
      newInGamePlayers = [...newInGamePlayers, inGamePlayer]
    }

    ctx.patchState({inGamePlayers: newInGamePlayers});
  }

  @Action(GenerateDeck)
  generateDeck(ctx: StateContext<GameStateModel>) {

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
      const newPlayer = {...players[i]};
      newPlayer.cards = dividedDeck[i];
      newPlayers = [...newPlayers, newPlayer];
    }
    
    ctx.patchState({inGamePlayers: newPlayers});
  }

  @Action(TurnOverCard)
  turnOverCard(ctx: StateContext<GameStateModel>, action: TurnOverCard) {

    const state = ctx.getState();
    const playerId = action.id;
    const players = state.inGamePlayers
    const currentPlayer = players.find(player => playerId === player.id);
    const currentCards = currentPlayer?.cards;
    let newActiveCard = currentPlayer?.activeCard;

    if (currentCards) {
      newActiveCard = currentCards[0];
      currentPlayer.activeCard = newActiveCard;
      currentCards.splice(0, 1);
      ctx.patchState({inGamePlayers: players});
      ctx.dispatch(new TakeTurns(playerId));
    }
  }

  @Action(TakeTurns)
  takeTurns(ctx: StateContext<GameStateModel>, action: TakeTurns) {
    
    const state = ctx.getState();
    const players = state.inGamePlayers;
    const currentPlayerIndex = players.findIndex(player => player.id === action.id);
    
    players[currentPlayerIndex].hasPlayed = true;
    
    const hasNotPlayed = players.find(player => player.hasPlayed === false);
    const hasNoCards = players.find(player => player.cards.length < 1);

    if (!hasNotPlayed) {
      ctx.dispatch(new CalculateScore());
      
      if (hasNoCards) {
        setTimeout(() => {
          ctx.dispatch(new EndGame());
          ctx.patchState({inGamePlayers: players});
        }, 1000);
        
      } else {
        setTimeout(() => { 
          players.forEach(player => player.hasPlayed = false);
          ctx.patchState({inGamePlayers: players});
        }, 1000);
      }
    }
  }

  @Action(CalculateScore)
  calculateScore(ctx: StateContext<GameStateModel>) {
    
    const state = ctx.getState();
    const players = state.inGamePlayers;
    
    let max = players[0].activeCard;
    let index = 0;
    
    for (let i = 0; i < players.length; i++) {
      
      const card = players[i].activeCard;
      
      if (card && max) {
        if (card > max) {
          max = card;
          index = i;
        }
      } 
    }

    players[index].score++;
    ctx.patchState({inGamePlayers: players})
  }

  @Action(EndGame)
  endGame(ctx: StateContext<GameStateModel>) {
    
    const state = ctx.getState();
    const players = state.inGamePlayers;
    const scores: number[] = [];
    
    players.forEach(player => scores.push(player.score));   
    
    const winners = players.filter(player => player.score === Math.max(...scores));

    ctx.patchState({winners: winners});
    ctx.dispatch(new SaveGame());
  }

  @Action(SaveGame)
  saveGame(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    const games = state.games;
    const players = state.inGamePlayers;

    const scores: Score[] = [];

    if (games) {
      players.forEach(player => scores.push({playerId: player.id, score: player.score}));
      ctx.dispatch(new SendScoresToService(scores));
    }
  }

  @Action(SendScoresToService)
  sendScoresToService(ctx: StateContext<GameStateModel>, action: SendScoresToService) {
    ctx.patchState({loading: true});
    return this.gameService.addGame(action.scores).pipe(
      tap(() => ctx.patchState({loading: false}))
    );
  }

  @Action(ResetWinners)
  resetWinners(ctx: StateContext<GameStateModel>) {
    ctx.patchState({winners: []})
  }
}
