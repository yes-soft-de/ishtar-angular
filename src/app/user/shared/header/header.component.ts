import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfo} from '../../entity/user/user-info';
import {UserConfig} from '../../UserConfig';
import {ArtTypeService} from '../../../admin/service/art-type/art-type.service';
import {UserProfileManagerService} from '../../manager/user-profile/user-profile-manager.service';
import {UserManagerService} from '../../manager/user/user-manager.service';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';

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
        console.log(usr);
        this.userInfo = usr;
        this.userLoggedIn = true;
      }, error1 => {
        console.log(error1);
      }
    );

    // For Logout
    this.userManager.getObservable().subscribe(
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
    this.userManager.getObservable().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
    this.userManager.logout();
  }

  goToSearch() {
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }

}
