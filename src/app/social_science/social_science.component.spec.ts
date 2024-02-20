import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialScienceComponent } from './social_science.component';

describe('SocialScienceComponent', () => {
  let component: SocialScienceComponent;
  let fixture: ComponentFixture<SocialScienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialScienceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SocialScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
