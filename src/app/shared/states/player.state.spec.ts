import { TestBed } from '@angular/core/testing';
import { provideStore} from '@ngxs/store';
import { PlayerState } from './player.state';

describe('Player store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([PlayerState])]
    });
  });
});
