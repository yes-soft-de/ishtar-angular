import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeHeroComponent} from './component/home-hero/home-hero.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {HomeComponent} from './component/home/home.component';
import {SharedModule} from '../shared/shared.module';
import {ArtistModule} from '../artist/artist.module';
import {ArtTypeModule} from '../art-type/art-type.module';
import {HomePageComponent} from './home-page/home-page.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {PaintingModule} from '../painting/painting.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeHeroComponent,
    HomeComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    SharedModule,
    PaintingModule,
    ArtistModule,
    ArtTypeModule,
    MDBBootstrapModule
  ],
  exports: [
    HomeHeroComponent
  ]
})
export class HomeModule {
}
