import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {InteractionsModule} from '../interactions/interactions.module';
import {ArtistCommentComponent} from './component/artist-comment/artist-comment.component';
import {ArtistCommentItemComponent} from './component/artist-comment-item/artist-comment-item.component';
import {ArtistDetailsComponent} from './component/artist-details/artist-details.component';
import {ArtistDetailsPageComponent} from './component/artist-details-page/artist-details-page.component';
import {ArtistKnowledgeComponent} from './component/artist-knowledge/artist-knowledge.component';
import {ArtistListComponent} from './component/artist-list/artist-list.component';
import {ArtistListPageComponent} from './component/artist-list-page/artist-list-page.component';
import {ArtistPaintingsComponent} from './component/artist-paintings/artist-paintings.component';
import {MarkdownModule} from 'ngx-markdown';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {ArtistCardComponent} from './widget/artist-card/artist-card.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'artist/:id',
    pathMatch: 'full',
    component: ArtistDetailsPageComponent
  },
];

@NgModule({
  declarations: [
    ArtistCommentComponent,
    ArtistCommentItemComponent,
    ArtistDetailsComponent,
    ArtistDetailsPageComponent,
    ArtistKnowledgeComponent,
    ArtistListComponent,
    ArtistListPageComponent,
    ArtistPaintingsComponent,
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MDBBootstrapModule,
    NgxPaginationModule,
    TranslateModule.forChild(),
    SharedModule,
    InteractionsModule,
    MarkdownModule,
    RouterModule.forChild(routes),
    NgxJsonLdModule
  ],
  exports: [
    ArtistCommentComponent,
    ArtistCommentItemComponent,
    ArtistDetailsComponent,
    ArtistDetailsPageComponent,
    ArtistKnowledgeComponent,
    ArtistListComponent,
    ArtistListPageComponent,
    ArtistPaintingsComponent,
    ArtistCardComponent
  ]
})
export class ArtistModule {
}
