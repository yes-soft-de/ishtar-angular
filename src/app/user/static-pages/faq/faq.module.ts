import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FAQComponent} from './component/faq/faq.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: FAQComponent}
];

@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    FAQComponent
  ]
})
export class FaqModule { }
