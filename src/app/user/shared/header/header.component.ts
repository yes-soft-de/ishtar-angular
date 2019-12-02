import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserInfo} from '../../entity/user/user-info';
import {ArtTypeService} from '../../../admin/service/art-type/art-type.service';
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
              private userProfileService: UserService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userLoggedIn = this.userService.isLoggedIn();
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
      }
    );
  }

  showDialog() {
    this.dialog.open(LoginPageComponent, {
      width: '100vw',
      hasBackdrop: true
    });
  }

  logout() {
    this.userService.logout();
    window.location.reload();
  }

  goToSearch() {
    // this.searchFrom.get('search').reset();
    this.router.navigate([`/search/${this.searchFrom.get('search').value}`]);
  }

}
