import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { UsersRoutingModule } from './users.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class UsersModule { }
