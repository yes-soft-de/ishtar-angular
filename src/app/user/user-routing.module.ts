import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {HomePageComponent} from './ui/Pages/home-page/home-page.component';
import {PaintingListPageComponent} from './ui/Pages/painting-list/painting-list-page.component';
import {ArtistListPageComponent} from './ui/Pages/artist-list/artist-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomePageComponent},
      {path: 'artist-list', component: ArtistListPageComponent},
      {path: 'painting-list', component: PaintingListPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
