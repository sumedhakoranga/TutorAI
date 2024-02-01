import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersComponent } from './learners.component';

describe('LearnersComponent', () => {
  let component: LearnersComponent;
  let fixture: ComponentFixture<LearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
