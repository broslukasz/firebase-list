import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../models/user.model';
import { UserTableHeader } from '../user-table-header.enum';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.sass']
})
export class EditUserDialogComponent {
  userInputFields = [
    UserTableHeader.name,
    UserTableHeader.surname,
    UserTableHeader.birthDate,
    UserTableHeader.phone,
    UserTableHeader.city,
    UserTableHeader.street,
    UserTableHeader.number,
  ];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
