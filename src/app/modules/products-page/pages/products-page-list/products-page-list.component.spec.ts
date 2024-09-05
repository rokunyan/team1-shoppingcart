import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageListComponent } from './products-page-list.component';

describe('ProductsPageListComponent', () => {
  let component: ProductsPageListComponent;
  let fixture: ComponentFixture<ProductsPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
