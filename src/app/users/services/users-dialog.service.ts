import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ConfirmationComponent } from 'src/app/shared/components/dialog/confirmation/confirmation.component';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';
import { User, UserDialogMode } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDialogService {

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private snackbar: SnackbarService
  ) { }

  modalConfig = {
    width: '90vw',
    maxWidth: '40rem',
  }

  addUser(): Subscription {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      ...this.modalConfig,
      data: {
        title: 'Add User',
        mode: UserDialogMode.add
      }
    });

    return dialogRef.afterClosed()
      .pipe(filter(result => result))
      .subscribe(result => {
        this.usersService.addUser(result);
        this.snackbar.open('User added.');
      });
  }

  updateUser(user: User): Subscription {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      ...this.modalConfig,
      data: {
        title: 'Update User',
        mode: UserDialogMode.update,
        user
      }
    });

    return dialogRef.afterClosed()
      .pipe(filter(result => result))
      .subscribe(result => {
        this.usersService.updateUser(result);
        this.snackbar.open('User updated.');
      });
  }

  deleteUser(user: User): Subscription {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.firstname} ${user.lastname}"?`
      }
    })

    return dialogRef.afterClosed()
      .pipe(filter(result => result))
      .subscribe(result => {
        this.usersService.deleteUser(user);
        this.snackbar.open('User deleted.');
      });

  }
}

