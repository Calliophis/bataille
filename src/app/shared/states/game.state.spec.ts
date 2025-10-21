import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { GameState } from './game.state';

describe('Game store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([GameState])]
    });
  });
});
