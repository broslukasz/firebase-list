import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserTable } from './user-table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
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

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
