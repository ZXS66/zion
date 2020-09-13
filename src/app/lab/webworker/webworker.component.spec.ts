import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebworkerComponent } from './webworker.component';

describe('WebworkerComponent', () => {
  let component: WebworkerComponent;
  let fixture: ComponentFixture<WebworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
