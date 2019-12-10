import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../user/shared/user/service/user.service';
import {UserManagerService} from '../../../user/shared/user/manager/user-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private userManagerService: UserManagerService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  logoutGoogle() {
    this.userManagerService.googleLogout().subscribe(
        () => {
          localStorage.clear();
          this.router.navigate(['/']);
        }
    );
  }

}
