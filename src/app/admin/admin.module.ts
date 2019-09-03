import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AdminRoutingModule} from '../controller/admin-routing.module';
import { AdminComponent } from './admin.component';
import {DashboardComponent} from './ui/dashboard/dashboard.component';
import {AdminHeaderComponent} from './ui/admin-header/admin-header.component';
import {AddArtistComponent} from './ui/artist/add-artist/add-artist.component';
import {EditArtistComponent} from './ui/artist/edit-artist/edit-artist.component';
import {ListArtistComponent} from './ui/artist/list-artist/list-artist.component';
import {AddPaintingComponent} from './ui/painting/add-painting/add-painting.component';
import {ListPaintingComponent} from './ui/painting/list-painting/list-painting.component';
import {EditPaintingComponent} from './ui/painting/edit-painting/edit-painting.component';
import { AddUserComponent } from './ui/user/add-user/add-user.component';
import {ListUserComponent} from './ui/user/list-user/list-user.component';
import {EditUserComponent} from './ui/user/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AddArtistComponent,
    EditArtistComponent,
    ListArtistComponent,
    AddPaintingComponent,
    ListPaintingComponent,
    EditPaintingComponent,
    AddUserComponent,
    ListUserComponent,
    EditUserComponent
   ],
  exports: [
    AdminComponent,
    AdminHeaderComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
    ]
})
export class AdminModule { }
