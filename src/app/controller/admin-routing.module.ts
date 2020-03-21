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
import {ListStatueComponent} from '../admin/ui/statue/list-statue/list-statue.component';
import {AddStatueComponent} from '../admin/ui/statue/add-statue/add-statue.component';
import {EditPaintingComponent} from '../admin/ui/painting/edit-painting/edit-painting.component';
import {EditStatueComponent} from '../admin/ui/statue/edit-statue/edit-statue.component';
import {ListCommentComponent} from '../admin/ui/comments/list-comment/list-comment.component';
import {ListInteractionComponent} from '../admin/ui/interactions/list-interaction/list-interaction.component';
import {EditFeaturedImagesComponent} from '../admin/ui/featured/edit-featured-images/edit-featured-images.component';
import { TranslateArtistComponent } from '../admin/ui/artist/translate-artist/translate-artist.component';
import { TranslatePaintingComponent } from '../admin/ui/painting/translate-painting/translate-painting.component';
import { OrdersListComponent } from '../admin/ui/orders/orders-list/orders-list.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent, data: {index: 0}},
      {path: 'list-artists', component: ListArtistComponent, data: {index: 1}},
      {path: 'add-artist', component: AddArtistComponent},
      {path: 'edit-artist/:id', component: EditArtistComponent},
      { path: 'translate-artist/:id', component: TranslateArtistComponent },
      {path: 'add-painting', component: AddPaintingComponent},
      {path: 'edit-featured', component: EditFeaturedImagesComponent},
      {path: 'list-paintings', component: ListPaintingComponent, data: {index: 2}},
      {path: 'edit-painting/:id', component: EditPaintingComponent},
      { path: 'translate-painting/:id', component: TranslatePaintingComponent },
      {path: 'list-statues', component: ListStatueComponent, data: {index: 3}},
      {path: 'add-statue', component: AddStatueComponent},
      {path: 'edit-statue/:id', component: EditStatueComponent},
      {path: 'list-comments', component: ListCommentComponent, data: {index: 4}},
      {path: 'list-interactions', component: ListInteractionComponent, data: {index: 5}},
      {path: 'list-clients', component: ListClientComponent, data: {index: 6}},
      {path: 'edit-client/:id', component: EditClientComponent},
      {path: 'add-images', component: AddImagesComponent, data: {index: 7}},
      {path: 'list-auctions', component: ListAuctionsComponent},
      {path: 'add-auction', component: AddAuctionComponent},
      {path: 'payments', component: OrdersListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
