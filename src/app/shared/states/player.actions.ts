export class GetPlayersFromService {
  static readonly type = '[Player] get players from service';
}

export class CreateNewPlayer {
  static readonly type = '[Player] create new player';
  constructor(
    public name: string
  ) {}
}
