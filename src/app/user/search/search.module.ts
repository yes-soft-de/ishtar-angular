import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {InteractionsModule} from '../interactions/interactions.module';
import {ArtistSearchComponent} from './component/artist-search/artist-search.component';
import {PaintingSearchComponent} from './component/painting-search/painting-search.component';
import {SearchComponent} from './component/search/search.component';
import {SearchPageComponent} from './component/search-page/search-page.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ArtistModule} from '../artist/artist.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaintingModule} from '../painting/painting.module';


const routes: Routes = [
  {path: '', component: SearchPageComponent},
];

@NgModule({
  declarations: [
    ArtistSearchComponent,
    PaintingSearchComponent,
    SearchComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgxPaginationModule,
    PaintingModule,
    ArtistModule,
    SharedModule,
    InteractionsModule,
  ],
  exports: [
    ArtistSearchComponent,
    PaintingSearchComponent,
    SearchComponent,
    SearchPageComponent
  ]
})
export class SearchModule {
}
