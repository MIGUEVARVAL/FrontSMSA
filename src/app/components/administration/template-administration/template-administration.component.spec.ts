import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAdministrationComponent } from './template-administration.component';

describe('TemplateAdministrationComponent', () => {
  let component: TemplateAdministrationComponent;
  let fixture: ComponentFixture<TemplateAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateAdministrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
