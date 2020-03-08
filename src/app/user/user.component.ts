import { Component, OnInit } from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private router: Router,
              private translateService: TranslateService) { }

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
      console.log('Setting langs to Deutsch');
      sessionStorage.setItem('lang', 'de');
      this.translateService.use('de');
    } else {
      sessionStorage.setItem('lang', 'en');
      this.translateService.use('en');
    }
  }

}
