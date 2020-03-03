import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    if (localStorage.getItem('i18n')) {
      if (localStorage.getItem('i18n') === 'de') {
        translate.use('de');
      } else {
        translate.use('en');
      }
    } else {
      translate.use('en');
    }
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
