import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfo} from '../../entity/user/user-info';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {UserService} from '../user/service/user.service';
import {TranslateService} from '@ngx-translate/core';
import {CartComponent} from '../cart/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../home/component/home-page/home-page.component.scss']
})
export class HeaderComponent implements OnInit {
  public showLangSwitch = true;

  userInfo: UserInfo = null;
  userLoggedIn = false;
  userGoogleLoggedIn = false;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(public dialog: MatDialog,
              private router: Router,
              private userService: UserService,
              public translate: TranslateService) {
  }

  ngOnInit() {
    if (this.router.url.toString().search('de') > -1) {
      console.log('URL: DE');
      this.showLangSwitch = false;
    } else {
      this.showLangSwitch = true;
      console.log('URL: EN');
    }
    // Check Login With Google
    this.userService.getTokenWithGoogleLogin().subscribe(
      tokenGoogleResponse => {
        if (tokenGoogleResponse) {
          this.userGoogleLoggedIn = true;
          this.userLoggedIn = this.userService.isLoggedIn();
          this.userService.getUserInfo().subscribe(
            userInfoResponse => {
              this.userInfo = userInfoResponse;
            }
          );
        }
      }
    );

    // Check Login Without Google
    if (!this.userGoogleLoggedIn) {
      // console.log('userGoogleLoggedIn = ', this.userGoogleLoggedIn);
      this.userLoggedIn = this.userService.isLoggedIn();
      // console.log('userLoggedIn is true = ', this.userLoggedIn);
      if (this.userLoggedIn) {
        this.userService.getUserInfo().subscribe(
          userInfoResponse => {
            this.userInfo = userInfoResponse;
          }
        );
      }
    }
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  logout() {
    this.userGoogleLoggedIn = false;
    this.userService.logout();
    window.location.reload();
  }

  goToSearch() {
    // this.searchFrom.get('search').reset();
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }

  openCartDialog() {
    return this.dialog.open(CartComponent, {
      minWidth: '100vw',
      hasBackdrop: true
    });
  }

  switchLanguage() {
    console.log('Switching Languages');
    if (this.router.url.toString().search('de') > -1) {
      console.log('Switching to Deutsch Links');
      localStorage.setItem('lang', 'de');
      this.translate.use('de');
    } else if (localStorage.getItem('lang') === 'en') {
      console.log('Switching to Deutsch Links');
      localStorage.setItem('lang', 'de');
      this.translate.use('de');
    } else {
      console.log('Switching to English Links');
      localStorage.setItem('lang', 'en');
      this.translate.use('en');
    }
    window.location.reload();
  }
}
