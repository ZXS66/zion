import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierachyComponent } from './hierachy.component';

describe('HierachyComponent', () => {
  let component: HierachyComponent;
  let fixture: ComponentFixture<HierachyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierachyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierachyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
