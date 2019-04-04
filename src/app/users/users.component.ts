import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './user.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { cloneDeep } from 'lodash-es';
import { UserTableHeader } from './user-table-header.enum';
import { UserDataService } from './services/user-data.service';

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
    private userDataService: UserDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.users = this.userDataService.users$;
    this.userDataService.findAll();
  }

  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }

  removeUser(userId: string): void {
    this.userDataService.remove(userId);
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open<EditUserDialogComponent, User>(EditUserDialogComponent, {
      data: cloneDeep(user),
      width: '400px'
    });

    this.dialogSubscription = dialogRef.afterClosed()
      .subscribe((editedUser: User) => {
      if (editedUser) {
        this.userDataService.edit(editedUser);
      }
    });
  }
}
