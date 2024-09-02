import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageListComponent } from './admin-page-list.component';

describe('AdminPageListComponent', () => {
  let component: AdminPageListComponent;
  let fixture: ComponentFixture<AdminPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
