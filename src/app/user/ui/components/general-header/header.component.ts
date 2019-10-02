import {Component, OnInit} from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../Pages/login-page/login-page.component';
import {interval, Subscription} from 'rxjs';
import {UserConfig} from '../../../UserConfig';
import {HttpClient} from '@angular/common/http';
import {UserResponse} from '../../../entity/user/user-response';
import {UserInfo} from '../../../entity/user/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo;
  userLoggedIn = false;
  userLogoutLink = UserConfig.userLogoutLink;
  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private userService: UserProfileService) {
  }

  ngOnInit() {
    this.updateUserStatus();
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  updateUserStatus() {
    this.userService.requestUserDetails().subscribe(
      usr => {
        if (usr.Data.userName !== undefined) {
          // This Means that the user is Logged In
          this.userLoggedIn = true;
          this.userInfo = usr.Data;
        }
      }
    );
  }

  logout() {
    this.userService.requestUserLogout().subscribe(
      () => {
        this.userLoggedIn = false;
        this.userInfo = null;
      }
    );
  }
}
