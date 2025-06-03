import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSupportStrategyComponent } from './student-support-strategy.component';

describe('StudentSupportStrategyComponent', () => {
  let component: StudentSupportStrategyComponent;
  let fixture: ComponentFixture<StudentSupportStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSupportStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSupportStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
