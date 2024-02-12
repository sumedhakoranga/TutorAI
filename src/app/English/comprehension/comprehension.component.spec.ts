import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensionComponent } from './comprehension.component';

describe('ComprehensionComponent', () => {
  let component: ComprehensionComponent;
  let fixture: ComponentFixture<ComprehensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprehensionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprehensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
