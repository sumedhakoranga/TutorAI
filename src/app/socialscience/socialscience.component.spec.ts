import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialscienceComponent } from './socialscience.component';

describe('SocialscienceComponent', () => {
  let component: SocialscienceComponent;
  let fixture: ComponentFixture<SocialscienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialscienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialscienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
