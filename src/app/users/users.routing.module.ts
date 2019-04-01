import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
