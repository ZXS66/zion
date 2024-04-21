import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume2024Component } from './resume2024.component';

describe('Resume2024Component', () => {
  let component: Resume2024Component;
  let fixture: ComponentFixture<Resume2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Resume2024Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
