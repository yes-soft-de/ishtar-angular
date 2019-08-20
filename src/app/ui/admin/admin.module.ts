import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AdminRoutingModule } from '../../controller/admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from '../app/admin/admin-header/admin-header.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminHeaderComponent
  ],
  exports: [
    AdminComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class AdminModule { }
