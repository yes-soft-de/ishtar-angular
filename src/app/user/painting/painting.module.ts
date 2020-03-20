import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaintingListPageComponent} from './component/painting-list-page/painting-list-page.component';
import {PaintingDetailsPageComponent} from './component/painting-details-page/painting-details-page.component';
import {PaintingMayLikeComponent} from './component/painting-may-like/painting-may-like.component';
import {PaintingDetailsComponent} from './component/painting-details/painting-details.component';
import {PaintingListComponent} from './component/painting-list/painting-list.component';
import {PaintingCommentComponent} from './component/painting-comment/painting-comment.component';
import {MostSeenPaintingsComponent} from './component/most-seen-paintings/most-seen-paintings.component';
import {PaintingCommentItemComponent} from './component/painting-comment-item/painting-comment-item.component';
import {PaintingCardComponent} from './widget/painting-card/painting-card.component';
import {PaintingKnowledgeGraphComponent} from './component/painting-knowledge-graph/painting-knowledge-graph.component';
import {FeaturedImagesComponent} from './component/featured-images/featured-images.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {InteractionsModule} from '../interactions/interactions.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaintingRoutingModule} from './painting-routing.module';

@NgModule({
  declarations: [
    FeaturedImagesComponent,
    MostSeenPaintingsComponent,
    PaintingCommentComponent,
    PaintingCommentItemComponent,
    PaintingDetailsComponent,
    PaintingDetailsPageComponent,
    PaintingKnowledgeGraphComponent,
    PaintingListComponent,
    PaintingListPageComponent,
    PaintingMayLikeComponent,
    PaintingCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaintingRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    InteractionsModule,
    MDBBootstrapModule,
    NgxJsonLdModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports: [
    PaintingCardComponent,
    FeaturedImagesComponent,
    MostSeenPaintingsComponent,
    PaintingCommentComponent,
    PaintingCommentItemComponent,
    PaintingDetailsComponent,
    PaintingDetailsPageComponent,
    PaintingKnowledgeGraphComponent,
    PaintingListComponent,
    PaintingListPageComponent,
    PaintingMayLikeComponent,
  ]
})
export class PaintingModule {
}
