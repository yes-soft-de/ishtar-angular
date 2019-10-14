import {Component, OnInit} from '@angular/core';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../Pages/login-page/login-page.component';
import {FormControl, FormGroup} from '@angular/forms';
import {UserConfig} from '../../../UserConfig';
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
  searchFrom = new FormGroup({
    search: new FormControl('')
  });
  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private userService: UserProfileService,
              private router: Router) {
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

  showInputFeild() {
    document.getElementById('open-search').style.opacity = '0';
    document.getElementById('open-search').style.zIndex = '-1';
    document.getElementById('input-search').style.width = '100%';
    document.getElementById('input-mobile-search').style.width = '100%';
    document.getElementById('close-search').style.opacity = '1';
    document.getElementById('close-search').style.zIndex = '2';
    document.getElementById('inlineFormInputGroup').focus();
  }

  hideInputFeild() {
    document.getElementById('close-search').style.opacity = '0';
    document.getElementById('close-search').style.zIndex = '-1';
    document.getElementById('input-search').style.width = '0';
    document.getElementById('input-mobile-search').style.width = '100%';
    document.getElementById('open-search').style.opacity = '1';
    document.getElementById('open-search').style.zIndex = '2';
    document.getElementById('inlineFormInputGroup').blur();
  }

  goToSearch() {
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }
}
