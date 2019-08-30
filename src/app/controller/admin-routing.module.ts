import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../admin/ui/admin/admin.component';
import {DashboardComponent} from '../admin/ui/admin/dashboard/dashboard.component';
import {ListArtistComponent} from '../admin/ui/admin/artist/list-artist/list-artist.component';
import {AddArtistComponent} from '../admin/ui/admin/artist/add-artist/add-artist.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'list-artist', component: ListArtistComponent},
      {path: 'add-artist', component: AddArtistComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
