import { Component } from '@angular/core';
import { UserService } from '../../modules/user/services/user.service';
import { CartService } from '../../modules/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  totalQty?: number;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.totalQty$.subscribe((qty) => (this.totalQty = qty));
  }

  getAdminAndActive = () => {
    const user = this.userService.getCurrentUser();
    if (user && user.id && user.isActive) {
      return user.isAdmin;
    }
    return false;
  };

  getCustomerAndActive = () => {
    const user = this.userService.getCurrentUser();
    if (user && user.id && user.isActive) {
      return user.isActive;
    }
    return false;
  };

  logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('session');
    }
  };
}
