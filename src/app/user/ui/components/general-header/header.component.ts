import {Component, OnInit} from '@angular/core';
import {ArtTypeService} from '../../../../admin/service/art-type/art-type.service';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../Pages/login-page/login-page.component';
import {FormControl, FormGroup} from '@angular/forms';
import {UserConfig} from '../../../UserConfig';
import {UserInfo} from '../../../entity-protected/profile/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {Router} from '@angular/router';
import {UserManagerService} from '../../../manager/user/user-manager.service';
import {UserProfileManagerService} from '../../../manager/user-profile/user-profile-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo;
  userLoggedIn = false;
  loginClick = false;
  userLogoutLink = UserConfig.userLogoutLink;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private router: Router,
              private userProfileService: UserProfileManagerService,
              private userManager: UserManagerService) {
  }

  ngOnInit() {
    // (2) This Firs When the User is Logged In, Notice that i don't need errors here!
    this.userProfileService.getManagerObservable().subscribe(
      usr => {
        // This Means that the user is Logged In
        if (usr.email !== null && usr.username !== undefined) {
          this.userLoggedIn = true;
          this.userInfo = usr;
          console.log('User Logged In');
        }
      }, error1 => {
        console.log(error1);
      }
    );

    this.userManager.getLogoutObservable().subscribe(
      data => {
        this.router.navigate(['/']);
      }, error1 => {
        console.log(error1);
      }
    );

    // (1) This Fires User Discovery
    this.userProfileService.getUserProfile();
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  logout() {
    this.userManager.getLogoutObservable().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
    this.userManager.logout();
  }

  /* showInputFeild() {
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
  */
  goToSearch() {
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }
}
