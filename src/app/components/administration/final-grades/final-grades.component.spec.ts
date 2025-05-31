import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalGradesComponent } from './final-grades.component';

describe('FinalGradesComponent', () => {
  let component: FinalGradesComponent;
  let fixture: ComponentFixture<FinalGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalGradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
