import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Player } from "../../models/player.model";

export function NewPlayerValidator(players: Player[] | null): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    
    const newPlayer: string = control.value.trim().replace(/\s\s+/g, ' ');

    const isSpace = /^\s+$/.test(control.value);
    if (control.value && isSpace) {
      return { isOnlyWhiteSpace: true };
    }

    if (players) {
      if (players.findIndex(player => player.name === newPlayer) >= 0) {
        return { nameAlreadyTaken: true }
      }
    }
    return null
  }
    
}
