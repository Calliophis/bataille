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

      // console.log('playerId : ' + playerId + ' - idCount : ' + idCount);
      

      if(idCount.length >= 2) {
        // console.log('samePlayer');
        
        return { samePlayer: true };
      }

    }
    // console.log('testValidé');
    
    return null;
  }
}
