import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume2020Component } from './resume2020.component';

describe('Resume2020Component', () => {
  let component: Resume2020Component;
  let fixture: ComponentFixture<Resume2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Resume2020Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
