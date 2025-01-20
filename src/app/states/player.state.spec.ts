import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { PlayerState, PlayerStateModel } from './player.state';

describe('Player store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([PlayerState])]
      
    });

    store = TestBed.inject(Store);
  });

 

});
