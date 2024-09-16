import { Component } from '@angular/core';
import { User } from '../../../user/models/user';
import { AdminPageService } from '../../services/admin-page.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private toastr: ToastrService
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
        this.toastr.success(
          `${user.userName} has been deactivated.`,
          'Deactivated Customer!',
          {
            progressBar: true,
            timeOut: 5000,
          }
        );
      }
    });
  }

  activate(user: User): void {
    this.adminPageService
      .activate(user)
      .subscribe((updatedUser) => this.loadUsers());
    this.toastr.success(
      `${user.userName} has been activated.`,
      'Activated Customer!',
      {
        progressBar: true,
        timeOut: 5000,
      }
    );
  }

  onAdd(): void {
    this.router.navigate(['admin-page/form']);
  }
}
