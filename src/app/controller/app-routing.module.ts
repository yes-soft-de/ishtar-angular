import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from '../ui/user/not-found/not-found.component';
import {UploadComponent} from '../upload/upload.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('../ui/user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren: () => import('../ui/admin/admin.module').then(m => m.AdminModule)},
  {path: 'upload', component: UploadComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [NotFoundComponent];
