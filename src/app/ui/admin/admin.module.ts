import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from '../../controller/admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from '../app/admin/admin-header/admin-header.component';
import { AddArtistComponent } from './artist/add-artist/add-artist.component';
import { EditArtistComponent } from './artist/edit-artist/edit-artist.component';
import { ListArtistComponent } from './artist/list-artist/list-artist.component';
import {RouterModule} from '@angular/router';
import { AddArttypeComponent } from './art-type/add-arttype/add-arttype.component';
import { ListArttypeComponent } from './art-type/list-arttype/list-arttype.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AddArtistComponent,
    EditArtistComponent,
    ListArtistComponent,
    AddArttypeComponent,
    ListArttypeComponent
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
  ]
})
export class AdminModule { }
