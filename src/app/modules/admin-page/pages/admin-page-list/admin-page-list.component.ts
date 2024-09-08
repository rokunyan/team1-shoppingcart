import { Component } from '@angular/core';
import { User } from '../../../user/models/user';
import { AdminPageService } from '../../services/admin-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-list',
  templateUrl: './admin-page-list.component.html',
  styleUrl: './admin-page-list.component.css',
})
export class AdminPageListComponent {
  users: User[] = [];
  add = [{ label: 'Add Customer', action: () => this.onAdd(), type: 'info' }];

  constructor(
    private adminPageService: AdminPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminPageService
      .getUsers()
      .subscribe((users: User[]) => (this.users = users));
  }

  deactivate(user: User): void {
    this.adminPageService
      .deactivate(user)
      .subscribe((updatedUser) => this.loadUsers());
  }

  onAdd(): void {
    this.router.navigate(['admin-page/form']);
  }
}
