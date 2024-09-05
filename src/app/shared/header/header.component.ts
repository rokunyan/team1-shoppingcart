import { Component } from '@angular/core';
import { UserService } from '../../modules/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isActive: boolean = false;

  constructor(private userService: UserService) {}

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
}
