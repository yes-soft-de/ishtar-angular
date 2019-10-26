import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import {AddClientComponent} from './ui/client/add-client/add-client.component';
import {ListClientComponent} from './ui/client/list-client/list-client.component';
import {EditClientComponent} from './ui/client/edit-client/edit-client.component';
import { AddImagesComponent } from './ui/images/add-images/add-images.component';
import {AddAuctionComponent} from './ui/auction/add-auction/add-auction.component';
import {ListAuctionsComponent} from './ui/auction/list-auctions/list-auctions.component';
import { ListStatueComponent } from './ui/statue/list-statue/list-statue.component';
import { AddStatueComponent } from './ui/statue/add-statue/add-statue.component';
import { EditStatueComponent } from './ui/statue/edit-statue/edit-statue.component';

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
    AddClientComponent,
    ListClientComponent,
    EditClientComponent,
    AddImagesComponent,
    AddAuctionComponent,
    ListAuctionsComponent,
    ListStatueComponent,
    AddStatueComponent,
    EditStatueComponent
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
    // BrowserAnimationsModule
  ]
})
export class AdminModule { }
