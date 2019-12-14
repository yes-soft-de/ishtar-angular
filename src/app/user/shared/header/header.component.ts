import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfo} from '../../entity/user/user-info';
import {ArtTypeService} from '../../../admin/service/art-type/art-type.service';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {UserService} from '../user/service/user.service';
import {UserManagerService} from '../user/manager/user-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../home/component/home-page/home-page.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo = null;
  userLoggedIn = false;
  userGoogleLoggedIn = false;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private router: Router,
              private userManager: UserManagerService,
              private userService: UserService) {
  }

  ngOnInit() {
    // Check Login With Google
    this.userService.getTokenWithGoogleLogin().subscribe(
        tokenGoogleResponse => {
          if (tokenGoogleResponse) {
            this.userGoogleLoggedIn = true;
            console.log('userGoogleLoggedIn = ', this.userGoogleLoggedIn);
            this.userLoggedIn = this.userService.isLoggedIn();
            console.log('userLoggedIn is true Inside Google Login = ', this.userLoggedIn);
            this.userService.getUserInfo().subscribe(
                userInfoResponse => {
                  console.log('userInfoGoogleResponse = ', userInfoResponse);
                  this.userInfo = userInfoResponse;
                }
            );
          }
        }
    );

    // Check Login Without Google
    if (!this.userGoogleLoggedIn) {
      console.log('!userGoogleLoggedIn = ', this.userGoogleLoggedIn);
      this.userLoggedIn = this.userService.isLoggedIn();
      console.log('userLoggedIn is true = ', this.userLoggedIn);
      if (this.userLoggedIn) {
        this.userService.getUserInfo().subscribe(
            userInfoResponse => {
              console.log('userInfoResponse = ', userInfoResponse);
              this.userInfo = userInfoResponse;
            }
        );
      }
    }

    // try to catch user data after few seconds
    setTimeout(() => {
      console.log('userInfo after 5000 second: ', this.userInfo);
    }, 5000);
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

}
