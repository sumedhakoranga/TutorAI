import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskaiComponent } from './askai.component';

describe('AskaiComponent', () => {
  let component: AskaiComponent;
  let fixture: ComponentFixture<AskaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
