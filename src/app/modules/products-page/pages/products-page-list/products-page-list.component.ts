import { Component } from '@angular/core';
import { Product } from '../../../products/models/product';
import { ProductsPageService } from '../../service/products-page.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
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

  delete(product: Product): void {
    const message = `Are you sure you want to delete this product from the list?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsPageService
          .deleteItemFromProducts(product)
          .subscribe(() => console.log(this.loadProducts()));
        this.toastr.success(
          `${product.name} is removed from the product list.`,
          'Removed from Product List!',
          {
            progressBar: true,
            timeOut: 5000,
          }
        );
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['products-page/form']);
  }
}
