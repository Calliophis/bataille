import { Pipe, PipeTransform } from "@angular/core";
import { select } from "@ngxs/store";
import { PlayerState } from "../states/player.state";

@Pipe ({
    standalone: true,
    name: 'playerName'
})

export class playerNamePipe implements PipeTransform {
    
    players = select(PlayerState.getPlayersFromState);
    
    getPlayerNameById(id: number): string | undefined {
        return this.players()?.find(player => player.id === id)?.name;
    }
    
    transform(value: number) {
        return this.getPlayerNameById(value);
    }
}