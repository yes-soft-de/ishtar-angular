import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './ui/dashboard/dashboard.component';
import {ListArtistComponent} from './ui/artist/list-artist/list-artist.component';
import {AddArtistComponent} from './ui/artist/add-artist/add-artist.component';
import {EditArtistComponent} from './ui/artist/edit-artist/edit-artist.component';
import {AddPaintingComponent} from './ui/painting/add-painting/add-painting.component';
import {ListPaintingComponent} from './ui/painting/list-painting/list-painting.component';
import {ListClientComponent} from './ui/client/list-client/list-client.component';
import {AddClientComponent} from './ui/client/add-client/add-client.component';
import {EditClientComponent} from './ui/client/edit-client/edit-client.component';
import {AddImagesComponent} from './ui/images/add-images/add-images.component';
import {AddAuctionComponent} from './ui/auction/add-auction/add-auction.component';
import {ListAuctionsComponent} from './ui/auction/list-auctions/list-auctions.component';
import {ListStatueComponent} from './ui/statue/list-statue/list-statue.component';
import {AddStatueComponent} from './ui/statue/add-statue/add-statue.component';
import {EditPaintingComponent} from './ui/painting/edit-painting/edit-painting.component';
import {EditStatueComponent} from './ui/statue/edit-statue/edit-statue.component';
import {ListCommentComponent} from './ui/comments/list-comment/list-comment.component';
import {ListInteractionComponent} from './ui/interactions/list-interaction/list-interaction.component';
import {EditFeaturedImagesComponent} from './ui/featured/edit-featured-images/edit-featured-images.component';
import {TranslateArtistComponent} from './ui/artist/translate-artist/translate-artist.component';
import {TranslatePaintingComponent} from './ui/painting/translate-painting/translate-painting.component';
import {OrdersListComponent} from './ui/orders/orders-list/orders-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent, data: {index: 0}},
      {path: 'list-artists', component: ListArtistComponent, data: {index: 1}},
      {path: 'add-artist', component: AddArtistComponent},
      {path: 'edit-artist/:id', component: EditArtistComponent},
      {path: 'translate-artist/:id', component: TranslateArtistComponent},
      {path: 'add-painting', component: AddPaintingComponent},
      {path: 'edit-featured', component: EditFeaturedImagesComponent},
      {path: 'list-paintings', component: ListPaintingComponent, data: {index: 2}},
      {path: 'edit-painting/:id', component: EditPaintingComponent},
      {path: 'translate-painting/:id', component: TranslatePaintingComponent},
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
export class AdminRoutingModule {
}
