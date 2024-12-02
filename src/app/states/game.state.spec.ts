// import { TestBed } from '@angular/core/testing';
// import {  provideStore,  Store } from '@ngxs/store';
// import { GameState, GameStateModel } from './game.state';
// import { GameAction } from './game.actions';

// describe('Game store', () => {
//   let store: Store;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//        providers: [provideStore([GameState])]
      
//     });

//     store = TestBed.inject(Store);
//   });

//   it('should create an action and add an item', () => {
//     const expected: GameStateModel = {
//       items: ['item-1']
//     };
//     store.dispatch(new GameAction('item-1'));
//     const actual = store.selectSnapshot(GameState.getState);
//     expect(actual).toEqual(expected);
//   });

// });
