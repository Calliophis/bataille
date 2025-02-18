import { Score } from "../models/score.model";

export class GetGamesFromService {
  static readonly type = '[Game] Get games from service';
}

export class GenerateDeck {
  static readonly type = '[Game] Generate a shuffled deck'
}

export class DealCards {
  static readonly type = '[Game] Deal cards between players'
  constructor(
    public deck: number[]
  ) {}
}

export class AddInGamePlayers {
  static readonly type = '[Game] Add picked players to state'
  constructor(
    public playersId: number[]
  ) {}
}

export class TurnOverCard {
  static readonly type = '[Game] Turn a card over to make its value visible'
  constructor(
    public id: number
  ) {}
}

export class TakeTurns {
  static readonly type = '[Game] Manage players turns'
  constructor(
    public id: number
  ) {}
}

export class CalculateScore {
  static readonly type = '[Game] Calculate the score'
}

export class EndGame {
  static readonly type = '[Game] Manage the end of the game'
}

export class SaveGame {
  static readonly type = '[Game] Save a game'
}

export class SendScoresToService {
  static readonly type = '[Game] Send new game to service'
  constructor(
    public scores: Score[]
  ) {}
}

export class ResetWinners {
  static readonly type = '[Game] Reset winners to undefined'
}
