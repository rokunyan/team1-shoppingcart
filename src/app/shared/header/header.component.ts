import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAdmin: boolean = false;
  private getCurrentUser = () => {
    let session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return null;
  };

  getCurrentUserIsAdmin = () => {
    const user = this.getCurrentUser();
    if (user && user.id) {
      return user.isAdmin;
    }
    return false;
  };
}
