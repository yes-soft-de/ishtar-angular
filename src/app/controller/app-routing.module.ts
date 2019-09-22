import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from '../user/ui/Pages/not-found/not-found.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('../user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [NotFoundComponent];
