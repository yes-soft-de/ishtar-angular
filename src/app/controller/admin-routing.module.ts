import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '../ui/admin/admin.component';
import {DashboardComponent} from '../ui/admin/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {path: '', redirectTo: ''}
      {path: '', component: DashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
