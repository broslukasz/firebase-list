import { NgModule } from '@angular/core';
import { AngularMaterialSharedComponentsModule } from './angular-material-shared-components/angular-material-shared-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AngularMaterialSharedComponentsModule
  ],
  exports: [
    AngularMaterialSharedComponentsModule,
    FormsModule
  ]
})
export class SharedModule { }
