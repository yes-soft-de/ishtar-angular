import { Component, OnInit } from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showLoadingIndicator = true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      // Check if the Data is Fetching Or Not
      if (routerEvent instanceof NavigationStart ) {
        console.log('loading start ...');
        this.showLoadingIndicator = true;
      }
      // check to disappear the loading indicator when (endFetching, PressingCancel, ErrorCatching)
      if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError) {
        console.log('loading End ...');
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit() {
  }

}
