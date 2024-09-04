import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageItemComponent } from './products-page-item.component';

describe('ProductsPageItemComponent', () => {
  let component: ProductsPageItemComponent;
  let fixture: ComponentFixture<ProductsPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPageItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
