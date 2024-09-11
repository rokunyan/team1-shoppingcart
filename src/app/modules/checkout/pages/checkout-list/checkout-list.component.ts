import { Component } from '@angular/core';
import { Cart } from '../../../cart/model/cart';
import { CartService } from '../../../cart/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.css'
})
export class CheckoutListComponent {
  carts: Cart[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.loadCarts();
    this.getTotal();
  }

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
    //alert("Orders are now pending!")
  }
}
