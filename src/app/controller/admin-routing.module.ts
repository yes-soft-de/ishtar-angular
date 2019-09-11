import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {DashboardComponent} from '../admin/ui/dashboard/dashboard.component';
import {ListArtistComponent} from '../admin/ui/artist/list-artist/list-artist.component';
import {AddArtistComponent} from '../admin/ui/artist/add-artist/add-artist.component';
import {EditArtistComponent} from '../admin/ui/artist/edit-artist/edit-artist.component';
import {AddPaintingComponent} from '../admin/ui/painting/add-painting/add-painting.component';
import {ListPaintingComponent} from '../admin/ui/painting/list-painting/list-painting.component';
import {ListClientComponent} from '../admin/ui/client/list-client/list-client.component';
import {AddClientComponent} from '../admin/ui/client/add-client/add-client.component';
import {EditClientComponent} from '../admin/ui/client/edit-client/edit-client.component';
import {AddImagesComponent} from '../admin/ui/images/add-images/add-images.component';
import {AddAuctionComponent} from '../admin/ui/auction/add-auction/add-auction.component';
import {ListAuctionsComponent} from '../admin/ui/auction/list-auctions/list-auctions.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'list-artists', component: ListArtistComponent},
      {path: 'add-artist', component: AddArtistComponent},
      {path: 'edit-artist/:id', component: EditArtistComponent},
      {path: 'add-painting', component: AddPaintingComponent},
      {path: 'list-paintings', component: ListPaintingComponent},
      {path: 'list-clients', component: ListClientComponent},
      {path: 'add-client', component: AddClientComponent},
      {path: 'edit-client', component: EditClientComponent},
      {path: 'add-images', component: AddImagesComponent},
      {path: 'list-auctions', component: ListAuctionsComponent},
      {path: 'add-auction', component: AddAuctionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
