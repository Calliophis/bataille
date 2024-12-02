import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { PlayerState, PlayerStateModel } from './player.state';
import { PlayerAction } from './player.actions';

describe('Player store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([PlayerState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: PlayerStateModel = {
      items: ['item-1']
    };
    store.dispatch(new PlayerAction('item-1'));
    const actual = store.selectSnapshot(PlayerState.getState);
    expect(actual).toEqual(expected);
  });

});
