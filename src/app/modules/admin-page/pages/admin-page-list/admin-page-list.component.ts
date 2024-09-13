import { Component } from '@angular/core';
import { User } from '../../../user/models/user';
import { AdminPageService } from '../../services/admin-page.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminPageService
      .getAllCustomers()
      .subscribe((users: User[]) => (this.users = users));
  }

  deactivate(user: User): void {
    const message = `Are you sure you want to deactivate user ${user.userName}?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminPageService
          .deactivate(user)
          .subscribe(() => this.loadUsers());
      }
    });
  }

  activate(user: User): void {
    this.adminPageService
      .activate(user)
      .subscribe((updatedUser) => this.loadUsers());
  }

  onAdd(): void {
    this.router.navigate(['admin-page/form']);
  }
}
