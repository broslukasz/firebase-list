import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
  ],
  exports: [
    MatToolbarModule,
    MatTableModule,
  ]
})
export class AngularMaterialSharedComponentsModule { }
