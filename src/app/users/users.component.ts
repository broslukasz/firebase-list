import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { UserTable } from './user-table';
import { Observable, Subscription } from 'rxjs';

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

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.findAll();
  }

  ngOnDestroy(): void {
    this.userRemoveSubscription.unsubscribe();
  }

  removeUser(userId: string): void {
    this.userRemoveSubscription = this.userService.remove(userId).subscribe(() => {
      this.users$ = this.userService.findAll();
    });
  }
}
