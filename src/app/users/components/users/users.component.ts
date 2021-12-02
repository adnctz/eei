import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersDialogService } from '../../services/users-dialog.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'eei-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private usersDialogService: UsersDialogService
  ) { }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'avatar', 'firstname', 'email', 'mobile', 'actions'];
  dataSource = new MatTableDataSource<User>();

  subscription: Subscription = new Subscription;
  users: User[] = [];

  ngOnInit(): void {
    this.usersService.users$
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(users);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.dataSource);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addUser(): void {
    this.subscription.add(this.usersDialogService.addUser());
  }

  deleteUser(user: User): void {
    this.subscription.add(this.usersDialogService.deleteUser(user))
  }

  updateUser(user: User): void {
    this.subscription.add(this.usersDialogService.updateUser(user))
  }
}
