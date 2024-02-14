import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckemailComponent } from './checkemail.component';

describe('CheckemailComponent', () => {
  let component: CheckemailComponent;
  let fixture: ComponentFixture<CheckemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckemailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
