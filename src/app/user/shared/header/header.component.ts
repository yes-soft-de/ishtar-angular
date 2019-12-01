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
import {UserService} from '../user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo;
  userLoggedIn = false;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  constructor(private artTpeService: ArtTypeService,
              public dialog: MatDialog,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userLoggedIn = this.userService.isLoggedIn();
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  goToSearch() {
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }

}
