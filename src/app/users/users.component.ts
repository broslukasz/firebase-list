import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { cloneDeep } from 'lodash-es';
import { mergeMap } from 'rxjs/operators';
import { UserTableHeader } from './user-table-header.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
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
  private findAllSubscription: Subscription;

  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllSubscription = this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.userRemoveSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
    this.findAllSubscription.unsubscribe();
  }

  removeUser(userId: string): void {
    this.userRemoveSubscription = this.userService.remove(userId).subscribe((users: User[]) => {
      this.users = users;
    });
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open<EditUserDialogComponent, User>(EditUserDialogComponent, {
      data: cloneDeep(user),
      width: '400px'
    });

    this.dialogSubscription = dialogRef.afterClosed().pipe(
      mergeMap((changedUser: User) => {
        if (changedUser) {
          return this.userService.edit(changedUser);
        }

        return of();
      })
    ).subscribe((updatedUsers: User[]) => {
      if (updatedUsers) {
        this.users = updatedUsers;
      }
    });
  }
}
