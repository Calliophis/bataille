import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { HistoryState, HistoryStateModel } from './history.state';
import { HistoryAction } from './history.actions';

describe('History store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([HistoryState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: HistoryStateModel = {
      items: ['item-1']
    };
    store.dispatch(new HistoryAction('item-1'));
    const actual = store.selectSnapshot(HistoryState.getState);
    expect(actual).toEqual(expected);
  });

});
