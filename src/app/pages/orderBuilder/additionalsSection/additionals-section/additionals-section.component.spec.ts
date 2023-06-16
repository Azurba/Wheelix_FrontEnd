import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalsSectionComponent } from './additionals-section.component';

describe('AdditionalsSectionComponent', () => {
  let component: AdditionalsSectionComponent;
  let fixture: ComponentFixture<AdditionalsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalsSectionComponent]
    });
    fixture = TestBed.createComponent(AdditionalsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
