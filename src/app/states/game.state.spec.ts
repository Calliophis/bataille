import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { GameState, GameStateModel } from './game.state';

describe('Game store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([GameState])]
      
    });

    store = TestBed.inject(Store);
  });

  

});
