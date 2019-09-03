import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {DashboardComponent} from '../admin/ui/dashboard/dashboard.component';
import {ListArtistComponent} from '../admin/ui/artist/list-artist/list-artist.component';
import {AddArtistComponent} from '../admin/ui/artist/add-artist/add-artist.component';
import {EditArtistComponent} from '../admin/ui/artist/edit-artist/edit-artist.component';
import {AddPaintingComponent} from '../admin/ui/painting/add-painting/add-painting.component';
import {ListPaintingComponent} from '../admin/ui/painting/list-painting/list-painting.component';
import {ListUserComponent} from '../admin/ui/user/list-user/list-user.component';
import {AddUserComponent} from '../admin/ui/user/add-user/add-user.component';
import {EditUserComponent} from '../admin/ui/user/edit-user/edit-user.component';



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
      {path: 'list-users', component: ListUserComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'edit-user', component: EditUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
