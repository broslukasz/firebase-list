import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { cloneDeep } from 'lodash-es';
import { UserTableHeader } from './user-table-header.enum';
import { UsersDataService } from './services/users-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';
import * as usersActions from './../actions/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Observable<User[] | null>;
  userTable = UserTableHeader;
  displayedColumns = [
    UserTableHeader.id,
    UserTableHeader.name,
    UserTableHeader.surname,
    UserTableHeader.birthDate,
    UserTableHeader.phone,
    UserTableHeader.city,
    UserTableHeader.street,
    UserTableHeader.number,
    UserTableHeader.delete,
    UserTableHeader.edit,
  ];

  private dialogSubscription: Subscription;

  constructor(
    private userDataService: UsersDataService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.users = this.store.select(state => state.users);
  }

  ngOnInit(): void {
    this.store.dispatch(new usersActions.LoadUsersAction());
  }

  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }

  removeUser(userId: string): void {
    this.store.dispatch(new usersActions.DeleteUserAction(userId));
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open<EditUserDialogComponent, User>(EditUserDialogComponent, {
      data: cloneDeep(user),
      width: '400px'
    });

    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe((editedUser: User) => {
      if (editedUser) {
        this.store.dispatch(new usersActions.EditUserAction(editedUser));
      }
    });
  }
}
