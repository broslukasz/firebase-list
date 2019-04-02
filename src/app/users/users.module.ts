import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { UsersRoutingModule } from './users.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    EditUserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatButtonModule
  ],
  entryComponents: [EditUserDialogComponent]
})
export class UsersModule { }
