import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArtTypeDetailsComponent} from './component/art-type-details/art-type-details.component';
import {ArtTypeDetailsPageComponent} from './component/art-type-details-page/art-type-details-page.component';
import {ArtTypeListComponent} from './component/art-type-list/art-type-list.component';
import {ArtTypeListPageComponent} from './component/art-type-list-page/art-type-list-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ArtistModule} from '../artist/artist.module';



@NgModule({
  declarations: [
    ArtTypeDetailsComponent,
    ArtTypeDetailsPageComponent,
    ArtTypeListComponent,
    ArtTypeListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ArtistModule,
    TranslateModule
  ],
  exports: [
    ArtTypeDetailsComponent,
    ArtTypeDetailsPageComponent,
    ArtTypeListComponent,
    ArtTypeListPageComponent
  ]
})
export class ArtTypeModule { }
