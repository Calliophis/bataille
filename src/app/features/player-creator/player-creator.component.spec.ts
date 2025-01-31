import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreatorComponent } from './player-creator.component';

describe('PlayerCreatorComponent', () => {
  let component: PlayerCreatorComponent;
  let fixture: ComponentFixture<PlayerCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
