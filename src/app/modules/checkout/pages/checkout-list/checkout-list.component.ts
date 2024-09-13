import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from '../../../transactions/services/transactions.service';
import { Transactions } from '../../../transactions/models/transactions';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.css'
})
export class CheckoutListComponent implements OnInit {
  carts: Cart[] = [];
  total: number = 0;
  currentUserId: string = ''
  currentDate = new Date();

  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService, private transactionService: TransactionsService,
    private userService: UserService
  ) {}
  
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
    this.carts.forEach((cart) =>{
      this.cartService
        .pendingStatus(cart.id)
        .subscribe(() => {
          this.loadCarts()
          this.toastr.success(`Cart orders are now pending!`, 'Checkout Success!', {
            progressBar: true,
            timeOut: 5000
          });
        })
    })
    let transaction: Transactions = {
      cartIds: this.carts.map((data) => data.id),
      userId: this.currentUserId,
      dateOfTransaction: (this.currentDate as unknown) as string,
      totalTransaction: this.total,
      addressLine1: "123",
      addressLine2: "Any Street", 
      city: "San Pedro",
      province: "Laguna",
      zipcode: "1234"
    }
    console.log(transaction)

    this.transactionService.addTransaction(transaction).subscribe()

    this.router.navigateByUrl("/dashboard")
  }
}
