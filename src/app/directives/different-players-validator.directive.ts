import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DifferentPlayersValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const playersId = control.value;
    
    if (playersId.length < 2) {
      return { soloPlayer: true };
    }

    for (let i = 0; i < playersId.length; i++) {
      const playerId = playersId[i];

      const idCount = playersId.filter((id: number) => id === playerId)

      if(idCount.length >= 2) {
        
        return { samePlayer: true };
      }

    }
    return null;
  }
}
