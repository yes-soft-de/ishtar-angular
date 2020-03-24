import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'painting',
        loadChildren: () => import('./painting/painting.module').then(m => m.PaintingModule),
      },
      {
        path: 'artist',
        loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule),
      },
      {
        path: 'statue',
        loadChildren: () => import('./statue/statue.module').then(m => m.StatueModule),
      },
      {
        path: 'art-type',
        loadChildren: () => import('./art-type/art-type.module').then(m => m.ArtTypeModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
