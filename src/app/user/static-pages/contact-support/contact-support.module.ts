import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContactSupportComponent} from './component/contact-support/contact-support.component';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: ContactSupportComponent}
];

@NgModule({
  declarations: [ContactSupportComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    ContactSupportComponent
  ]
})
export class ContactSupportModule {
}
