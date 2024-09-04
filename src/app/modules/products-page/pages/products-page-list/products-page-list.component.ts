import { Component } from '@angular/core';
import { Product } from '../../../products/models/product';
import { ProductsPageService } from '../../service/products-page.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-products-page-list',
  templateUrl: './products-page-list.component.html',
  styleUrl: './products-page-list.component.css',
})
export class ProductsPageListComponent {
  products: Product[] = [];
  isAdmin: boolean = false;

  add = [{ label: 'Add Product', action: () => this.onAdd(), type: 'info' }];

  constructor(
    private productsPageService: ProductsPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsPageService
      .getProducts()
      .subscribe((products: Product[]) => (this.products = products));
  }

  edit(id: string): void {
    this.router.navigate([`products-page/form`, id]);
  }

  delete(id: string): void {
    this.productsPageService
      .deleteItemFromProducts(id)
      .subscribe(() => console.log(this.loadProducts()));
  }

  onAdd(): void {
    this.router.navigate(['products-page/form']);
  }
}
