import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageFormComponent } from './products-page-form.component';

describe('ProductsPageFormComponent', () => {
  let component: ProductsPageFormComponent;
  let fixture: ComponentFixture<ProductsPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
