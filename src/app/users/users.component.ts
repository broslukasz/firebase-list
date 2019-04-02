import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { UserTableHeader } from './user-table-header';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
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

  private userRemoveSubscription: Subscription;
  private dialogSubscription: Subscription;

  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.findAll();
  }

  ngOnDestroy(): void {
    this.userRemoveSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
  }

  removeUser(userId: string): void {
    this.users$ = this.userService.remove(userId);
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open<EditUserDialogComponent, User>(EditUserDialogComponent, {
      data: cloneDeep(user),
      width: '400px'
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((changedUser: User) => {
      if (changedUser) {
        this.users$ = this.userService.edit(changedUser);
      }
    });
  }
}
