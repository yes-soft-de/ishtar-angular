import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './user/shared/not-found/not-found.component';
import {QuicklinkStrategy} from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./user/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'tos',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/tos/tos.module').then(m => m.TosModule),
  },
  {
    path: 'privacy',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path: 'about-us',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: 'faq',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/faq/faq.module').then(m => m.FaqModule),
  },
  {
    path: 'imprint',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/imprint/imprint.module').then(m => m.ImprintModule),
  },
  {
    path: 'data-processing',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/data-processing/data-processing.module').then(m => m.DataProcessingModule),
  },
  {
    path: 'about-ishtar',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/about-ishtar/about-ishtar.module').then(m => m.AboutIshtarModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/painting/painting.module').then(m => m.PaintingModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/artist/artist-routing.module').then(m => m.ArtistRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/art-type/art-type-routing.module').then(m => m.ArtTypeRoutingModule),
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./user/statue/statue.module').then(m => m.StatueModule),
  // },
  //
  // // {path: 'de', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  // {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
