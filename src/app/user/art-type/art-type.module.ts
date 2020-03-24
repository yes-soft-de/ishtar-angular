import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArtTypeDetailsComponent} from './component/art-type-details/art-type-details.component';
import {ArtTypeDetailsPageComponent} from './component/art-type-details-page/art-type-details-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {ArtistModule} from '../artist/artist.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'art-type/:id',
    pathMatch: 'full',
    component: ArtTypeDetailsPageComponent
  }
];

@NgModule({
  declarations: [
    ArtTypeDetailsComponent,
    ArtTypeDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ArtistModule,
    TranslateModule
  ],
  exports: [
    ArtTypeDetailsComponent,
    ArtTypeDetailsPageComponent,
  ]
})
export class ArtTypeModule {
}
