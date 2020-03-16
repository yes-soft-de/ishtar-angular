import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {HeaderComponent} from './shared/header/header.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private router: Router,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.setLang();
  }

  setLang() {
    if (this.router.url.toString().search('de') > -1) {
      // This Happens When the user specifically for German
      console.log('Setting langs to Deutsch');
      localStorage.setItem('lang', 'de');
      this.translateService.use('de');
    } else if (localStorage.getItem('lang') === 'de') {
      // This Happens When the user have German as their Language
      this.translateService.use('de');
    } else {
      localStorage.setItem('lang', 'en');
      this.translateService.use('en');
    }
  }

}
