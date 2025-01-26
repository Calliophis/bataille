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
