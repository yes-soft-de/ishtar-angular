import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {DashboardComponent} from '../admin/ui/dashboard/dashboard.component';
import {ListArtistComponent} from '../admin/ui/artist/list-artist/list-artist.component';
import {AddArtistComponent} from '../admin/ui/artist/add-artist/add-artist.component';
import {EditArtistComponent} from '../admin/ui/artist/edit-artist/edit-artist.component';
import {AddPaintingComponent} from '../admin/ui/painting/add-painting/add-painting.component';
import {ListPaintingComponent} from '../admin/ui/painting/list-painting/list-painting.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'list-artist', component: ListArtistComponent},
      {path: 'add-artist', component: AddArtistComponent},
      {path: 'edit-artist/:id', component: EditArtistComponent},
      {path: 'add-painting', component: AddPaintingComponent},
      {path: 'list-painting', component: ListPaintingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
