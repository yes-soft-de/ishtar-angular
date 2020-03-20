import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomePageComponent} from './component/home-page/home-page.component';
import {HomeHeroComponent} from './component/home-hero/home-hero.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {PaintingModule} from '../painting/painting.module';
import {ArtistModule} from '../artist/artist.module';


@NgModule({
  declarations: [
    HomePageComponent,
    HomeHeroComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SharedModule,
    PaintingModule,
    ArtistModule
  ],
  exports: [
    HomePageComponent,
    HomeHeroComponent
  ]
})
export class HomeModule { }
