import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    if (this.router.url.search('de')) {
      translate.use('de');
    } else if (localStorage.getItem('i18n')) {
      if (localStorage.getItem('i18n') === 'de') {
        translate.use('de');
      } else {
        translate.use('en');
      }
    } else {
      translate.use('en');
    }

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     ga('set', 'page', event.urlAfterRedirects);
    //     ga('send', 'pageview');
    //   }
    // });
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
