import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageFormComponent } from './admin-page-form.component';

describe('AdminPageFormComponent', () => {
  let component: AdminPageFormComponent;
  let fixture: ComponentFixture<AdminPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
