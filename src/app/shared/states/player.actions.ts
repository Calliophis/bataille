import { Player } from "../models/player.model";

export class GetPlayersFromService {
  static readonly type = '[Player] get players from service';
}

export class CreateNewPlayer {
  static readonly type = '[Player] create new player';
  constructor(
    public name: string
  ) {}
}

export class SendPlayerToService {
  static readonly type = '[Player] send new player to service';
  constructor(
    public player: Player
  ) {}
}
