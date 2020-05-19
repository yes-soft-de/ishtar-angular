import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DataProcessingPageComponent} from './component/data-processing-page/data-processing-page.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: DataProcessingPageComponent}
];

@NgModule({
  declarations: [
    DataProcessingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    DataProcessingPageComponent
  ]
})
export class DataProcessingModule { }
