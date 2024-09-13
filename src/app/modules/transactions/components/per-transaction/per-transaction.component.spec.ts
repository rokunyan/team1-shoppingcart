import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerTransactionComponent } from './per-transaction.component';

describe('PerTransactionComponent', () => {
  let component: PerTransactionComponent;
  let fixture: ComponentFixture<PerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
