export class GetPlayersFromService {
  static readonly type = '[Player] get players from service';
}

export class SendPlayerToService {
  static readonly type = '[Player] send new player to service';
  constructor(
    public playerName: string
  ) {}
}
