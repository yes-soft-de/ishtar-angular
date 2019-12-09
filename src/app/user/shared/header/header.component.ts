import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfo} from '../../entity/user/user-info';
import {ArtTypeService} from '../../../admin/service/art-type/art-type.service';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {UserService} from '../user/service/user.service';
import {UserProfileService} from '../../service/client-profile/user-profile.service';
import {UserManagerService} from '../user/manager/user-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../home/component/home-page/home-page.component.scss']

})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo = null;
  userLoggedIn = false;
  // userGoogleLoggedIn = false;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private router: Router,
              private userProfileService: UserProfileService,
              private userManager: UserManagerService,
              private userService: UserService) {
  }

  ngOnInit() {
    // if (this.userInfo == null) {
    //   this.userManager.getUserProfile().subscribe(
    //       (userInfoResponse: any) => {
    //         console.log('userInfoResponse: ', userInfoResponse.Data);
    //         // tslint:disable-next-line:triple-equals
    //         if (userInfoResponse.Data.id != undefined) {
    //           this.userInfo = userInfoResponse;
    //           this.userGoogleLoggedIn = true;
    //         }
    //       }
    //   );
    // }

    this.userLoggedIn = this.userService.isLoggedIn();
    if (this.userLoggedIn) {
      this.userService.getUserInfo().subscribe(
        userInfoResponse => {
          this.userInfo = userInfoResponse;
          // this.userGoogleLoggedIn = false;
        }
      );
    }
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  logout() {
    // if (this.userLoggedIn) {
    //   this.userService.logout();
    // } else if (this.userGoogleLoggedIn) {
    //   this.userProfileService.requestUserLogout().subscribe(
    //       () => {
    //         console.log('logout');
    //       }
    //   );
    // }
    this.userService.logout();
    window.location.reload();
  }

  goToSearch() {
    // this.searchFrom.get('search').reset();
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }

}
