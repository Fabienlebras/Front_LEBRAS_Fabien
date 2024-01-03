import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationlistComponent } from './vaccinationlist.component';

describe('VaccinationlistComponent', () => {
  let component: VaccinationlistComponent;
  let fixture: ComponentFixture<VaccinationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationlistComponent]
    });
    fixture = TestBed.createComponent(VaccinationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
