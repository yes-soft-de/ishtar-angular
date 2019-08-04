import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TabsModule} from 'ngx-bootstrap';
import {NgxUIModule} from '@swimlane/ngx-ui';
import { BestsComponent } from './bests/bests.component';

@NgModule({
  declarations: [
    AppComponent,
    BestsComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    TabsModule.forRoot(),
    NgxUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
