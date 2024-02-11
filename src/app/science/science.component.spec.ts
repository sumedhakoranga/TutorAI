import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceComponent } from './science.component';

describe('ScienceComponent', () => {
  let component: ScienceComponent;
  let fixture: ComponentFixture<ScienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
