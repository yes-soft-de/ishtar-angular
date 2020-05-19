import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {PrivacyPolicyComponent} from './component/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {path: '', component: PrivacyPolicyComponent}
];

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    PrivacyPolicyComponent
  ]
})
export class PrivacyPolicyModule { }
