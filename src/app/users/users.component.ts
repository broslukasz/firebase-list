import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { UserTable } from './user-table';
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
  userTable = UserTable;
  displayedColumns = [
    UserTable.id,
    UserTable.name,
    UserTable.surname,
    UserTable.birthDate,
    UserTable.phone,
    UserTable.city,
    UserTable.street,
    UserTable.number,
    UserTable.delete,
    UserTable.edit,
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
    this.userRemoveSubscription = this.userService.remove(userId).subscribe(() => {
      this.users$ = this.userService.findAll();
    });
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open<EditUserDialogComponent, User>(EditUserDialogComponent, {
      data: cloneDeep(user)
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((changedUser: User) => {
      if (changedUser) {
        this.users$ = this.userService.edit(changedUser);
      }
    });
  }
}
