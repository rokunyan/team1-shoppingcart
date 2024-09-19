import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from '../../../transactions/services/transactions.service';
import { Transactions } from '../../../transactions/models/transactions';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../user/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ProductsPageService } from '../../../products-page/service/products-page.service';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.css'
})
export class CheckoutListComponent implements OnInit {
  carts: Cart[] = [];
  total: number = 0;
  user: User
  currentUserId: string = ''
  currentDate = new Date();

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private toastr: ToastrService, 
    private dialog: MatDialog,
    private productService: ProductsPageService,
    private transactionService: TransactionsService,
    private userService: UserService
  ) {
      this.user = this.userService.getCurrentUser()
  }
  
  ngOnInit(): void {
    this.loadCarts();
    this.getTotal();
    this.getCurrentUserId();
  }

  getCurrentUserId = () => {
    this.currentUserId = this.userService.getCurrentUser().id
  };

  loadCarts(): void {
    this.cartService
      .getCarts()
      .subscribe((carts: Cart[]) => (this.carts = carts));
  }

  getTotal(): void {
    this.cartService
      .getTotal()
      .subscribe((total: number) => (this.total = total));
  };

  checkout(): void{


    if(!this.user.addressLine1){
      this.toastr.error(`Please add a delivery address`, 'Delivery Address Error!', {
        progressBar: true,
        timeOut: 5000
      })
    } else {
      const message = `Are you sure you want to delete this item from the cart?`;

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.carts.forEach((cart) =>{
            this.cartService
              .pendingStatus(cart.id)
              .subscribe(() => {
                this.loadCarts()
                this.toastr.success(`Cart orders are now pending!`, 'Checkout Success!', {
                  progressBar: true,
                  timeOut: 5000
                });
              });
              this.productService.getProductById(cart.productId).subscribe(
                (fetchedProduct: Product) => {
                  let updatedProduct: Product = {
                    id: fetchedProduct.id,
                    name: fetchedProduct.name,
                    description: fetchedProduct.description,
                    category: fetchedProduct.description,
                    quantity: fetchedProduct.quantity,
                    price: fetchedProduct.price,
                    status: fetchedProduct.status,
                    image: fetchedProduct.image,
                    itemsSold: fetchedProduct.itemsSold + cart.quantity
                  }
                  console.log(updatedProduct);
                  this.productService.updateProduct(updatedProduct).subscribe()
                }
              )
              // this.productService.updateProduct()
              // let product = this.productService.getProductById(cart.productId);
              // product.pip
              // this.productService.up
          })
          let transaction: Transactions = {
            cartIds: this.carts.map((data) => data.id),
            userId: this.currentUserId,
            dateOfTransaction: (this.currentDate as unknown) as string,
            totalTransaction: this.total,
            addressLine1: this.user.addressLine1,
            addressLine2: this.user.addressLine2, 
            city: this.user.city,
            province: this.user.province,
            zipcode: this.user.zipcode
          }
          console.log(transaction)

          this.transactionService.addTransaction(transaction).subscribe()

          this.router.navigateByUrl("/dashboard")
        }
      });    
  }} 
}
