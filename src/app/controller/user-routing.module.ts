import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from '../ui/user/user.component';
import { HomePageComponent } from '../ui/user/home-page/home-page.component';
import { ArtistPageComponent } from '../ui/user/artist-page/artist-page.component';
import { PaintingComponent } from '../ui/user/painting/painting.component';
import {PaintingListComponent} from '../ui/user/painting-list/painting-list.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {path: '', component: HomePageComponent},
      {path: 'artist/:id', component: ArtistPageComponent},
      {path: 'painting/:id', component: PaintingComponent},
      {path: 'painting-list', component: PaintingListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
