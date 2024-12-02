export class GameAction {
  static readonly type = '[Game] Add item';
  constructor(readonly payload: string) { }
}
