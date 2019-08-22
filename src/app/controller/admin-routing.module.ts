import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../ui/admin/admin.component';
import {DashboardComponent} from '../ui/admin/dashboard/dashboard.component';
import {ListArtistComponent} from '../ui/admin/artist/list-artist/list-artist.component';
import {AddArtistComponent} from '../ui/admin/artist/add-artist/add-artist.component';
import {ListArttypeComponent} from '../ui/admin/art-type/list-arttype/list-arttype.component';
import {AddArttypeComponent} from '../ui/admin/art-type/add-arttype/add-arttype.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'list-artist', component: ListArtistComponent},
      {path: 'add-artist', component: AddArtistComponent},
      {path: 'list-arttype', component: ListArttypeComponent},
      {path: 'add-arttype', component: AddArttypeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
