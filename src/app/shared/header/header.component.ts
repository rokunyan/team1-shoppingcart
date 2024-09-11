import { Component } from '@angular/core';
import { UserService } from '../../modules/user/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isActive: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr:ToastrService) {}

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
        // this.toastr.success(`You have logged out.`, 'Logged Out!', {
        //   progressBar: true,
        //   timeOut: 5000
        // });
        localStorage.removeItem('session')
      }
    }
}
