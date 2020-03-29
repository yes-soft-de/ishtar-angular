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
    path: '',
    loadChildren: () => import('./user/profile/profile-routing.module').then(m => m.ProfileRoutingModule)
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
    path: 'painting-list',
    loadChildren: () => import('./user/painting/painting-routing.module').then(m => m.PaintingRoutingModule),
  },
  {
    path: 'painting',
    loadChildren: () => import('./user/painting/painting-routing.module').then(m => m.PaintingRoutingModule),
  },
  {
    path: 'artist',
    loadChildren: () => import('./user/artist/artist-routing.module').then(m => m.ArtistRoutingModule),
  },
  {
    path: 'artist-list',
    loadChildren: () => import('./user/artist/artist-routing.module').then(m => m.ArtistRoutingModule),
  },
  {
    path: 'art-type',
    loadChildren: () => import('./user/art-type/art-type-routing.module').then(m => m.ArtTypeRoutingModule),
  },
  {
    path: 'art-type-list',
    loadChildren: () => import('./user/art-type/art-type-routing.module').then(m => m.ArtTypeRoutingModule),
  },
  {
    path: 'de',
    pathMatch: 'full',
    loadChildren: () => import('./user/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'de/tos',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/tos/tos.module').then(m => m.TosModule),
  },
  {
    path: 'de/privacy',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path: 'de/about-us',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: 'de/faq',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/faq/faq.module').then(m => m.FaqModule),
  },
  {
    path: 'de/imprint',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/imprint/imprint.module').then(m => m.ImprintModule),
  },
  {
    path: 'de/data-processing',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/data-processing/data-processing.module').then(m => m.DataProcessingModule),
  },
  {
    path: 'de/about-ishtar',
    pathMatch: 'full',
    loadChildren: () => import('./user/static-pages/about-ishtar/about-ishtar.module').then(m => m.AboutIshtarModule),
  },
  {
    path: 'de/painting-list',
    loadChildren: () => import('./user/painting/painting-routing.module').then(m => m.PaintingRoutingModule),
  },
  {
    path: 'de/painting',
    loadChildren: () => import('./user/painting/painting-routing.module').then(m => m.PaintingRoutingModule),
  },
  {
    path: 'de/artist',
    loadChildren: () => import('./user/artist/artist-routing.module').then(m => m.ArtistRoutingModule),
  },
  {
    path: 'de/artist-list',
    loadChildren: () => import('./user/artist/artist-routing.module').then(m => m.ArtistRoutingModule),
  },
  {
    path: 'de/art-type',
    loadChildren: () => import('./user/art-type/art-type-routing.module').then(m => m.ArtTypeRoutingModule),
  },
  {
    path: 'de/art-type-list',
    loadChildren: () => import('./user/art-type/art-type-routing.module').then(m => m.ArtTypeRoutingModule),
  },
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
